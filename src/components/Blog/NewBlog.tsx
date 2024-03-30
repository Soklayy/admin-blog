import MDEditor from "@uiw/react-md-editor/nohighlight"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiArrowBack, BiSave } from "react-icons/bi"
import { IBlog } from "../../api/models/blog.interface"
import { AiOutlineLoading } from "react-icons/ai"
import { axiosInstance } from "../../api/axios.instance"
import { MdLock, MdPublic } from "react-icons/md"

const NewBlog = () => {
    const navigate = useNavigate()
    const [thumbnail, setThumnail] = useState<File>()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<IBlog>({ article: '', title: '', description: '', isPublic: true })
    const saveHandler = () => {
        setLoading(true)

        axiosInstance.post(`blog`,
            {
                ...data,
                thumbnail: thumbnail
            },
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            }
        )
            .then((response) => {
                setLoading(false)
                alert('Success')
                navigate(`../${response?.data?.id}`)
            })
            .catch((err) => {
                setLoading(false)
                alert(err?.code + ': ' + err?.response.data.message)
            })
    }
    return (
        <section className="space-y-3 p-10 pt-5 h-full">
            <Link to='../' className="primary-button w-fit">
                <BiArrowBack className="text-xl" />Back
            </Link>
            <h2 className="font-bold text-xl">
                New Blog
            </h2>
            <div className="flex justify-between">
                <div className="flex items-center justify-between gap-1 border-2 border-green-400 w-fit rounded-md p-2">
                    {
                        data?.isPublic
                            ?
                            <MdPublic className="text-xl" />
                            :
                            <MdLock className="text-xl" />
                    }
                    <input
                        type="checkbox"
                        className="appearance-none w-9 focus:outline-none checked:bg-green-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-green-500 before:h-5 before:w-5 checked:before:translate-x-full shadow-inner"
                        onChange={(e) => {
                            setData({
                                ...data,
                                isPublic: e.target.checked as boolean
                            })
                        }}

                        checked={data?.isPublic}
                    />
                </div>
                <button className="primary-button px-5 hover:" onClick={saveHandler}>
                    {
                        loading
                            ? <><AiOutlineLoading className="text-lg animate-spin" />saving</>
                            : <><BiSave className="text-lg" />save</>
                    }
                </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 space-y-2">
                    <div className="border-2 border-green-400 rounded-md p-3">
                        <h3 className="text-sm text-gray-500">Title <span className="text-green-500">*</span></h3>
                        <textarea
                            className="outline-none bg-transparent text-base w-full break-words resize-none"
                            rows={3}
                            value={data?.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                        <span className="flex justify-end">{data?.title?.length || 0}/125</span>
                    </div>
                    <div className="border-2 border-green-400 rounded-md p-3">
                        <h3 className="text-sm text-gray-500">Description</h3>
                        <textarea
                            className="outline-none bg-transparent text-base h-60 resize-none w-full"
                            value={data?.description || ''}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                        <span className="flex justify-end">{data?.description?.length || 0}/300</span>
                    </div>
                </div>
                <div className="border-2 border-green-400 rounded-md p-3 col-span-2 space-y-4 overflow-x-hidden">
                    <h3>Thumbnail</h3>
                    <img
                        className="w-full aspect-video m-auto object-contain bg-slate-300"
                        src={thumbnail && URL.createObjectURL(thumbnail as File)}
                        alt="16x9"
                    />
                    <div>
                        <input
                            type='file'
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setThumnail(e.target.files[0])
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="p-3 border-2 border-green-500 rounded-md space-y-2 h-full">
                {/* <div className="flex justify-between items-center border-b-2 pb-1">
                    <h3>Article</h3>
                    <Link to='./edit' className="primary-button">
                        <BiEdit />Edit article
                    </Link>
                </div> */}
                <h2>Article</h2>
                <MDEditor
                    value={data?.article}
                    onChange={(value) => setData({ ...data, article: value })}
                    height="93%" />
            </div>
        </section>
    )
}

export default NewBlog