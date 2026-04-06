import styles from './commontItem.module.css'
import Recommanded from '../recommand/Recommanded'
import { useState } from 'react'
import { useLike } from '../../hooks/useLike'
function CommontChild(props){
    //传的是每个评论的各种属性包括回调函数
    const {id,ondetail,content,child,level,like,article_id,userId,deletecomment,user_id,nickname,avatar}=props
     const [childContent,setChildContent]=useState('')
    const [show,setShow]=useState(false)
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
        ondetail(userId,article_id,id,childContent)
        setShow(false)
        setChildContent('')
        }
    }

 
   
    return (
         <div className={styles.commont} style={Commonts}>
            <div>
                <div className={styles.commontbody}>
                <div className={styles.reply}>
                    <Recommanded className={styles.Recommanded} nickanem={nickname} avatar={avatar}/>   
                    <div>
                    <button onClick={Show}>回复</button>
                    <button onClick={()=>post(userId,article_id,'comment')}>喜欢<span>{like}</span></button>
                     {userId===user_id?<button onClick={()=>deletecomment(id)}>删除</button>:null}
                  
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
                        child={childItem.child} level={level+1} nickname={childItem.nicanme} avatar={childItem.avatar}
                        like={childItem.like} user_id={childItem.user_id} userId={userId}
                        article_id={childItem.article_id} deletecomment={deletecomment} />
                    })}  
                </div>
                )} 
          </div>
            </div>
       
    )
}
export default CommontChild