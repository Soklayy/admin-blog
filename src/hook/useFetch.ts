import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { axiosInstance } from "../api/axios.instance"

export const useGet = <T>(url: string) => {
    const [responseData, setResponseData] = useState<T>()
    useEffect(() => {
        axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setResponseData(response.data)
        }).catch((err) => {
           console.error(err.response?.data)
        })
    }, [url])

    return [responseData, setResponseData] as [T, Dispatch<SetStateAction<T>>]
}

