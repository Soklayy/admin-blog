
import { BiArrowBack, BiSave } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { IBlog } from "../../api/models/blog.interface";
import { useGet } from "../../hook/useFetch";
import MDEditor from '@uiw/react-md-editor/nohighlight';
import { AiOutlineLoading } from "react-icons/ai";
import { useState } from "react";
import { axiosInstance } from "../../api/axios.instance";



const BlogEditor = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useGet<IBlog>(`blog/${id}`)


    const saveHandler = () => {
        setLoading(true)
        axiosInstance.patch(`blog/${id}`,
            {
                article: data.article
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

    return (
        <div className="h-full p-3 space-y-3">
            <div className="flex justify-between items-center">
                <Link to={`../${id}`} className="primary-button w-fit">
                    <BiArrowBack className="text-xl" />Back
                </Link>
                <button className="primary-button px-5" onClick={saveHandler}>
                    {
                        loading
                            ? <><AiOutlineLoading className="text-lg animate-spin" />saving</>
                            : <><BiSave className="text-lg" />save</>
                    }
                </button>
            </div>
            <MDEditor
                value={data?.article}
                onChange={(value) => setData({ ...data, article: value })}
                height="100%" />
        </div>
    )
}

export default BlogEditor