const User = require('../models/users');

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const signup = async (req, res) => {
    try 
    {
        const{name, email, password} = req.body;
        console.log(name)

        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password))
        {
            return res.status(400).json({err: "Bad parameters. Something is missing"});
        }

        await User.create({name, email, password});
        res.status(201).json({message: 'Successfully created new user'});
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    try 
    {
        const {email, password} = req.body;
        
        if(isstringinvalid(email) || isstringinvalid(password))
        {
            return res.status(400).json({message: 'Email id or password is missing', success: false});
        }

        const user = await User.findAll({ where : { email }})
        // console.log(user[0])
        
        if(user.length > 0)
        {
            if(user[0].password === password)
            {
                res.status(200).json({success: true, message: "User logged in successfully"})
            }
            else
            {
                return  res.status(400).json({message: 'Password is incorrect', success: false});
            }
        }
        else
        {
            return  res.status(404).json({message: 'User does not exist', success: false});
        }

    } 
    catch (err) 
    {
        res.status(500).json({message: err, success: false});
    }
}

module.exports = {
    signup,
    login
}

