import styles from './Author.module.css'
import img1 from '../../img/1.jpg'
import Card from '../../components/common/card/Card'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Return from '../../components/common/return/Return'
import { useState } from 'react'
import Edit from '../../components/common/editauthor/Edit'
import { useAuthor } from '../../hooks/useAuthor'
function Author(){
    const [edit,setEdit]=useState(false)
    const navigate=useNavigate()
    const {currentuser,articles,patchUser}=useAuthor()
    const [searchParams,setSearchParams]=useSearchParams()
    const checkname=searchParams.get('check')
    const my=['我的','收藏','喜欢']
    const ret=true
    function callback(f){
        setEdit(f)
    }
    function re(){
       setEdit(true)    
    }
    function detail(id){
        navigate(`/article?id=${id}`)
    }
    const check=(item)=>{
       setSearchParams(`check=${item}`)
    }  

    return (
        <div className={styles.container}>
          {edit? <Edit callback={callback} patchUser={patchUser}/>:null}
            <h1>个人中心</h1>
  
            <div className={styles.nav}>
                 <Return ret={ret}/>
                <nav>
                    <ul>
                        {my.map(item=>{
                            return <li key={item} onClick={()=>check(item)} className={checkname===item?styles.light:null}>{item}</li>
                        })}
                    </ul>
                    </nav>
            </div>
            <div className={styles.product}>
               
           { currentuser?
                  <div className={styles.author}>
                    <img src={img1} alt="" />
                        <h2>昵称：<span>{ currentuser.nickname}</span></h2>
                        <p>个人简介:<span>{currentuser.userIntro||'暂无简介'}</span></p>
                        <p>关注:<span>{ currentuser.like}</span></p>
                        <p>粉丝:<span>{ currentuser.fans}</span></p>
                        <button onClick={re}>编辑</button>
                </div>:null  
           }
               
                <div className={styles.card}>
                    <div className={styles.cardbox}>
                  {articles?articles.map((item)=>{
                    return <Card className={styles.detail} key={item.id}
                    title={item.title} desc={item.desc} id={item.id} ondetail={detail}/>
                  }):null
                  }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Author