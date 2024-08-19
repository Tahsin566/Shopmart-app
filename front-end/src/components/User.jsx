import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import React,{useContext, useEffect, useState} from 'react'
import { ThemeContext } from '../context/Global'
import { Authcontext } from '../context/Auth'
import { Button, Col, Container, Modal,Row } from 'react-bootstrap'
import { Cartcontext } from '../context/cart'

const User = () => {

  // const [{isdark,setisdark},{toggletheme,themes}] = useContext(ThemeContext)
  // const [{auth,setauth},toggleauth] = useContext(Authcontext)

  const cart = useContext(Cartcontext)
  cart.gettotalprice()

  const url = cart.items[0]?.image
  console.log(url)


  return (
    <>
    <Container style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'10px'}}>
      <h1>{JSON.stringify(cart.items,null,50000)}</h1>
      <Button onClick={()=>{cart.addonetocart(1)}}>Add item 1 to cart</Button>
      <Button onClick={()=>{cart.addonetocart(2)}}>Add item 2 to cart</Button>
      <Button onClick={()=>{cart.addonetocart(3)}}>Add item 3 to cart</Button>
      <Button onClick={()=>{cart.addonetocart(4)}}>Add item 4 to cart</Button>
      <Button onClick={()=>{cart.addonetocart(5)}}>Add item 5 to cart</Button>
      <Button onClick={()=>{cart.deletefromcart(3)}}>Remove item 3 from cart</Button>
      <Button onClick={()=>{cart.removeonefromcart(3)}}>Remove/decrease item 3 from cart</Button>

      <Container style={{display:'flex'}}>
      {
        cart?.items?.map((item,index)=>(
          
          <img key={index} src={item.image} alt="" style={{height:'300px',width:'300px'}}/>
          
          ))
        }
      </Container>
    </Container>
    </>
  )
}

export default User