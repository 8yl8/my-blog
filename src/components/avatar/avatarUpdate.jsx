import { useEffect, useState } from 'react'
import { useAuthor } from '../../hooks/useAuthor'
import styles from './avatarUpdate.module.css'
import img1 from '../../img/1.jpg'
function AvatarUpdate(props){
    const {Close,current,patchAvatar}=props
    const [preview,setPreview]=useState(null)
    const [update,setUpdate]=useState(null)
    function handleChange(e){
        const file=e.target.files[0]
        if(preview){
            URL.revokeObjectURL(preview)
        }
        setUpdate(file)
        setPreview(URL.createObjectURL(file))
    }

  async function handleUpdate(){
    if(!update){
        alert('请传文件')
        return 
    }
        const formdata=new FormData()
        formdata.append('avatar',update)
        await patchAvatar(formdata)
        Close()
    }
    useEffect(()=>{
        return ()=>{
            if(preview){
                URL.revokeObjectURL(preview)
            }
        }
    },[preview])

    return (<div className={styles.avatar}>
        <img src={preview||current||img1} alt="" />
        <button className={styles.choose}>选择文件  <input type="file" accept={"image/*"} onChange={handleChange} /></button>
        <button className={styles.btn} onClick={handleUpdate}>保存</button>
        <button  className={styles.btn} onClick={Close}>取消</button>
    </div>)
}
export default AvatarUpdate