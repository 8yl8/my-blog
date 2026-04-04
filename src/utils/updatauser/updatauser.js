// export function updataUser(){
//     const updatauser='updateuser'
 
//     const users=JSON.parse(localStorage.getItem('users')||'[]')
//     const newusers=users.map(item=>{
//         return {...item,userIntro:item.userIntro||'暂无简介',userLike:item.userLike||0,userFans:item.userFans||0}
//     })
//     localStorage.setItem('users',JSON.stringify(newusers))
//     localStorage.setItem(updatauser,'done')
// }