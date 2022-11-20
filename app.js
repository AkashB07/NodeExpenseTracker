const express = require('express');

const sequelize=require('./util/database')

const Expense = require('./models/expenses');
const User = require('./models/users');

const bodyParser = require('body-parser');

const app = express();

const dotnev = require('dotenv');
dotnev.config();


const  cors = require('cors');

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')

User.hasMany(Expense);
Expense.belongsTo(User);

app.use(cors())

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)


// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
   
    app.listen(3000);
})
.catch(err=>{
    console.log(err)})