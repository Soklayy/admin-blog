import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./page/Home";
import SideBar from "./components/common/SideBar";
import Blog from "./page/Blog";
import BlogEditor from "./components/Blog/BlogEditor";
import NewBlog from "./components/Blog/NewBlog";
import BlogList from "./components/Blog/BlogList";
import BlogDetail from "./components/Blog/BlogDetail";
import Comment from "./components/Blog/Comment";
import Profile from "./components/profile/Profile";
import Login from "./page/Login";
import { useEffect } from "react";
import { axiosInstance } from "./api/axios.instance";
import { login, logout } from "./redux/feature/Auth/auth.slide";
import { useAppDispatch, useAppSelector } from "./redux/hook";

export default function App() {
  const navigate = useNavigate()
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (auth?.accessToken) {
      axiosInstance.get('auth/profile', {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      }).then((res) => {
        if (res?.data?.role !== 'admin') {
          dispatch(logout())
        }
        dispatch(login({ user: res?.data }))
      }).catch(() => {
        dispatch(logout())
        navigate('login')
      })
    } else {
      navigate('login')
    }
  }, [auth?.accessToken])

  return (
    <Routes>
      <Route element={
        <>
          <Header />
          <div className="grid grid-cols-12 max-h-[calc(100vh-4rem)] h-full bg-slate-100 w-full fixed top-16 z-50">
            <SideBar />
            <div className="w-full mb-5 col-span-12 md:col-span-10 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </>
      }>
        <Route path="/" element={<Home />} />
        <Route path="/blogs"
          element={
            <Outlet />
          }
        >
          <Route path="new-blog" element={<NewBlog />} />
          <Route path=":id" element={<BlogDetail />} />
          <Route path=":id/edit" element={<BlogEditor />} />
        </Route>
        <Route path="/blogs"
          element={
            <Blog>
              <Outlet />
            </Blog>
          }
        >
          <Route index element={<BlogList />} />
          <Route path="comments" element={<Comment />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes >
  )
}

