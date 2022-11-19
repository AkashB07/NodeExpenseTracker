const Expense = require('../models/expenses');


function isexpensevalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const addexpense = async (req, res) => {
    try 
    {
        const{expenseamount, description, category} = req.body;     
        if(isexpensevalid(expenseamount) || isexpensevalid(description) || isexpensevalid(category)){
            return res.status(400).json({succese: false, message: "Parameters missing"});
        }  
        const expense = await Expense.create({expenseamount, description, category});
        return res.status(201).json({expense, succese: true});   
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err});
    }
}

const getexpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        return res.status(200).json({expenses, succese: true});   
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err})
    }
}

const deleteexpense = async (req, res) => {
    try {
        const expenseid = req.params.expenseid;
        if(isexpensevalid(expenseid))
        {
            return res.status(400).json({succese: false});
        }
        await Expense.destroy({where: {id: expenseid}});
        return res.status(200).json({succese: true, message: "Deleted Successfully"});
        
    } 
    catch (err) {
        return res.status(403).json({succese: true, message: "Failed"})
    }
}

module.exports = {
    addexpense,
    getexpenses,
    deleteexpense
}

