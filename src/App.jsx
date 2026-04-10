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
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/:category',
    element:<Main />
  },
  {
    path:'/post',
    element:<Post />
  },
  {
    path:'/article',
    element:<Article />
  },
  {
    path:'/author',
    element:<Author />
  },
  {
    path:'/',
    element:<Navigate to='/综合' replace/>
  },
])
function App() {
  
  return (
  <Suspense fallback={<div>加载中...</div>}>
   <RouterProvider router={router}/>
    </Suspense>)
  
}

export default App
