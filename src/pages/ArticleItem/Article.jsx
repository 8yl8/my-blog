import styles from './Article.module.css'
import Navhead from '../../components/navhead/Navhead'
import Recommanded from '../../components/recommand/Recommanded'
import Return from '../../components/common/return/Return'
import Commont from '../../components/commont/commont'
import { useArticles } from '../../hooks/useArticles'
import { useLike } from '../../hooks/useLike'
import { useCollect } from '../../hooks/useCollect'
function Article(){
    const {article,user,changearticle,change,edit,token,Delete}=useArticles()
    const {post}=useLike()
    const {collect}=useCollect()
    const ret=false
    if(!article){
        return <div>加载中</div>
    }
    return (
        <div>
            <Navhead />
            <div className={styles.container}>
                
            <div className={styles.head}>
                <Return ret={ret}/>
                <h1>{article.Title}</h1>
                <Recommanded className={styles.author} user={user}/>
            </div>
            <div className={styles.articlebody}>
                <p>{article.desc}</p>
            </div>
            <div className={styles.like}>
                <button onClick={()=>post(null,article.id,'article',null,changearticle)}>喜欢<span>{article.like}</span></button>
                <button onClick={()=>collect(article.id,change)}>收藏<span>{article.collect}</span></button>
               {user.username===token.split('-')[1]&&<button onClick={edit}>编辑</button>}
                {user.username===token.split('-')[1]&&<button onClick={()=>{Delete(article.id)}}>删除</button>}
            </div>
     {/*下面是评论的位置 */}
            <div className={styles.commont}>
                <Commont />
            </div> 
            </div>
            
        </div>
    )
}
export default Article