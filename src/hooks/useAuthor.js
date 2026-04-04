import { useEffect, useState } from "react"
import { getuser,getarticles,getLike,getCollect,patchuser } from "../api/auth"
import { useSearchParams } from "react-router-dom"
export const useAuthor=()=>{
    const token=localStorage.getItem('token')
    const username=token.split('-')[1]
    const [currentuser,setCurrentuser]=useState(null)
    const [articles,setArticles]=useState([])
    const [searchParams]=useSearchParams()
    const check=searchParams.get('check')
    const nowuser=async() => {
        const {data}=await getuser()
        if(data){
            const temp=data.find(item=>item.username===username)
            setCurrentuser(temp)
        }
    }
    const userarticles=async()=>{
        const {data}=await getarticles()
        const {data:like}=await getLike()
        const {data:collect}=await getCollect()
        let temp=[]
        if(data&&check=='我的'){
            temp=data.filter(item=>item.username===username)            
        }else if(check==='喜欢'){        
         const c=like.filter(item=>item.like_target==='article'&&item.username===username)
        c.forEach(item=>{
            temp.push(data.find(all=>all.id===item.target_id))
        })   
        }else if(check==='收藏'){
            if(collect){
                const c=collect.filter(item=>item.username===username)
                c.forEach(item=>{
                    temp.push(data.find(all=>all.id===item.target_id))
                })
            }
        }
        setArticles(temp)
    }  
    const patchUser=async(newuser)=>{
        const {data}=await patchuser(currentuser,{nickname:newuser.nickname,userIntro:newuser.userIntro})
       setCurrentuser(data)
    }
    useEffect(()=>{
        nowuser()
    },[])
    useEffect(()=>{
         userarticles(check)
    },[check])
    return {currentuser,articles,patchUser}
}