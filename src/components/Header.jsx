import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header({dashboard}) {
  return (
    <>
      <Navbar className="bg-success">
        <Container>
          <Link style={{textDecoration:'none'}} to={'/'}>
            <Navbar.Brand className='text-light fw-bold fs-3'>
              <FontAwesomeIcon icon={faStackOverflow} className='me-3 fa-2x' />
              Project Fair
            </Navbar.Brand>
          </Link>
          {dashboard && <Navbar.Brand>
            <Link to={'/'}><Button variant='warning'>Logout</Button></Link>
          </Navbar.Brand>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header