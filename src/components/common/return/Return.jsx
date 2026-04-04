import styles from './Return.module.css'
import { useNavigate } from 'react-router-dom'
function Return({ret}){
    const navigate=useNavigate()
    return (
        <div className={styles.Return}>
            <button onClick={()=>{
                if(ret){
                    navigate('/')
                }else{
                    navigate(-1)
                }
               }}>&lt;返回</button>
        </div>
    )
}
export default Return