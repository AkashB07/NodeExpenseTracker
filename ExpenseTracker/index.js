async function addNewExpense(e){
    try {
        e.preventDefault();

        const expenseDetails = {
            expenseamount: e.target.expenseamount.value,
            description: e.target.description.value,
            category: e.target.category.value,
            
        }
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/expense/addexpense', expenseDetails, {headers: {"Authorization" : token}})
        addNewExpensetoUI(response.data.expense);

    } catch (err) {
        console.log(err)
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        const respone = await axios.get('http://localhost:3000/expense/getexpenses', {headers: {"Authorization" : token}})
        respone.data.expenses.forEach(expense => {
        addNewExpensetoUI(expense);
       });
    } 
    catch (err) {
        console.log(err)
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
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`, {headers: {"Authorization" : token}});
        removeExpenseFromUI(expenseid);
    } 
    catch (err) {
        console.log(err)
    }  
}

function removeExpenseFromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}