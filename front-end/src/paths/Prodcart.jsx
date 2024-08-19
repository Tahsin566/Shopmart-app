import React, { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Cartcontext } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'




const Prodcart = () => {

  const [info, setinfo] = useState([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()
  const cart = useContext(Cartcontext)


  useEffect(() => {

    fetch('https://shopmart-app-backend.onrender.com/dashboard', { credentials: 'include' }).then(res => res.json()).then(data => {
      if (!data.found) {
        navigate('/')
      }
    })

    setTimeout(() => {
      setloading(false)
    }, 200);
  }, [])

  const handlecheckout = async () => {

    const stripe = await loadStripe('pk_test_51PgqVWHs23FbpXIBCZDnYijA33RyFGXSscHEcooiW67pAlS4UjyOfkpEA8VPfc1fEkCcY7ws5tmY3Mbs1LDNCSxw00V9wygJAK')

    const data = {
      products: cart.items
    }


    const response = await fetch('https://shopmart-app-backend.onrender.com/payment',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    )

    const session = await response?.json()

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })

  }

  const savecart = () => {

    fetch('https://shopmart-app-backend.onrender.com/add', {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart.items)
    }).then(res => res.json()).then(data => {
      if (data.update) {
        alert('cart saved')
      }
    })
  }

  // if(cart.gettotalprice() === 0){
  //   return <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',minHeight:'100vh'}}>
  //     <div>Cart empty</div>
  //     <Button onClick={()=>{navigate('/')}}>Go back</Button>
  //   </div>
  // }


  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>Loading...</div>
    </div>
  }

  // if(cart.gettotalprice() === 0){
  //   return <div style={{minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'20px'}}>
  //     <h3>Cart empty</h3>
  //     <Button onClick={() => { navigate('/home') }}>Go back</Button>
  //   </div>
  // }

  return (

    <Container fluid style={{ padding: '3px', marginBottom: '120px' }}>
      {
        cart?.items?.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '5px', minHeight: '150px', borderWidth: '1px', borderColor: 'gray', padding: '5px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <img src={item?.image} alt="" style={{ width: '230px', height: '200px', borderWidth: '1px', borderColor: 'gray' }} />
            </div>
            <div fluid style={{ width: '270px' }}>
              <h1 style={{ fontSize: '22px' }}>Product name : {item?.name}</h1>
              <p>Quantity : {item?.quantity}</p>
              <p>Per unit price : {item.cost}</p>
              <p>Total price : {item?.cost * item.quantity}</p>
            </div>
            <div style={{ gap: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <Button onClick={() => { cart.removeonefromcart(item.id) }} style={{ marginRight: '20px' }}>--</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => { cart.addonetocart(item.id) }} style={{ marginLeft: '20px' }}>+</Button>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button onClick={() => {
                  cart.deletefromcart(item.id)
                  // localStorage.setItem('cart', JSON.stringify(cart.items))
                }}>Remove from cart</Button>
              </div>
            </div>
          </div>
        ))
      }

      {cart.gettotalprice() === 0 && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>Cart empty</div>}

      <Container fluid style={{ position: 'fixed', bottom: 0, backgroundColor: 'silver', display: 'flex', justifyContent: 'space-between', padding: '8px', flexWrap: 'wrap' }}>
        <p>Total cost : {cart.gettotalprice()} BDT</p>
        <Button onClick={() => { navigate('/home') }}>Go back</Button>
        <Button onClick={() => {
          console.log(cart.items)
          // localStorage.setItem('cart', JSON.stringify(cart.items))
          fetch('https://shopmart-app-backend.onrender.com/add', {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart.items)
          }).then(res => res.json()).then(data => {
            if (data.update) {
              alert('cart saved')
            }
          })
        }}>Save the cart</Button>

        <Button onClick={async()=>{

          await savecart()
          await handlecheckout()

        }
        }>Checkout {cart.gettotalprice()} BDT</Button>
      </Container>
    </Container>

  )
}

export default Prodcart