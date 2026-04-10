import styles from './Article.module.css'
import Navhead from '../../components/navhead/Navhead'
import Recommanded from '../../components/recommand/Recommanded'
import Return from '../../components/common/return/Return'
import Commont from '../../components/commont/commont'
import { useArticles } from '../../hooks/useArticles'
import { useLike } from '../../hooks/useLike'
import { useCollect } from '../../hooks/useCollect'
function Article(){
    const {article,user,edit,Delete,getOnearticle}=useArticles()
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
                <div className={styles.like}>
                <button onClick={async()=>{
                   await post(article.id,'article')
                    await getOnearticle()
                }} className={article.islike?styles.lc:null}>喜欢<span>{article.like}</span></button>

                <button onClick={async()=>{
                    await collect(article.id)
                    await getOnearticle()
                }
                } className={article.iscollect?styles.lc:null} >收藏<span>{article.collect}</span></button>
                 {article.isuser?<button onClick={edit}>编辑</button>:null}
                  {article.isuser?<button onClick={()=>{Delete(article.id)}}>删除</button>:null}
            </div>
            <div className={styles.head}>
                <Return ret={ret}/>
                <h1>{article.title}</h1>
                <Recommanded className={styles.author} nickname={user.nickname} avatar={user.avatar}/>
            </div>
            <div className={styles.articlebody}>
                <p>{article.desc}</p>
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