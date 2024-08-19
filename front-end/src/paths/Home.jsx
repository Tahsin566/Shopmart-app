
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { products } from '../db/productinfo'
import { Button, Container } from 'react-bootstrap'
import { Cartcontext } from '../context/cart'

const Home = () => {

  const [visible, setvisible] = useState(false)

  const [msg, setmsg] = useState(null)
  const [info, setinfo] = useState(null)

  const cart = useContext(Cartcontext)

  useEffect(() => {

    fetch('https://shopmart-app-backend.onrender.com/dashboard', { credentials: 'include' }).then(res => res.json()).then(data => {
      if (!data.found) {
        navigate('/')
      }

    })

    const user = localStorage.getItem('user')
    setinfo(JSON.parse(user))
  }, [])

  const delcart = () =>{
    fetch('https://shopmart-app-backend.onrender.com/remove',{credentials:'include'}).then(res=>res.json()).then(data=>{
      console.log(data)
    })
  }

  const totalq = cart.items?.reduce((sum, product) => sum + product.quantity, 0)

  let list = []

  const navigate = useNavigate()

  return (
    <>
      <Container style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: 'slategray', alignItems: 'center', color: 'white', boxSizing: 'border-box', position: 'sticky', top: 0 }} fluid>
        <div style={{ fontWeight: 'bold' }}>Shopmart</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
          <div>Home</div>
          <Button onClick={() => {
            fetch('https://shopmart-app-backend.onrender.com/add', {
              method: "POST",
              credentials: 'include',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(cart.items)
            })
            navigate('/cart')
          }} >Cart ({totalq}) </Button>

          <div style={{ borderWidth: '1px', borderColor: 'white', borderRadius: '50px' }}>
            <div onClick={() => { setvisible(true) }} style={{ color: 'white', textDecoration: 'none', fontSize: '10px' }}><svg style={{ width: '30px', margin: 'auto', position: 'relative' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="#fff" stroke='#fff' d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z" /></svg> </div>
          </div>
        </div>

        {visible && <div style={{ position: 'absolute', right: 0, top: '53px', backgroundColor: 'white', color: 'black', height: '150px', borderRadius: '5px', width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <div style={{ borderWidth: '1px', borderColor: 'black', borderRadius: '50px' }}><svg style={{ width: '30px', margin: 'auto', position: 'relative' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" xml:space="preserve"><path fill="#000" stroke='#000' d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z" /></svg></div>
          <div>{info?.name}</div>
          <div>{info?.email}</div>
          <div>
            <Button style={{ marginRight: '10px' }} onClick={() => { setvisible(false) }}>Close</Button>
            <Button onClick={async() => {
              setvisible(false)
              await delcart()
              await localStorage.removeItem('user')
              fetch('https://shopmart-app-backend.onrender.com/logout', { credentials: 'include' }).then(res => res.json()).then(data => {
                if(data.logout){
                  
                  navigate('/')

                }
              
              })

            }}>Sign out</Button>
          </div>
        </div>}

      </Container>
      <Container style={{ minHeight: '300px', backgroundColor: 'slategrey', marginTop: '5px', marginBottom: '5px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', flexWrap: 'wrap' }} fluid>
        <div style={{ width: '400px' }}>
          <h3>Your best shopping companion</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia explicabo, nihil fugit provident, deleniti voluptatem quaerat fugiat quod reiciendis ipsa maxime suscipit modi!</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img style={{ width: '300px', height: '280px', objectFit: 'cover', borderRadius: '10px', backgroundColor: 'teal' }} src="https://img.freepik.com/premium-photo/shoe-that-has-orange-gray-it_1313274-7113.jpg?w=740" alt="" />
        </div>
      </Container>
      <Container style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
        {/* <Button onClick={()=>{navigate('/details')}} >Items in cart ({totalq}) </Button> */}
        <h1 style={{ textAlign: 'center', fontSize: '30px' }}>----------------Our collections-----------------</h1>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', boxSizing: 'border-box', padding: '20px', flexWrap: 'wrap' }}>
        {
          products.map((prod, index) => (
            <div key={index} style={{ borderWidth: '1px', borderColor: 'gray', padding: '10px', borderRadius: '5px', minHeight: '380px' }}>
              <img src={prod.image} alt="" style={{ width: '220px', height: '200px', objectFit: 'cover', objectPosition: 'center -30px' }} />
              <h1 style={{ fontSize: '22px' }}>{prod.name}</h1>
              <p>Price : {prod.price} BDT</p>
              <Button onClick={() => {
                cart.addonetocart(prod.id)
                setmsg(prod.id)
                setTimeout(() => {
                  setmsg('')
                }, 200);
              }}>Add to cart</Button>
              {msg === prod.id && <div>Item added to cart</div>}
            </div>
          ))
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around',alignItems:'center',flexWrap:'wrap',gap:'20px',backgroundColor:'slategray',paddingTop:'10px',color:'white' }}>
        <h4>Shopmart</h4>
        <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
          <h3 style={{ fontSize: '20px', textAlign: 'center' }}>Contact</h3>
          <p style={{ textAlign: 'center' }}>nazmul544@gmail.com</p>
          <p style={{ textAlign: 'center' }}>www.facebook.com/nazmul544@.com</p>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',gap:'10px',backgroundColor:'slategray'}}>

          <a href="https://www.facebook.com">

          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" fill='#fff'>
            <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
          </svg>
          </a>

          <a href="https://www.google.com">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" fill='#fff'>
            <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
          </svg>
          </a>

          <a href="https://www.x.com">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" fill='#fff' stroke='#fff'>
            <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
          </svg>
          </a>

        </div>
      </div>
    </>
  )
}

export default Home