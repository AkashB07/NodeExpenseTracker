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
        alert(respone.data.message);
        localStorage.setItem('token', respone.data.token)
        window.location.href = "../ExpenseTracker/index.html";
    }
    catch (err) 
    {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<div style="color:red;">${err.message}<div>`;
    }
}

function forgotpassword() {
    window.location.href = "../ForgotPassword/password.html"
}