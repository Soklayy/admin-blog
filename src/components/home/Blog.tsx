import { useEffect, useState } from "react"
import { AiOutlineLike } from "react-icons/ai"
// import { IoMdStats } from "react-icons/io"
import { MdArticle, MdOutlineComment } from "react-icons/md"
import { IBlog } from "../../api/models/blog.interface"
import { axiosInstance } from "../../api/axios.instance"
import { Link } from "react-router-dom"

const Blog = () => {

    const [data, setData] = useState<IBlog>({})

    useEffect(() => {
        axiosInstance.get('blog?latest=true')
            .then((res) => {
                setData(res.data as IBlog)
            })
    }, [])
    return (
        <div className="bg-white h-full rounded-lg px-7 flex flex-col pb-2">
            <h3 className="font-bold text-lg py-5 flex items-center gap-2"><MdArticle />Latest blog</h3>
            <div className="group relative">
                <img src={data?.thumbnail?.url}
                    className="w-full h-40 object-contain bg-slate-300"
                />
                <div className="absolute w-full h-40 object-contain top-0 justify-center items-center left-0 group-hover:flex hidden cursor-pointer">
                    <Link to={`blogs/${data?.id}`} className="primary-button">details</Link>
                </div>
                <div className="py-3 flex gap-3 items-center justify-evenly border-b">
                    <span className="flex flex-col justify-center items-center"><AiOutlineLike />{data?.like || 0}</span>
                    <span className="flex flex-col justify-center items-center"><MdOutlineComment />{data?.comment?.length || 0}</span>
                    {/* <span className="flex flex-col justify-center items-center"><IoMdStats />0</span> */}
                </div>
            </div>

            <p className="py-2 text-sm text-gray-400">Published <span className="">{new Date(data?.createdAt as string).toLocaleString()}</span></p>

            <h4 className="line-clamp-2 text-ellipsis">{data?.title}</h4>

            <span className="pt-2 text-sm text-gray-400 flex gap-1 items-center">Description <hr className="w-full" /></span>
            <p className="line-clamp-[9] text-ellipsis">
                {data?.description}
            </p>
        </div>
    )
}

export default Blog