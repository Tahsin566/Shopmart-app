import { createContext, useEffect, useState } from "react";
import { products, getproductdetails } from '../db/productinfo'

export const Cartcontext = createContext()

export const Cartprovider = ({ children }) => {


    const [cart, setcart] = useState([])


    useEffect(()=>{

        fetch('http://localhost:3000/db',{credentials:'include'}).then(res=>res.json()).then(data=>{
          console.log(data)
          setcart(data.db)
        })
        
      },[])

    
    

    const addonetocart = async (id) => {

    
        let email = localStorage.getItem('user')
        email = JSON.parse(email)?.email

        const quantity = getquantity(id)
        const item = getproductdetails(id)

        if (quantity === 0) {
            setcart(cart => [...cart,
            {
                email,
                id: item.id,
                name: item.name,
                quantity: 1,
                image: item.image,
                cost: item.price

            }
            ])

            // console.log(item)

        }
        else {
            setcart(cart =>
                cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : { ...item })
            )  
              
        }
    }


    const removeonefromcart = (id) => {

        const quantity = getquantity(id)

        if (quantity === 1) {
            deletefromcart(id)
        }
        else {
            setcart(cart =>
                cart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : { ...item })
            )
        }

    }


    const deletefromcart = (id) => {

        const user = cart.filter((item) => item.id != id)
        setcart(user)

    }


    const gettotalprice = () => {

        let total = 0

        cart.map((item) => {
            const prod = getproductdetails(item.id)
            total += prod.price * item.quantity
        })
        return total


    }

    const getquantity = (id) => {

        const quantity = cart.find(item => item.id === id)?.quantity

        if (!quantity) {
            return 0
        }
        else {
            return quantity
        }
    }

    const utils = {
        items: cart,
        addonetocart,
        removeonefromcart,
        deletefromcart,
        gettotalprice,
        getquantity
    }

    return (
        <Cartcontext.Provider value={utils}>
            {children}
        </Cartcontext.Provider>
    )
}

