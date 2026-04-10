import styles from './Post.module.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useArticles } from '../../hooks/useArticles'
function Post(){
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [category,setCategory]=useState('')
    const {post,patch,postcover}=useArticles()
     const navigate=useNavigate()
    const location=useLocation()
    const t=location.state?true:false
    useEffect(()=>{
        if(location.state?.istrue){
        setDesc(location.state.article.desc)
        setTitle(location.state.article.title)
        setCategory(location.state.article.category)
    } 
    },[])
    
   async function submit(e){
        e.preventDefault()
            if(t){
                const res=await patch(location.state.article.id,title,desc,category)
               if(res.success){
                alert(res.msg)
                navigate(`/article?id=${location.state.article.id}`)
               }else{
                alert('编辑失败')
            }
            }else{
            const res=await post(title,desc,category)
            if(res.success){
                alert(res.msg)
                navigate('/')
                return
            }
               alert(res.msg)
            }
    }
    function Return(){
            navigate('/')
    }
    function handle(e){
         setCategory(e.target.value)
    }
    function handlesubmit(){
        if(!category){
            alert('请选择类别')
            return
        }
    }
    function handlecover(e){
        e.preventDefault()
        const file=e.target.files[0]
        if(!file){
            alert('请选择封面')
            return
        }
        const formdata=new FormData()
        formdata.append('cover',file)
        postcover(formdata)
    }
    return (
        <div className={styles.container}>
            <h2>发表</h2>
            <form onSubmit={submit}>
                <div>
                     <input type="text" className={styles.pub} placeholder="请输入标题" id='title' value={title} 
                      onChange={e=>{setTitle(e.target.value)}}/>
                    <textarea id="desc" className={styles.pub} placeholder="请输入内容" rows='30'
                    value={desc} onChange={e=>{setDesc(e.target.value)}}></textarea>
                    {/*下面是对该文章进行分类的选项，用于后续主页的展示 */}
                    <div>
                        <div className={styles.category}>
                        <select value={category} onChange={handle} required>
                            <option value='' >请选择分类</option>
                            <option value="综合">综合</option>
                            <option value="前端">前端</option>
                            <option value="后端">后端</option>
                            <option value="Android">Android</option>
                            <option value="IOS">IOS</option>
                            <option value="人工智能">人工智能</option>
                        </select>
                        <button type="button" className={styles.btn} onChange={(e)=>handlecover(e)}>选择封面<input type="file" accept="image/*" /></button>
                        </div>
                    </div>
                    {t?
                     <button type='submit' onClick={handlesubmit}>修改</button>:
                      <button type='submit' onClick={handlesubmit}>发表</button>
                }
                   
                     <button type='button' onClick={Return}>返回</button>
                </div>
            </form>
        </div>
    )
}
export default Post