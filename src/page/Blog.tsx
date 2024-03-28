import { MdPostAdd } from "react-icons/md"
import { Link, NavLink, useLocation } from "react-router-dom"
import { ReactNode } from "react"


const Blog = ({ children }: { children?: ReactNode }) => {
  const pathname = useLocation().pathname
  
  return (
    <section className="space-y-3 p-10">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">
          Blogs
        </h2>
        <Link to='./new-blog' className="primary-button">
          <MdPostAdd className="text-lg" /> New Blog
        </Link>
      </div>
      <div className="flex gap-5 border-b-2 font-bold">
        <Link to=''
          className={`py-2${pathname == '/blogs' || pathname == '/blogs/' ? ' border-b-[3px] border-green-500 text-green-500' : ''} `}
        >
          Contents
        </Link>
        <NavLink to='comments'
          className='py-2 aria-[current]:border-b-[3px] border-green-500 aria-[current]:text-green-500'
        >
          Comments
        </NavLink>
      </div>
      {
        children
      }
    </section>
  )
}

export default Blog