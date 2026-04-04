import { useState } from "react";
import { getLike,postLike,deleteLike } from "../api/auth";
export const useLike=()=>{
  
    const [count,setCount]=useState(0)
    
    const get=async(id)=>{
        const {data}=await getLike()
        if(data){
            const temp=data.filter(item=>item.target_id===id)
            setCount(temp.length)
        }
    }
    const post=async(username,target_id,like_target,change,changearticle)=>{
          const token=localStorage.getItem('token')
         
         if(!token){
            alert('请先登录')
            return
        }
         let username1=username||token.split('-')[1]
        const {data}=await getLike()
       
        const hasuser=data.find(item=>item.username===username1&&item.target_id===target_id)
        if(hasuser){
            await deleteLike(hasuser.id)
        }else{
             const temp={
            like_target:like_target,
            target_id:target_id,
            username:username1,
            id:Date.now()+'-'+username1+'-'+Math.random().toString(36).substring(2,11),
        }
        await postLike(temp)
        }
       const {data:update}=await getLike()
       const newCount=update.filter(item=>item.target_id===target_id).length
       setCount(newCount)
          if(change){
                change(target_id,newCount)
            }
            if(changearticle){
                changearticle(target_id,newCount)
            }
    }
    const deletelike=async(id)=>{
        const {data}=await getLike()
        const deletelike=data.filter(item=>item.target_id===id)
        await Promise.all(
            deletelike.map(item=>
                deleteLike(item.id)
            )
        )
        
    }
   
    return {post,count,get,deletelike}
}