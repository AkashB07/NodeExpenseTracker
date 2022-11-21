const loginToken = localStorage.getItem('token');

window.addEventListener('load',()=>{
    axios.get('http://localhost:3000/purchase/premium/leaderboard',{headers: {authorization:loginToken} })
.then(response=>{
    // console.log(response.data.users)
    response.data.users.forEach(user => {
        // console.log(user)
        
        addUserListToDOM(user);
        
    });
})
.catch(err=>{
    console.log(err)
})
})



function addUserListToDOM(user){
    const parentElement = document.getElementById('listofusers');
    console.log(user)
    parentElement.innerHTML += `
        <li id=${user.id}> ${user.name} 
        </li>`
}

