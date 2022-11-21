const express = require('express');

const sequelize=require('./util/database')

const Expense = require('./models/expenses');
const Order = require('./models/orders');
const User = require('./models/users');
const Forgotpassword = require('./models/forgotpassword');

const bodyParser = require('body-parser');

const app = express();

const dotnev = require('dotenv');
dotnev.config();


const  cors = require('cors');

const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const expenseRoutes = require('./routes/expense')
const resetPasswordRoutes = require('./routes/resetpassword')


app.use(cors())

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/expense', expenseRoutes)
app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)})