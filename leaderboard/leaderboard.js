const token = localStorage.getItem('token');

// window.addEventListener('load',()=>{
//     axios.get('http://localhost:3000/purchase/premium/leaderboard',{headers: {authorization:loginToken} })
// .then(response=>{
//     // console.log(response.data.users)
//     response.data.users.forEach(user => {
//         // console.log(user)
        
//         addUserListToDOM(user);
        
//     });
// })
// .catch(err=>{
//     console.log(err)
// })
// })



// function addUserListToDOM(user){
//     const parentElement = document.getElementById('listofusers');
//     console.log(user)
//     parentElement.innerHTML += `
//         <li id=${user.id}> ${user.name} 
//         </li>`
// }

document.addEventListener('DOMContentLoaded',async ()=>{
    try {
        user_cont=  document.getElementById('use_cont')
        const alluser = await axios.get(`http://localhost:3000/user/getallusers`,{ headers: {"Authorization" : token}})
        let paramString = window.location.href;
        console.log(paramString.split('/'))
        console.log(alluser.data)
        var data=alluser.data
        data.sort((a, b) => parseFloat(b.totalexpense) - parseFloat(a.totalexpense));
        for(let i=0;i<data.length;i++){
        user_cont.innerHTML=user_cont.innerHTML+`<div class="users" id="users">
        <p>${i+1}</p>
        <p><a href='./user.html?userid=${data[i].id}'>${data[i].name}</a></p>
        <p>${data[i].totalexpense}</p>
        </div>`

       }
    } 
    catch (err) {
        showError('You are not a premium user '+err);
    }
})

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

// user_cont=  document.getElementById('use_cont')
// axios.get(`http://localhost:3000/user/getallusers`,{ headers: {"Authorization" : token}}).then(alluser=>{

//     let paramString = window.location.href;
//     console.log(paramString.split('/'))
//     console.log(alluser.data)
//     var data=alluser.data
//     data.sort((a, b) => parseFloat(b.totalexpense) - parseFloat(a.totalexpense));
//     for(let i=0;i<data.length;i++){
//         user_cont.innerHTML=user_cont.innerHTML+`<div class="users" id="users">
//     <p>${i+1}</p>
//     <p><a href='./user.html?userid=${data[i].id}'>${data[i].name}</a></p>
//     <p>${data[i].totalexpense}</p>
// </div>`

//     }
    
// })