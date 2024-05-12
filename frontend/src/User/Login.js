import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import { LOGIN } from '../Redux/ActionType';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(token)

    useEffect(()=>{
        if(token){
            console.log(token)
            navigate('/home')
        }else{
            navigate('/')
        }
    },[token,navigate])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError(null)

            await fetch('http://127.0.0.1:8000/login/',{
                method : 'POST',
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                credentials : 'include',
                body : JSON.stringify({
                    email,password
                })
            }).then(async(res)=>{
                const data = await res.json();
                console.log(data)

                console.log(data.error)

                if(data.error === 'Incorrect Password'){
                    setError('Incorrect Password')
                }else if(data.error === 'Email and Password is required'){
                    setError('Email and Password is required')
                }else if(data.error === 'User is not found'){
                    setError('User is not found')
                }
                else{
                    dispatch({
                        type:LOGIN,
                        token:data,
                    })
                    //Navigate to the desired location
                    navigate('/home')
                }
            })
    }


  return (
    <div>
      <>
  <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i
                        className="fas fa-cubes fa-2x me-3"
                        style={{ color: "#ff6219" }}
                      />
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        />
                        <span className="h2 fw-bold mb-0">Welcome back 👋</span>
                      </div>
                    </div>
                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: 1 }}
                    >
                      Sign into your account
                    </h5>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-control form-control-lg"
                        style={{ width: '350px' }} 
                      />
                      <label className="form-label" htmlFor="form2Example17">
                        Email address
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control form-control-lg"
                        style={{ width: '350px' }} 
                      />
                      <label className="form-label" htmlFor="form2Example27">
                        Password
                      </label>
                    </div>
                    
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                      {error && <div className='error'>{error}</div>}
                    </div>
                    {/* <a className="small text-muted" href="#!">
                      Forgot password?
                    </a> */}
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Don't have an account?{" "}
                      <Link to="/register" style={{ color: "#393f81" }}>
                        Register Now 
                      </Link>
                    </p>
                    <a href="#!" className="small text-muted">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="bg-light text-center text-lg-start">
    <div
      className="text-center p-3"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      © 2019 - till date Copyright:
      <a className="text-dark" href="https://mdbootstrap.com/">
        desphixs.com
      </a>
    </div>
  </footer>
</>

    </div>
  )
}

export default Login
