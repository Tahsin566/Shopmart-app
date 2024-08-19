import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const data = {
    name,
    email,
    password
  }

  const handlereg = ()=>{
    
    fetch('https://shopmart-app-backend.onrender.com/register',
    {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:'include',
      body:JSON.stringify(data)
    }
    ).then(res=>res.json()).then(data=>{
      if(data.success){
        navigate('/')
      }
      else if(data.found){
        alert('User exists')
      }
      console.log(data)
    })
  }

  return (
    <>
    <div style={{backgroundColor:'slateblue',minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',boxSizing:'border-box',padding:'10px'}}>
        <div style={{width:'500px',height:'350px',backgroundColor:'rgba(255,255,255,0.8)',borderRadius:'10px',padding:'8px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'10px'}}>
          <h3>Shopmart</h3>
          <h4>Sign up</h4>
          <div style={{maxWidth:'400px',width:'255px'}}>
            <input type="text" style={{width:'100%',height:'35px',borderWidth:'1px',borderColor:'gray',borderRadius:'5px',padding:'4px'}} placeholder='Enter name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
          </div>
          <div style={{maxWidth:'400px',width:'255px'}}>
            <input type="email" style={{width:'100%',height:'35px',borderWidth:'1px',borderColor:'gray',borderRadius:'5px',padding:'4px'}} placeholder='Enter email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
          </div>
          <div style={{maxWidth:'400px',width:'255px'}}>
            <input type="password" style={{width:'100%',height:'35px',borderWidth:'1px',borderColor:'gray',borderRadius:'5px',padding:'4px'}} placeholder='Enter password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          </div>
          <Button onClick={handlereg} style={{marginTop:'10px',width:'200px'}}>Sign up</Button>
          <Button onClick={()=>{navigate('/')}} style={{marginTop:'10px',width:'200px'}}>Log in</Button>
        </div>
      </div>
    </>
  )
}

export default Register