import styles from './Navhead.module.css'
import { useNavigate,useParams } from 'react-router-dom'
import {  useMemo, useRef, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { usePermission } from '../../hooks/usePermission.js'
import { debounce } from '../../utils/debounce.js'
function Navhead(){
       const [reach,setReach]=useState('')
       const reachRef=useRef()
       const categoryRef=useRef()
      
    const navigate=useNavigate()
    const {category}=useParams()
     const {exit}=useAuth()
     const {permission}=usePermission()
     const token=localStorage.getItem('token')||null
      reachRef.current=reach
       categoryRef.current=category
    const post=()=>{
       if(permission()){
        navigate('/post')
       }
    }
    const goHome=()=>navigate('/')
    const mydetail=()=>{
         if(permission()){
       navigate(`/author?check=我的`)
       }
    }
    const handleLogout=()=>{
        exit()
        navigate('/login')
    }
    
    const handleSearch=useMemo(()=>{
       return debounce(()=>{
        if(!reachRef.current) return
            navigate(`/${categoryRef.current}?search=${encodeURIComponent(reachRef.current)}`)
        },300,{immediate:true})
    },[])
    return (
        <div>
             <header className={styles.navhead}>
                    <div className={styles.nav}>
                        <h1>我的博客</h1>
                        <div>
                            <input type="text" placeholder='请输入搜索的内容' name='reach' 
                            value={reach} onChange={e=>{setReach(e.target.value.trim())}}/>
                            <button type='button' onClick={handleSearch}>搜索</button>
                        </div>
                        <ul>
                            <li onClick={goHome}>首页</li>
                            <li onClick={post}>发表</li>
                            <li onClick={mydetail}>我的</li>
                         {token? <li onClick={handleLogout}>退出登录</li>: <li onClick={handleLogout}>登录</li>}  
                        </ul>
                    </div>
                    </header>
        </div>
    )
}
export default Navhead