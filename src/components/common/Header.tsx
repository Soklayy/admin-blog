import { BsFillBellFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-gray-900 shadow px-5 py-2 lg:px-40 h-16 sticky top-0 z-50">
            <Link to={'/'} className="text-2xl font-bayon text-white font-bold uppercase flex">
                ឡា<span className="text-green-500 font-bayon flex items-center">យ.</span>
            </Link>

            <div className="relative cursor-pointer">
                <span className="bg-red-600 font-bold text-white p-1 rounded-full absolute -top-3 -right-3 flex items-center justify-center w-5 h-5 text-xs">
                    100
                </span>
                <BsFillBellFill className="text-green-500 text-2xl" />
            </div>
        </header>
    )
}

export default Header