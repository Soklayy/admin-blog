import { MdPostAdd } from "react-icons/md"
import Blog from "../components/home/Blog"
import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div className="p-10 w-full">
            <div className="md:flex justify-between items-center">
                <h2 className="font-bold text-xl">
                    Dashboard
                </h2>
                <Link to='/blogs/new-blog' className="primary-button">
                    <MdPostAdd className="text-lg" /> New Blog
                </Link>
                {/* <div className="flex gap-3">
                    <button className="primary-button">
                        <RiFolderAddFill className="text-lg" />New Project
                    </button>
                </div> */}
            </div>
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                <Blog />
                {/* <Project /> */}
            </div>
        </div>
    )
}

export default Home