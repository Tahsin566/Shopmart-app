import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://shopmart-app-backend.onrender.com/dashboard', { credentials: 'include' }).then(res => res.json()).then(data => {
      if (!data.found) {
        navigate('/')
      }
    })
  }, [])

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
      <h2>Payment canceled</h2>
      <button onClick={
        ()=>{navigate('/home')}
      } style={{width:'180px',padding:'5px',backgroundColor:'indigo',color:'white',borderRadius:'5px'}}>Home</button>
      </div>
  )
}

export default Cancel