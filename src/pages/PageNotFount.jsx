import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'



function PageNotFount() {
  return (
    <>
        <Row>
            <Col md={3} sm={1}></Col>
            <Col md={6} sm={10}>
                <div className='d-flex justify-content-center align-items-center' style={{flexDirection:'column'}} >
                    <img src="https://www.dochipo.com/wp-content/uploads/2024/01/404-Error-Animation-4.gif" alt="no image" width={'300px'}  />
                    <h1 className='fw-bolder'>Seems You are Lost</h1>
                    <Link to={'/'}><Button className='mt-2 mb-5'><FontAwesomeIcon icon={faArrowLeft}/> Back To Home</Button></Link>
                    
                </div>
            </Col>
            <Col md={3} sm={1}></Col>
        </Row>
        
    
    </>

  )
}

export default PageNotFount