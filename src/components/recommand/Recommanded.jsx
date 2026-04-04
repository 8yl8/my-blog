import styles from './Recommanded.module.css'
import img1 from '../../img/1.jpg'
import { useEffect, useState } from 'react'

function Recommanded(props){
    const {className='',user}=props
    const [postUser,setPostUser]=useState('')

    useEffect(()=>{
         if(user){
    setPostUser(user.nickname)
 }
    },[user])
    return (    
        <div className={`${styles.rside} ${className}`}>
                   <a>
                   <img src={img1} alt="" />
                   <h4>{postUser}</h4>
                   </a>
            </div>
    )
}

export default Recommanded