import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import LoginImg from '../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { loginApi, registerApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'



function Auth({ register }) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  //register
  const handleRegister = async () => {
    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await registerApi(userDetails)
      if (result.status == 200) {
        toast.success('registered successfully')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else{
        toast.error('something went wrong, please try after sometimes')
      }

      // console.log(result);
    }
  }

  // login
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('please fill the feilds compleatly')
    }
    else {
      const result = await loginApi({ email, password })
      // console.log(result);
      if (result.status == 200) {
        toast.success('login successfull')
        sessionStorage.setItem('existingUser',JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token',result.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
        
      }
      else {
        toast.error(result.response.data)
      }

    }
  }



  // console.log(userDetails);

  return (
    <>
      <div style={{ width: '100%', }} className='d-flex justify-content-center align-items-center container-fluid flex-column mb-4'>
        <Link to={'/'} style={{ textDecoration: 'none' }} className='text-primary fw-bold mb-4'><FontAwesomeIcon icon={faArrowLeft} className='me-2 mt-3' />Back to Home</Link>
        <div className="bg-success container rounded">
          <Row>
            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center p-5'>
              <img src={LoginImg} alt="no image" width={'100%'} />
            </Col>
            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column text-light'>
              <h3 className='fw-bold text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2 fa-2x' />Project Fair</h3>
              {register ? <h4>Sign Up to your account</h4> :
                <h4>Sign In to your account</h4>}

              <form className='mt-4 w-75'>
                {register && <div className='mb-3'>
                  <input type="text" placeholder='Username' value={userDetails.username} className='form-control' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                </div>}
                <div className='mb-3'>
                  <input type="text" placeholder='Email' value={userDetails.email} className='form-control' onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                </div>
                <div className='mb-3'>
                  <input type="text" placeholder='Password' value={userDetails.password} className='form-control' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                </div>
                <div className="mb-3">

                  {register ? <div>
                    <Button className='w-100' variant='warning' onClick={handleRegister}>Register</Button>
                    <p>Already a User? Click here to <Link to={'/login'} className='text-danger fw-bold' >Login</Link></p>
                  </div>
                    :
                    <div>
                      <Button className='w-100' variant='warning' onClick={handleLogin}>Login</Button>
                      <p>new User? Click here to <Link to={'/register'} className='text-danger fw-bold' >Register</Link></p>
                    </div>}

                </div>

              </form>
            </Col>
          </Row>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Auth