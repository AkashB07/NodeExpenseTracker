const token = localStorage.getItem('token');

async function addNewExpense(e){
    try {
        e.preventDefault();

        const expenseDetails = {
            expenseamount: e.target.expenseamount.value,
            description: e.target.description.value,
            category: e.target.category.value,
            
        }
        const response = await axios.post('http://localhost:3000/expense/addexpense', expenseDetails, {headers: {"Authorization" : token}})
        addNewExpensetoUI(response.data.expense);

    } catch (err) {
        showError(err);
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    try {
        const respone = await axios.get('http://localhost:3000/expense/getexpenses', {headers: {"Authorization" : token}})
        respone.data.expenses.forEach(expense => {
        addNewExpensetoUI(expense);
       });
    } 
    catch (err) {
        showError(err);
    }
})

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
    <li id=${expenseElemId}>
    ${expense.expenseamount} - ${expense.description} - ${expense.category}  
    <button onclick='deleteExpense(event, ${expense.id})'>Delete Expense</button>
    </li>`
}

async function deleteExpense(e, expenseid){
    try {
        await axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`, {headers: {"Authorization" : token}});
        removeExpenseFromUI(expenseid);
    } 
    catch (err) {
        showError(err);
    }  
}

function removeExpenseFromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}


function download(){
    axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}



document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "YAV Technology",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Akash",
       "email": "akash@gmail.com",
       "contact": "6987123456"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}