

export default function Footer() {
    const today = new Date();
  return (
<footer className="flex bg-black w-full p-4 md:p-6 justify-center">
	<span className="text-slate-400">&copy; {today.getFullYear()} <a href="https://www.blakebarnhill.com">Blake Barnhill.</a> All rights reserved.</span>
</footer>

  )
}
