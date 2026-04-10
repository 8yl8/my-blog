import { config } from '../../api/config'
import styles from './Recommanded.module.css'
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
                   <img src={config.baseUrl+avatar} alt="" />
                   <h4>{postUser}</h4>
                   </a>
            </div>
    )
}

export default Recommanded