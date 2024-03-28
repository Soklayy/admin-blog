
import BlogCard from "./BlogCard"
import { IBlog } from "../../api/models/blog.interface"
import { useGet } from "../../hook/useFetch"

const BlogList = () => {

  const [data] = useGet<IBlog[]>(`blog`)

  return (
    <div className="flex flex-col gap-1 h-full">
      {
        data?.map((value: IBlog, index: number) => <BlogCard {...value} key={index} />)
      }
    </div>
  )
}

export default BlogList