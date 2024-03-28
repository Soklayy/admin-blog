import MDEditor from "@uiw/react-md-editor/nohighlight"
import { useEffect, useState } from "react"
import { MdDelete, MdLock, MdPublic } from "react-icons/md"
import { useGet } from "../../hook/useFetch"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BiArrowBack, BiEdit, BiSave } from "react-icons/bi"
import { IBlog } from "../../api/models/blog.interface"
import { AiOutlineLoading } from "react-icons/ai"
import { axiosInstance } from "../../api/axios.instance"
import userIcon from '../../assets/user.svg'

const dataDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useGet<IBlog>(`blog/${id}`)
    const [thumbnail, setThumnail] = useState<File | string>('')

    useEffect(() => {
        if (data?.thumbnail?.url) {
            setThumnail(data.thumbnail.url)
        }
    }, [data])


    const saveHandler = () => {
        setLoading(true)
        axiosInstance.patch(`blog/${id}`,
            {
                ...data,
                thumbnail: thumbnail as File
            },
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            }
        ).then(res => {
            setData(res.data)
            setLoading(false)
            alert('Success')
        }).catch((err: any) => {
            setLoading(false)
            alert('!' + err?.code + ': ' + err?.response.data.message)
        })

    }

    const deleteHandler = () => {
        const sure = confirm('Are you sure to deleted this blog?')
        if (sure) {
            axiosInstance.delete(`blog/${id}`)
                .then((response) => {
                    if (response.status == 200) {
                        navigate('../')
                    }
                }).catch((err: any) => {
                    alert(err?.code + ': ' + err?.response.data.message)
                })
        }
    }

    return (
        <section className="space-y-3 p-10 pt-5 h-full">
            <Link to='../' className="primary-button w-fit">
                <BiArrowBack className="text-xl" />Back
            </Link>
            <h2 className="font-bold text-xl">
                Blog details
            </h2>
            <div className="flex justify-between">
                <div className="flex items-center gap-1 border-2 border-green-400 w-fit rounded-md p-2">
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
                                isPublic: e.target.checked
                            })
                        }}

                        checked={data?.isPublic || false}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <button className="primary-button px-5 bg-red-500 hover:bg-red-400" onClick={deleteHandler}>
                        <MdDelete className="text-lg" />delete
                    </button>
                    <button className="primary-button px-5" onClick={saveHandler}>
                        {
                            loading
                                ? <><AiOutlineLoading className="text-lg animate-spin" />saving</>
                                : <><BiSave className="text-lg" />save</>
                        }
                    </button>
                </div>
            </div>
            <div>
                <span className=" text-slate-400">Published {new Date(data?.createdAt as string).toDateString()}</span>
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
                        src={('string' == typeof thumbnail) ? thumbnail as string : URL.createObjectURL(thumbnail as File)}
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
            <div className="grid grid-cols-2 gap-1">
                <div className="p-3 border-2 border-green-500 rounded-md space-y-2">
                    <div className="flex justify-between items-center border-b-2 pb-1">
                        <h3>Article</h3>
                        <Link to='./edit' className="primary-button">
                            <BiEdit />Edit article
                        </Link>
                    </div>
                    <MDEditor.Markdown source={data?.article} className="bg-transparent max-h-96 overflow-y-auto h-full" />
                </div>
                <div className="p-3 border-2 border-green-500 rounded-md space-y-2">
                    <h3 className="border-b-2 pb-1">Comments ({data?.comment?.length})</h3>
                    <div className="p-4 max-h-96 overflow-y-auto h-full space-y-2">
                        {
                            data?.comment?.map((comment, index) =>
                                <div className="gap-2 flex items-center" key={index}>
                                    <img src={comment.user?.profileImage?.url || userIcon}
                                        className="h-10 w-10 gap-1 object-cover rounded-full bg-slate-300"
                                    />
                                    <div className="border-2 border-green-500 bg-green-50 rounded-lg leading-3 py-1 px-2 inline-block">
                                        <div className="text-xs flex gap-1 items-center">
                                            <span className="text-green-600">{comment.user?.firstname} {comment.user?.lastname}</span>
                                            •
                                            <span className="text-gray-500">{new Date(comment.createdAt as string).toLocaleString()}</span>
                                        </div>
                                        <p className="text-black text-sm">{comment?.comment}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default dataDetail