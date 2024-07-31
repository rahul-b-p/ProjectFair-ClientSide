import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const [user,setUser] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUser(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  // console.log(user);
  return (
    <>
      <Header dashboard/>
      <div className='my-5 container-fluid'>
        <Row>
          <Col md={8} sm={12} className='px-md-4'>
            <h2 className='fw-bold text-center mb-5'> Welcome <span className='text-primary'>{user}</span> !</h2>

            <MyProject/>
          </Col>
          <Col md={4} sm={12} className='px-md-4'>
            <div className='d-flex justify-content-center align-items-center mt-5 p-2'><Profile/></div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard