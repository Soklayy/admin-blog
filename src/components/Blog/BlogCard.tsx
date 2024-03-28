import { AiOutlineLike } from "react-icons/ai"
import { MdLock, MdOutlineComment, MdPublic } from "react-icons/md"
import { Link } from "react-router-dom"
import { IBlog } from "../../api/models/blog.interface"

const BlogCard = (blog: IBlog) => {
    const date = new Date(blog?.createdAt as string)
    return (
        <div className="bg-white rounded-lg flex gap-3 h-[9rem] pr-1 overflow-hidden relative group">
            <div className="absolute w-[16rem] h-full top-0 justify-center items-center left-0 group-hover:flex hidden cursor-pointer">
                <Link to={`${blog.id}`} className="primary-button">details</Link>
            </div>
            <img
                src={blog?.thumbnail?.url}
                className="h-full aspect-video object-contain bg-slate-300"
            />
            <div className="flex flex-col max-w-[calc(100%-16rem-71px)] w-full pt-1">
                <div className="text-sm text-gray-400 flex items-baseline gap-2">
                    <p>Published {date.toLocaleString()}</p>
                    {blog.isPublic
                        ?
                        <MdPublic />
                        :
                        <MdLock />
                    }
                </div>

                <h4 className="line-clamp-1 text-ellipsis">
                    {blog.title}
                </h4>
                <span className="text-sm text-gray-400 flex gap-1 items-center">Description <hr className="w-full" /></span>
                <p className="line-clamp-3 text-ellipsis w-full break-words">
                    {blog.description}
                </p>
            </div>
            <div className="pt-1 flex flex-col justify-evenly w-[71px] border-l">
                <span className="flex flex-col items-center"><AiOutlineLike />{blog.like}</span>
                <span className="flex flex-col items-center"><MdOutlineComment />{blog.comment?.length}</span>
                {/* <span className="flex flex-col items-center"><IoMdStats />0</span> */}
            </div>
        </div>
    )
}

export default BlogCard