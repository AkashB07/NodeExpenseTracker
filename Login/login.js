async function login(e)
{
    try 
    {
        e.preventDefault();
        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(loginDetails);

        const respone = await axios.post('http://localhost:3000/user/login', loginDetails)
        alert(respone.data.message)
    }
    catch (err) 
    {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<div style="color:red;">${err.message}<div>`;
    }
}