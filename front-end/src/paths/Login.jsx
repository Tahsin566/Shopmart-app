import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [loading,setloading] = useState(null)
  const [password, setpassword] = useState('')

  const data = {
    email,
    password
  }

  useEffect(() => {

    
    fetch('https://shopmart-app-backend.onrender.com/dashboard', { credentials: 'include' }).then(res => res.json()).then(data => {

      if (data.found) {
        navigate('/home')
      }

    })
  }, [])

  const handlelogin = () => {

    fetch('https://shopmart-app-backend.onrender.com/login',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data)
      }
    ).then(res => res.json()).then(data => {
      if (data.login === true) {
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }))
        navigate('/home')
      }
      window.location.reload()
    })

  }

  return (
    <>
      <div style={{ backgroundColor: 'slateblue', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', padding: '10px' }}>
        <div style={{ width: '500px', height: '350px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '10px', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <h3>Shopmart</h3>
          <h4>Login</h4>
          <div style={{ maxWidth: '400px', width: '255px' }}>
            <input type="email" style={{ width: '100%', height: '35px', borderWidth: '1px', borderColor: 'gray', borderRadius: '5px', padding: '4px' }} placeholder='Enter email' value={email} onChange={e => { setemail(e.target.value) }} />
          </div>
          <div style={{ maxWidth: '400px', width: '255px' }}>
            <input type="password" style={{ width: '100%', height: '35px', borderWidth: '1px', borderColor: 'gray', borderRadius: '5px', padding: '4px' }} placeholder='Enter password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
          </div>
          <Button onClick={handlelogin} style={{ marginTop: '10px', width: '200px' }}>Login</Button>
          <Button onClick={() => { navigate('/register') }} style={{ marginTop: '10px', width: '200px' }}>Sign up</Button>
          {loading && <div style={{textAlign:'center'}}>Loading</div>}
        </div>
      </div>
    </>
  )
}

export default Login