import { useEffect, useState } from "react"
import { getcurrentuser,getarticles,getCollect,patchuser,getLike, patchavatar, getmyartcle } from "../api/auth"
import { useSearchParams } from "react-router-dom"
export const useAuthor=()=>{
    const [currentuser,setCurrentuser]=useState(null)
    const [articles,setArticles]=useState([])
    const [searchParams]=useSearchParams()
    const check=searchParams.get('check')
    const nowuser=async() => {
        try{
        const {data}=await getcurrentuser()
        if(data){
            setCurrentuser(data)
        }
        }catch(err){
            console.log(err);
        } 
    }
    const userarticles=async(check)=>{
        let temp=[]
        if(check=='我的'){
            const {data}=await getmyartcle()
            temp=data
        }else if(check==='喜欢'){   
            const {data}=await getarticles()
            const {data:like}=await getLike()
            const set=new Set(like.map(item=>item.target_id))
            temp=data.filter(item=>set.has(item.id))
        }else if(check==='收藏'){
            const {data}=await getarticles()
              const {data:collect}=await getCollect()   
           const set=new Set(collect.map(item=>item.target_id))
           temp=data.filter(item=>set.has(item.id))
        }
        setArticles(temp)
    }  
    const patchUser=async(newuser)=>{
        const {data}=await patchuser({nickname:newuser.nickname,userIntro:newuser.userIntro})
       setCurrentuser(data)
    }
    const patchAvatar=async(formData)=>{
        try{
            const {data}=await patchavatar(formData)
        setCurrentuser(data.user)
        alert(data.message)
        }catch(err){
            alert(err.response?.data?.message)
        }
    }
    useEffect(()=>{
        nowuser()
    },[])
    useEffect(()=>{
         userarticles(check)
    },[check])
    return {currentuser,articles,patchUser,patchAvatar}
}