import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { feedbackFormSchema, type FeedbackApiResponse } from "~/lib/feedbackSchema";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per window

function getRateLimitKey(req: NextApiRequest): string {
  // Use IP address for rate limiting
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? (forwarded as string).split(",")[0] : req.connection.remoteAddress;
  return ip || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

function sanitizeInput(input: string): string {
  // Basic HTML sanitization - remove potentially dangerous tags
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

function generateEmailTemplate(name: string, email: string, feedback: string): string {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Feedback - Panda Express Nutrition App</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #9d0208 0%, #370617 100%); padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">New Feedback Received</h1>
    <p style="color: #ffd60a; margin: 5px 0 0 0;">Panda Express Nutrition App</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #9d0208; margin-top: 0; border-bottom: 2px solid #ffd60a; padding-bottom: 10px;">Feedback Details</h2>
      
      <div style="margin-bottom: 15px;">
        <strong style="color: #370617;">Name:</strong>
        <p style="margin: 5px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">${sanitizeInput(name)}</p>
      </div>
      
      <div style="margin-bottom: 15px;">
        <strong style="color: #370617;">Email:</strong>
        <p style="margin: 5px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
          <a href="mailto:${sanitizeInput(email)}" style="color: #9d0208; text-decoration: none;">${sanitizeInput(email)}</a>
        </p>
      </div>
      
      <div style="margin-bottom: 15px;">
        <strong style="color: #370617;">Feedback:</strong>
        <div style="margin: 5px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #ffd60a;">
          ${sanitizeInput(feedback).replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e9ecef;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
          <strong>Submitted:</strong> ${timestamp}<br>
          <strong>Source:</strong> Panda Express Nutrition App Feedback Form
        </p>
      </div>
    </div>
    
    <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 12px;">
      <p>This email was automatically generated from the feedback form on your Panda Express Nutrition App.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedbackApiResponse>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(req);
    if (isRateLimited(rateLimitKey)) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }

    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return res.status(500).json({
        success: false,
        message: "Email service is not properly configured",
      });
    }

    // Validate request body
    const validationResult = feedbackFormSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        error: validationResult.error.issues.map(issue => issue.message).join(", "),
      });
    }

    const { name, email, feedback } = validationResult.data;

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedFeedback = sanitizeInput(feedback);

    // Generate email content
    const emailHtml = generateEmailTemplate(sanitizedName, sanitizedEmail, sanitizedFeedback);
    const emailText = `
New Feedback Received - Panda Express Nutrition App

Name: ${sanitizedName}
Email: ${sanitizedEmail}

Feedback:
${sanitizedFeedback}

Submitted: ${new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}
    `.trim();

    // Send email using Resend
    const {data, error} = await resend.emails.send({
      from: "Panda Express Nutrition App <pandaexpress@blakebarnhill.com>",
      to: ["blake@blakebarnhill.com"],
      subject: `New Feedback from ${sanitizedName} - Panda Express Nutrition App`,
      html: emailHtml,
      text: emailText,
      replyTo: sanitizedEmail,
    });

    if (error) {
      console.error("Resend error: ", error)
      throw new Error("Failed to send email");
    }

    // Log successful submission (without sensitive data)
    console.log(`Feedback submitted successfully - ID: ${data.id}, From: ${sanitizedEmail}`);

    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully. Thank you for your input!",
    });

  } catch (error) {
    console.error("Feedback submission error:", error);

    // Don't expose internal errors to client
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting your feedback. Please try again later.",
    });
  }
}