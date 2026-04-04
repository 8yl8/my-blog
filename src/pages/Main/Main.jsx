import styles from './Main.module.css'
import AsideCard from '../../components/asidecard/AsideCard'
import Articles from '../../components/articles/Articles'
import Recommanded from '../../components/recommand/Recommanded'
import Navhead from '../../components/navhead/Navhead'
function Main(){
    
    return (
        <div className={styles.all}>
           <Navhead />
            <div className={styles.container}>
                <div className={styles.aside}>
                    <AsideCard />
                </div>
                <div className={styles.articles}>
                    <Articles />
                </div>
                <div className={styles.recommanded}>
                    <Recommanded />
                </div>
            </div>
        </div>
    )
}
export default Main