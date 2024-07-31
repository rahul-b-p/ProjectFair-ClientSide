import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import DummyImg from '../assets/dummycard.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { serverUrl } from '../services/serverUrl';


function ProjectCard({ project }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(project);

  return (
    <>
      <Card onClick={handleShow} style={{ width: '100%' }} className='shadow'>
        <Card.Img variant="top" src={`${serverUrl}/uploads/${project.projImage}`} />
        <Card.Body>
          <Card.Title className='text-center fw-bold'>{project.title} </Card.Title>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>{project.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <img src={`${serverUrl}/uploads/${project.projImage}`} alt="no image" width={"100%"} />
            </Col>
            <Col sm={12} md={6}>
              <h4>Description</h4>
              <p>{project.overview}</p>
              <h4 className='mt-4'>Technologies</h4>
              <p>{project.language}</p>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-start'>
          <Link to={project.github} target='_blank' ><FontAwesomeIcon icon={faGithub} style={{ color: 'blue' }} size='2xl' /></Link>
          <Link to={project.website} target='_blank' ><FontAwesomeIcon icon={faLink} style={{ color: "blue" }} size='2xl' className='ms-4' /></Link>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default ProjectCard