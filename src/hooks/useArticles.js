import {  useEffect, useState} from 'react'
import { getarticles,postarticles,patcharticles,deletearticles,getuser,getarticle,gettokenarticle, postarticlecover} from '../api/auth'
import { useParams,useSearchParams,useLocation,useNavigate } from 'react-router-dom'
export const useArticles=()=>{
    const {category}=useParams()
    const [articles,setArticles]=useState([])
    const [article,setArticle]=useState(null)
    const [searchParams]=useSearchParams()
    const [user,setUser]=useState(null)
    const location=useLocation()
    const search=searchParams.get('search')||''
    const id=new URLSearchParams(location.search).get('id')
    const token=localStorage.getItem('token')
    const [cover,setCover]=useState(null)
    
    const navigate=useNavigate()
    useEffect(()=>{
        const get=async()=>{
        const {data}=await getarticles()
        
            if(data.length===0){
                return
            }
        if(data&&!search){
        const useArticles=data.filter(item=>item.category===category)
        setArticles(useArticles)
        }else if(data){
        const useArticles=data.filter(item=>item.title.includes(search)||item.desc.includes(search))
        setArticles(useArticles)
        }
        }
        get()
    },[search,category])
  
    async function post(title,desc,category){
        if(title.trim()&&desc.trim()&&category&&cover){
        const article={title,desc,category,cover}
        await postarticles(article)
         return {success:true,msg:'发表成功'}
        }else{
            return {success:false,msg:'标题,分类,封面和内容不能为空'}
        }
    }
    async function getOnearticle(){
        if(!id)return
        let temp
        if(token){
            const {data}=await gettokenarticle(id)
            temp=data
        }else{
            const {data}=await getarticle(id)   
            temp=data
        }
        if(!temp){
            alert('文章不存在')
            return
        }
        const {data:user}=await getuser(temp.user_id)
        setUser(user)
        setArticle(temp)
    }
useEffect(()=>{
    getOnearticle()
},[id])   
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
            title:title,
            desc:desc,
            category:category,
        })
        return {success:true,msg:'编辑成功'}
    }
    const Delete=async(id)=>{
        const t=confirm('确定要删除吗')
        if(t){
            await deletearticles(id)
            navigate('/')
        }
    }
    const postcover=async(formdata)=>{
        try{
               const {data}=await postarticlecover(formdata)
        if(data){
            setCover(data.cover)
        }
        }catch(err){
            alert(err.response?.data.message)
        }
    }
 
    return {articles,article,user,post,edit,patch,Delete,getOnearticle,postcover}
}