const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const {check, validationResult} = require('express-validator');

const router = Router();


router.post('/signup',  
    [
    check('login').isLength({min: 3}).withMessage('Name must have more than 3 characters'),
    check('password').isLength({min: 6}).withMessage('Your password must be at least 6 characters')
    ], 
  async (req,res)=>{
    try{

            const errors = validationResult(req)
        
            if (!errors.isEmpty()) {
              return res.status(400).json({
                errors: errors.array(),
                notification: 'Incorrect data during registration'
              })
            }

        const {login, password} = req.body;
            
            
        const candidate = await User.findOne({login});
        
        if (candidate) {
            return res.status(400).json({ notification: 'This user has already existsт' })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User ({login, password: hashedPassword});

        await user.save();

        res.status(201);
    }
    catch(e)
    {
        res.status(500);
    }
})

router.post('/signin', async (req,res)=>{
    try{
        
        const {login, password} = req.body;
        const user = await User.findOne({login});
        if(!user){
            return res.status(400).json({notification:'User isn\'t found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({notification:'Wrong password'});
        }


        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtKey'),
            {expiresIn: '1h'}
        );

        res.json({token, userId: user.id, userName: user.login});
        
    }
    catch(e)
    {
        res.status(500);
    }
})

module.exports = router;