import Link from "next/link";
import { type FC, type MouseEventHandler } from "react";
import { usePostHog } from "posthog-js/react";

export interface HeaderProps {
  buttonClick: MouseEventHandler<HTMLButtonElement>;
}

const Header: FC<HeaderProps> = ({ buttonClick }: HeaderProps) => {
  const posthog = usePostHog();

  return (
    <header>
      <nav className="border-gray-200 bg-black px-4 py-2.5 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-center">
          <Link href="/" className="flex items-center">
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
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
  );
};

export default Header;
