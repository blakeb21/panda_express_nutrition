import Link from "next/link"
import { type FC, type MouseEventHandler } from "react"
import Image from "next/image"

export interface HeaderProps {
    buttonClick: MouseEventHandler<HTMLButtonElement>
}

const Header: FC<HeaderProps> = ({buttonClick}: HeaderProps) => {

    const img = "../../panda_logo_vector.svg"

    return (
        <>
        <header>
            <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center text-center mx-auto max-w-screen-xl">
                    <Link href="/" className="flex items-center">
                        <Image className="rounded-full" alt="The panda express logo" src={img} height={48} width={48}  />
                        <span className="flex md:hidden self-center text-xl font-semibold whitespace-nowrap text-white pl-2">Nutrition Calculator</span>
                        <span className="hidden md:flex self-center text-xl font-semibold whitespace-nowrap text-white pl-2">Panda Express Nutrition Calculator</span>
                    </Link>
                    
                    <div className="justify-between items-end w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <button className="text-white p-4 pt-2 bg-red-700 rounded" onClick={buttonClick}>Reset Selected</button>
                    </div>
                </div>
            </nav>
        </header>
        {/* <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script> */}
        </>
)}

export default Header