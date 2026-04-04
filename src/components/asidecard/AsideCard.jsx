import styles from './AsideCard.module.css'
import { useNavigate,useParams } from 'react-router-dom'
function AsideCard(){
    const categorys=['综合','后端','前端','Android','IOS','人工智能']
    const navigate=useNavigate()
    const {category}=useParams()
    function handle(category){
        navigate( `/${category}`)
    }
    return (
    <div className={styles.aside}>
        <ul className={styles.asideList}>
           {categorys.map(item=>{
                return <li key={item} onClick={()=>handle(item)} className={category===item?styles.light:null}>{item}</li>
           })}    
        </ul>
    </div>)
}
export default AsideCard