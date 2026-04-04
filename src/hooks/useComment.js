import { useLocation, useNavigate } from 'react-router-dom'
import { getcomment,postcomment,getuser,patchcomment,deleteComment } from '../api/auth'
import { useEffect, useState } from 'react'

export const useComment=()=>{
    const location=useLocation()
   const id=new URLSearchParams(location.search).get('id')
   const [articleId,setArticleId]=useState(null)
    const [commentUser,setCommentUser]=useState(null)
    const token=localStorage.getItem('token')
    const [allComment,setAllComment]=useState([])
    const navigate=useNavigate()
    //push是评论是存储到后端的逻辑，这里采用扁平化结构，更加方便
    const push=async(content,id)=>{
         try{
         if(content&&commentUser){
         const newcomment={
                id:Date.now()+'-'+commentUser+'-'+Math.random().toString(36).substring(2,11),
                content:content,
                like:0,
                parent_id:id||null,
                username:commentUser,
                time:Date.now(),
                article_id:articleId,
            }
            await postcomment(newcomment)
            await comments()
        }else{
            throw new Error('评论不能为空')
        }
        }catch(err){
            alert(err.message)
        }   
    }
//comments是拿到后面的评论然后组装，使得可以完成多级嵌套，也就是树形结构，到时候使用二级评论的形式来进行渲染
    const comments=async()=>{
        const {data}=await getcomment()
        const {data:user}=await getuser()
        const map=new Map()
        const roots=[]
        const article=data.filter(item=>item.article_id===id)
        article.forEach(item=>{
            const temp=user.find(user=>user.username===item.username)
            map.set(item.id,{
              ...item,
                child:[],
                user:temp,
            })
        })
        article.forEach(item=>{
            const node=map.get(item.id)
            if(item.parent_id===null){
                roots.push(node)
            }else{
                const parent=map.get(item.parent_id)
                if(parent){
                    parent.child.push(node)
                }
            }
        })
        setAllComment(roots)
    }
    
    useEffect(()=>{ 
        if(id){
            setArticleId(id)
        }
        if(token){
            setCommentUser(token.split('-')[1])
        }
         comments()
    },[])
    const change=async(target_id,count)=>{
            if(target_id!==null){
                await patchcomment(target_id,{like:count})
                await comments()
            }   
        }
        const deletecomment=async(id,oneId)=>{
            if(id){
            const {data}=await getcomment()
            const alldelete=data.filter(item=>item.article_id===id)
            await Promise.all(
                alldelete.map(async (item)=>
                await deleteComment(item.id)
            )
            )
            navigate('/')
            }else{
                await deleteComment(oneId)
                comments()
            }
            
        }
    return {allComment,push, change,deletecomment}
}