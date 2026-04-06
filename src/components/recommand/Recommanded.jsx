import styles from './Recommanded.module.css'
import img1 from '../../img/1.jpg'
import { useEffect, useState } from 'react'

function Recommanded(props){
    const {className='',nickname,avatar}=props
    const [postUser,setPostUser]=useState('')

    useEffect(()=>{
    setPostUser(nickname)
    },[nickname])
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