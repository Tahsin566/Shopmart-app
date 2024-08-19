
import express from 'express';
import cors from 'cors'
import { User } from '../models/User.js';
import { connect, pool } from '../database/db.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { Products } from '../models/Product.js';
import Stripe from 'stripe'


const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


app.use(cors(
    {
        origin: true,
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser())

let arr = ['Tahsin', 'Tuhin', 'Badar', 'Dip', 'Apu', 'Najibur']




app.get('/', async (req, res) => {

    // res.send('Hello Express!');
    // const Pool = await pool.query('SELECT * FROM users')
    // console.log(Pool)

    // User.find().then(user => console.log(user))
    // res.json(Pool.rows)

    res.json(arr)

});

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body


    if (!(name && email && password)) {
        return res.json({ compulsory_fields: false })
    }



    const user = await User.findOne({ email: email })


    if (user) {
        return res.json({ found: true })
    }

    const hashpass = await bcryptjs.hash(password, 10)
    console.log(hashpass)

    const client = await User.create({

        name,
        email,
        password: hashpass

    })
    await client.save()

    res.json({ success: true })

})


app.post('/login', async (req, res) => {

    const { email, password } = req.body

    if (!(email && password)) {
        return res.json({ compulsory_fields: false })
    }

    const user = await User.findOne({ email })


    if (user && await bcryptjs.compare(password, user.password)) {

        const token = await jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET)

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true }).json({

            login:true,
            email:user.email,
            name:user.name
        })
    }
    else {
        res.json({ login: false })
    }

})



app.get('/dashboard', async (req, res) => {

    const { token } = req.cookies

    
    if (!token) {
        return res.json({ found: false })
    }

    try {

        const tokenc = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        res.json({ found: true })

    } catch (error) {
        res.json({ error: true })
    }


})

app.get('/db',async(req,res)=>{

    const {token} = req.cookies
    
    if(!token){
        return res.json({db:[]})
    }

    let email = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    email = email.email
    

    const data = await Products.find({email:email}).sort()


    res.json({db:data})
    
})

app.get('/remove',async(req,res)=>{

    const {token} = req.cookies


    let mail = "hello"
    
    if(!token){
        mail = req.headers['authorization']?.split(' ')[1]
        await Products.deleteMany({email:mail})
        return res.json({found:false})
    }

    let email = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    email = email.email

    await Products.deleteMany({email:email})

    res.json({deleted:true})
    

})

app.post('/payment',async(req,res)=>{

    const {products} = req.body

    const lineitems = products.map((product)=>({
        price_data:{
            currency:"bdt",

            product_data : {
                name:product.name
            },
            unit_amount:product.cost * 100
        },
        quantity:product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineitems,
        mode:"payment",
        success_url:"http://localhost:5173/home",
        cancel_url:"http://localhost:5173/home"
    })

    console.log('products',products)
    res.json({id:session.id})

})


app.get('/logout', (req, res) => {

    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ logout: true })

})


app.post('/add', async (req, res) => {

    const arr = req.body

    const {token} = req.cookies

    let email = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    email = email.email

    if(arr.length === 0){
        const del = await Products.deleteMany({email})
        
        return res.json({empty:true})
    }

    const user = await Products.findOne({email})

    if(user){
        const prod = await Products.deleteMany({email})

        await Products.create(arr)

        return res.json({update:true})
        
    }
    else{
        await Products.create(arr)
        return res.json({entered:true})
    }
    
})

app.get('/del',(req,res)=>{

    Products.deleteMany({}).then(res=>console.log(res)
    )

    res.json({deleted:true})
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});