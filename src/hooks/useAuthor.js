import { useEffect, useState,useContext } from "react"
import { getuser,getarticles,getCollect,patchuser,getUserLike } from "../api/auth"
import { useSearchParams } from "react-router-dom"
import UserContext from "../context/UserContext"
export const useAuthor=()=>{
    const [currentuser,setCurrentuser]=useState(null)
    const [articles,setArticles]=useState([])
    const [searchParams]=useSearchParams()
    const check=searchParams.get('check')
    const {userId}=useContext(UserContext)
    const nowuser=async() => {
        try{
        const {data}=await getuser(userId)
        if(data){
            setCurrentuser(data)
        }
        }catch(err){
            console.log(err);
        }
       
    }
    const userarticles=async(check)=>{
        const {data}=await getarticles()
        const {data:like}=await getUserLike(userId)
        const {data:collect}=await getCollect(userId)
        let temp=[]
        if(data&&check=='我的'){
            temp=data.filter(item=>item.user_id===userId)
        }else if(check==='喜欢'){        
            const set=new Set(like.filter(item=>item.user_id===userId)
            .map(item=>item.target_id)
        )
            temp=data.filter(item=>set.has(item.id))
        }else if(check==='收藏'){
           const set=new Set(collect.filter(item=>item.user_id===userId)
        .map(item=>item.target_id))
           temp=data.filter(item=>set.has(item.id))
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