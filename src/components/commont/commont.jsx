import styles from './commont.module.css'
import { useState,useContext } from 'react'
import CommontChild from './commontItem'
import { useComment } from '../../hooks/useComment'
import UserContext from '../../context/UserContext'
function Commont(){
    const {allComment,push,deletecomment,comments} =useComment()
    const [content,setContent]=useState('')
    const {userId}=useContext(UserContext)
    return (
        <div className={styles.commont}>
            { allComment.length>0? 
            <div className={styles.child}>
                {allComment.map((item)=>{
                    return <CommontChild key={item.id} id={item.id} 
                   ondetail={push} content={item.content} child={item.child} 
                   level={0} like={item.like} user_id={item.user_id} nickname={item.nickname} avatar={item.avatar}
                   article_id={item.article_id} userId={userId} deletecomment={deletecomment} 
                   comments={comments}/>
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