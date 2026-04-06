import { useState,useContext } from "react";
import { getLike,postLike,deleteLike } from "../api/auth";
import UserContext from "../context/UserContext";
import { usePermission } from "./usePermission";
export const useLike=()=>{
  const {userId}=useContext(UserContext)
  const {permission}=usePermission()
    const [count,setCount]=useState(0)
    
    const get=async(id)=>{
        const {data}=await getLike()
        if(data){
            const temp=data.filter(item=>item.target_id===id)
            setCount(temp.length)
        }
    }
    const post=async(user_id,target_id,like_target)=>{
        try{
          if(permission()){
            const like={
            user_id:user_id,
            target_id:target_id,
            like_target:like_target
        }
        await postLike(like)
    }else{
        return
    }   
    }catch(err){
       console.log(err);
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