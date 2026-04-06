import styles from './Articles.module.css'
import Card from '../common/card/Card'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../hooks/useArticles.js'

function Articles(){
    const navigate=useNavigate()
    const {articles,user}=useArticles()
//下面是对文章的搜索展示
    function detail(id){
        navigate(`/article?id=${id}`)
    }
    return (
        <div className={styles.cardList}>
            {articles.length>0?articles.map((article)=>{
                return <Card title={article.title} author={user.nickname}
               desc={article.desc} key={article.id} id={article.id} ondetail={detail}/>
            }):<div className={styles.nocard}><h1>暂无文章</h1></div>}
        </div>
    )  
}  
export default Articles