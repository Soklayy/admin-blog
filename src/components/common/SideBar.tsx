import { NavLink } from "react-router-dom"
import { Menu } from "../../constants/Menu"
import userIcon from '../../assets/user.png'
import { useAppSelector } from "../../redux/hook"

const SideBar = () => {
    const auth = useAppSelector(state => state.auth)
    return (
        <aside className="col-span-2 bg-white shadow-lg pt-8 sticky top-0 z-50 space-x-3 hidden md:block">

            <div className="w-full flex items-center justify-center flex-col gap-3">
                <div className="flex items-center justify-center flex-col gap-1">
                    <img src={auth?.user?.profileImage?.url || userIcon} alt="profile"
                        className="w-24 h-24 object-cover rounded-full bg-slate-100 border-2 border-green-300"
                    />
                    <h2 className="font-bold text-gray-700 uppercase">{auth?.user?.role}</h2>
                    <h2 className="text-gray-700 text-sm">{auth?.user?.lastname} {auth?.user?.firstname}</h2>
                </div>

                <nav className="w-full flex-col flex">
                    {
                        Menu.map((menu, key) => <NavLink to={menu.url} className='active: py-3 pl-3 text-lg font-bold' key={key}>{menu.title}</NavLink>)
                    }
                </nav>
            </div>
        </aside>
    )
}

export default SideBar