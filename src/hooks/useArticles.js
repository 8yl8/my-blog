import {  useEffect, useState } from 'react'
import { getarticles,postarticles,patcharticles,deletearticles} from '../api/auth'
import { useParams,useSearchParams,useLocation,useNavigate } from 'react-router-dom'
import { getuser } from '../api/auth'
import { useAuth } from './useAuth'
import { useLike } from './useLike'
import { useCollect } from './useCollect'
import { useComment } from './useComment'
export const useArticles=()=>{
    const {category}=useParams()
    const [articles,setArticles]=useState([])
    const [article,setArticle]=useState(null)
    const [searchParams]=useSearchParams()
    const [user,setUser]=useState(null)
    const location=useLocation()
    const {token}=useAuth()
    const {deletecollect}=useCollect()
    const {deletelike}=useLike()
    const {deletecomment}=useComment()
    const search=searchParams.get('search')||''
    const id=new URLSearchParams(location.search).get('id')
    const navigate=useNavigate()
    useEffect(()=>{
        const get=async()=>{
        const {data}=await getarticles()
        if(data&&!search){
        const useArticles=data.filter(item=>item.category===category)
        setArticles(useArticles)
        }else if(data){
        const useArticles=data.filter(item=>item.Title.includes(search)||item.desc.includes(search))
        setArticles(useArticles)
        }
        }
        get()
    },[search,category])
    const get=async()=>{
            const {data} =await getarticles()
            const {data:user}=await getuser()
            if(data&&user){
                const useArticle=data.find(item=>item.id===id)  
                if(useArticle){
                    const articleUser=user.find(item=>useArticle.username===item.username) 
                    setArticle(useArticle)
                setUser(articleUser)
                } 
                
            }
        }
        const changearticle=async(target_id,newCount)=>{
            if(target_id!==null){
                await patcharticles(target_id,{like:newCount})
            await get()
            }
            
        }
        const change=async (target_id,newCount)=>{
            if(target_id!==null){
                await patcharticles(target_id,{collect:newCount})
                await get()
            }
        }
        useEffect(()=>{
        get()
    },[id])
    async function post(Title,desc,category){
        try{
            const {data}=await getuser()
        if(token,Title.trim(),desc.trim(),category,data){
            const username=token.split('-')[1]
            const nickname=data.find(item=>item.username===username).nickname
        const article={
        id:Date.now()+'-'+token.split('-')[1],
        username:username,
        nickname:nickname||'无名',
        Title:Title,
        desc:desc,
        category:category,
        like:0,
        collect:0,
        }
        await postarticles(article)
         return {success:true,msg:'发表成功'}
        }else{
            throw new Error('输入不能为空')
        }
       
        }catch(err){
            return {success:false,msg:'发表失败'}
        }
      
    }
    const edit=async()=>{
        if(article){
            navigate('/post',{
                state:{
                    article:article,
                    istrue:true
                }
            })
        }
    }
    const patch=async(id,title,desc,category)=>{
        await patcharticles(id,{
            Title:title,
            desc:desc,
            category:category
        })
        get()
        return {success:true,msg:'编辑成功'}
    }
    const Delete=async(id)=>{
        const t=confirm('确定要删除吗')
        if(t){
            await deletearticles(id)
            await deletelike(id)
            await deletecollect(id)
            await deletecomment(id)
            navigate('/')
        }
    }
 
    return {articles,article,user,post,changearticle,change,edit,patch,token,Delete}
}