import styles from './Card.module.css'
import { config } from '../../../api/config'
function Card(prop){
    const {title='',desc='',author='',id='',ondetail='',className='',cover}=prop
     const shortDesc=desc.length>40?desc.slice(0,40)+'...':desc
     const shortAuthor=author.length>40 ?author.slice(0,40)+'...':author
     const shortTitle=title.length>7? title.slice(0,7)+'...':title
     
     const detail=()=>{
        if(id&&ondetail){
            ondetail(id)
        }
     }
    return (
        <div className= { `${styles.card} ${className}`}  onClick={detail} >
            <img src={config.baseUrl+cover} alt="图片" />
            <div>
                <h2>{shortTitle}</h2>
                <h3>{shortAuthor}</h3>
                <p className={styles.desc}>{shortDesc}</p>
            </div>
        </div>
    )
}
export default Card