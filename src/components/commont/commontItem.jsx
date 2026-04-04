import styles from './CommontItem.module.css'
import Recommanded from '../recommand/Recommanded'
import { useState } from 'react'
import { useLike } from '../../hooks/useLike'
function CommontChild(props){
    //传的是每个评论的各种属性包括回调函数
    const {id,ondetail,content,child,level,like,user,username,change,article_id,token,deletecomment}=props
     const [childContent,setChildContent]=useState('')
    const [show,setShow]=useState(false)
    const t=token.split('-')[1]
    const {post}=useLike()
    const Commonts={
        marginLeft:level===1?'100px':'0'
    }
    
    function Show(){
        setShow(true)
    }
    function noShow(){
        setShow(false)
    }
    const detail=()=>{
        if(childContent){
        ondetail(childContent,id)
        setShow(false)
        setChildContent('')
        }
    }

 
   
    return (
         <div className={styles.commont} style={Commonts}>
            <div>
                <div className={styles.commontbody}>
                <div className={styles.reply}>
                    <Recommanded className={styles.Recommanded} user={user}/>   
                    <div>
                    <button onClick={Show}>回复</button>
                    <button onClick={()=>post(username,id,'comment',change)}>喜欢<span>{like}</span></button>
                     {t===article_id.split('-')[1]||t===username?<button onClick={()=>deletecomment(null,id)}>删除</button>:null}
                  
                    </div> 
                </div>
                <p>{content}</p>
                </div>
                <div className={styles.Button}>
               
                </div>
                {/*下面是出现评论的输出框 */}
                {show&&
                <div className={styles.Input}>
                    <textarea id="commont" placeholder="请输入评论"
                    value={childContent} onChange={(e)=>{setChildContent(e.target.value.trim())}}></textarea>
                    <button onClick={detail}>发表</button>
                   <button onClick={noShow}>取消</button>
                   
                </div>
                
                }
                </div>


                <div className={styles.childCommonts} >
                {child&&child.length>0&&(
                <div>
                    {child.map((childItem)=>{
                       return  <CommontChild key={childItem.id} id={childItem.id}
                        ondetail={ondetail} content={childItem.content}
                        child={childItem.child} level={level+1} username={childItem.username} 
                        like={childItem.like} user={childItem.user} change={change} 
                        article_id={childItem.article_id} deletecomment={deletecomment}/>
                    })}  
                </div>
                )}
          </div>
            </div>
       
    )
}
export default CommontChild