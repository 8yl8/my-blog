import { useLocation, useNavigate } from 'react-router-dom'
import { getcomment,postcomment,getuser,deleteComment, getarticles } from '../api/auth'
import { useEffect, useState } from 'react'

export const useComment=()=>{
    const location=useLocation()
   const id=new URLSearchParams(location.search).get('id')
    const [allComment,setAllComment]=useState([])
    //push存储到后端去
    const push=async(user_id,target_id,parent_id,content)=>{
        try{
            const temp={
            user_id,
            target_id,
            parent_id,
            content
        }
        await postcomment(temp)
        comments()
        }catch(err){
            console.log(err);
        }
    }
//comments是拿到后端组装完成的树，所以直接拿来用
    const comments=async()=>{
        try{
              const {data}=await getarticles(id)
                setAllComment(data)
        }catch(err){
            console.log(err);  
        }
    }
    useEffect(()=>{
        comments()
    },[])
    //删除评论之后刷新这文章，手动调用comments  
    const deletecomment=async(id)=>{
            try{
                const t=prompt('确定要删除吗')
                if(t){
                 await deleteComment(id)
                 comments()
                }
            }catch(err){
                console.log(err);
            }
        }
    return {allComment,push,deletecomment,comments}
}