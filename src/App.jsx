import { lazy,Suspense} from 'react'

import {createBrowserRouter,Navigate, RouterProvider } from 'react-router-dom'

const Login=lazy(()=>import('./pages/Login/Login'))
const Register=lazy(()=>import('./pages/Register/Register'))
const Post=lazy(()=>import('./pages/Post/Post'))
const Main=lazy(()=>import('./pages/Main/Main'))
const Article=lazy(()=>import('./pages/ArticleItem/Article'))
const Author=lazy(()=>import('./pages/Author/Author'))

const router=createBrowserRouter([
  {
    path:'/login',
    element:<Suspense fallback={<div>加载中...</div>}><Login/></Suspense>
  },
  {
    path:'/register',
    element:<Suspense fallback={<div>加载中...</div>}><Register/></Suspense>
  },
  {
    path:'/:category',
    element:<Suspense fallback={<div>加载中...</div>}><Main /></Suspense>
  },
  {
    path:'/post',
    element:<Suspense fallback={<div>加载中...</div>}><Post /></Suspense>
  },
  {
    path:'/article',
    element:<Suspense fallback={<div>加载中...</div>}><Article /></Suspense>
  },
  {
    path:'/author/:token',
    element:<Suspense fallback={<div>加载中...</div>}><Author /></Suspense>
  },
  {
    path:'/',
    element:<Navigate to='/综合' replace/>
  },
])
function App() {
  
  return <RouterProvider router={router}/>
  
}

export default App
