const path = require('path');
const fs = require('fs')
const dotnev = require('dotenv');
dotnev.config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const  cors = require('cors');

const sequelize=require('./util/database')

const Expense = require('./models/expenses');
const Order = require('./models/orders');
const User = require('./models/users');
const Forgotpassword = require('./models/forgotpassword');
const Downloadlist=require('./models/downloadlist')

const bodyParser = require('body-parser');

const app = express();


const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const expenseRoutes = require('./routes/expense')
const resetPasswordRoutes = require('./routes/resetpassword')
const downloadlistRoutes=require('./routes/downloadlist')

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), {flags: 'a'}
);
app.use(cors())
app.use(helmet())
app.use(morgan('combined', {stream: accessLogStream}));

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/expense', expenseRoutes)
app.use('/password', resetPasswordRoutes);
app.use('/downloadlist', downloadlistRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(Downloadlist)
Downloadlist.belongsTo(User)

// sequelize.sync({force:true})
sequelize.sync()
.then(()=>{
   
    app.listen(3000);
})
.catch(err=>{
    console.log(err)})