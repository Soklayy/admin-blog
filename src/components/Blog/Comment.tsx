import { IComment } from "../../api/models/comment.interface"
import { useGet } from "../../hook/useFetch"
import userIcon from '../../assets/user.svg'

const Comment = () => {
    const [data] = useGet<IComment[]>(`blog-comment`)

    return (
        <div className="p-4 max-h-96 space-y-2 h-full" >
            {
                data?.map((comment, index) =>
                    <div className="gap-2 flex items-center" key={index}>
                        <img src={comment.user?.profileImage?.url || userIcon}
                            className="h-10 w-10 gap-1 object-cover rounded-full bg-slate-300"
                        />
                        <div className="border-2 border-green-500 h-16 bg-green-50 rounded-lg leading-3 py-1 px-2 inline-block w-4/5">
                            <div className="text-xs flex gap-1 items-center">
                                <span className="text-green-600">{comment.user?.firstname} {comment.user?.lastname}</span>
                                •
                                <span className="text-gray-500">{new Date(comment.createdAt as string).toLocaleString()}</span>
                            </div>
                            <p className="text-black text-sm">{comment?.comment}</p>
                        </div>
                        <div className="h-16 flex gap-1 w-2/6 justify-start items-center">
                            <img src={comment?.blog?.thumbnail?.url || userIcon}
                                className="h-full object-contain bg-slate-300 aspect-video"
                            />
                            <p className="text-xs text-black line-clamp-3 leading-normal text-ellipsis break-words h-">{comment?.blog?.title}</p>
                        </div>
                    </div>
                )
            }
        </ div>
    )
}

export default Comment