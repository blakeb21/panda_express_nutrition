import Link from "next/link";
import { type FC, type MouseEventHandler } from "react";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";

export interface HeaderProps {
  buttonClick: MouseEventHandler<HTMLButtonElement>;
}

const Header: FC<HeaderProps> = ({ buttonClick }: HeaderProps) => {
  const img = "../../panda_logo_vector.svg";
  const posthog = usePostHog();

  return (
    <>
      <header>
        <nav className="border-gray-200 bg-black px-4 py-2.5 lg:px-6">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-center">
            <Link href="/" className="flex items-center">
              <Image
                className="rounded-full"
                alt="The panda express logo"
                src={img}
                height={48}
                width={48}
              />
              <span className="flex self-center whitespace-nowrap pl-2 text-xl font-semibold text-white md:hidden">
                Nutrition Calculator
              </span>
              <span className="hidden self-center whitespace-nowrap pl-2 text-xl font-semibold text-white md:flex">
                Panda Express Nutrition Calculator
              </span>
            </Link>

            <div
              className="w-full items-end justify-between lg:order-1 lg:flex lg:w-auto"
              id="mobile-menu-2"
            >
              <button
                className="rounded bg-red-700 p-4 pt-2 text-white"
                onClick={(e) => {
                  posthog.capture("reset_button_clicked");
                  buttonClick(e);
                }}
              >
                Reset Selected
              </button>
            </div>
          </div>
        </nav>
      </header>
      {/* <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script> */}
    </>
  );
};

export default Header;
