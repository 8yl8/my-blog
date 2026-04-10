import styles from './Edit.module.css'
import { useState } from 'react'
function Edit(props){
    const {callback,patchUser}=props
    const [newuser,setNewuser]=useState({
        nickname:'',
        userIntro:''
    })  
    return (
        <div className={styles.container}>
            <div className={styles.body}>
             <div className={styles.Return}>
                <button onClick={()=>callback()}>返回</button>
             </div>
            <h1>编辑</h1>
            <div className={styles.editbody}>
            <input type="text" placeholder='请输入昵称'id='nickname' value={newuser.nickname}
            onChange={(e)=>setNewuser({...newuser,nickname:e.target.value})}/>
            <textarea name="" id="intro" rows='6' placeholder="请输入简介"
            value={newuser.userIntro} onChange={(e)=>{setNewuser({...newuser,userIntro:e.target.value.trim()})}}></textarea>
                <div className={styles.buttonbody}>
                    <button onClick={()=>{
                        patchUser(newuser)        
                        callback()}}>修改</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit