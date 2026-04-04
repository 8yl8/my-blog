import styles from './commont.module.css'
import { useState } from 'react'
import CommontChild from './commontItem'
import { useComment } from '../../hooks/useComment'
import { useAuth } from '../../hooks/useAuth'
function Commont(){
    const {allComment,push,change,deletecomment} =useComment()
    const [content,setContent]=useState('')
    const {token}=useAuth()
    return (
        <div className={styles.commont}>
            { allComment.length>0? 
            <div className={styles.child}>
                {allComment.map((item)=>{
                    return <CommontChild key={item.id} id={item.id} 
                   ondetail={push} content={item.content} child={item.child} 
                   level={0} username={item.username} like={item.like} user={item.user} change={change}
                   article_id={item.article_id} token={token} deletecomment={deletecomment}/>
                })}
                </div>
                 : <h1>暂无评论</h1> }
    
              <div className={styles.foot}>
              <textarea placeholder='评论'
              id='commont' className={styles.footcommont}
              value={content} onChange={(e)=>{setContent(e.target.value.trim())}}>
                </textarea>
              <button onClick={()=>{
                push(content)
                setContent('')
              }
              }>回复</button>
              </div>
        </div>
    )
}
export default Commont