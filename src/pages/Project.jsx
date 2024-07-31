import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allprojectApi } from '../services/allApi'
import { toast } from 'react-toastify'



function Project() {
  const [istoken, setToken] = useState("")
  const [allProjects, setAllProjects] = useState([])
  const [searchKey, setSearchKey] = useState("")


  const getAllpeoject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await allprojectApi(searchKey, reqHeader)
    
      // console.log(result.data);
      if(result.status==200){
      setAllProjects(result.data)
      }
      else{
        toast.error('Something Went wrong')
      }
    }
  }

  console.log(searchKey);

  // console.log(allProjects);

  // console.log(searchKey);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  useEffect(() => {
    getAllpeoject()
  },[searchKey])
  return (
    <>
      <Header />

      <h2 className='mt-5 text-center fw-bold'>All Projects</h2>

      {
        istoken ?
          <div>

            <Row className='w-100'>
              <Col md={4}></Col>
              <Col md={4}>
                <div className='d-flex mt-4 mb-5 px-md-0 px-4'>
                  <input
                    type="text"
                    placeholder='Search by Technlogy'
                    className='form-control'
                    onChange={(e)=>setSearchKey(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginTop: '12px', marginLeft: '-30px' }} flip='horizontal' />
                </div>
              </Col>
              <Col md={4}></Col>
            </Row>

            {
              allProjects?.length > 0 ?
                <Container className='mt-5 w-100'>
                  <Row>
                    {allProjects?.map(item=>(
                      <Col md={4} className='mb-4'><ProjectCard project={item}/></Col>
                    ))}

                  </Row>
                </Container>
                :
                <p className='text-center mt-5 text-danger'>No Project to display</p>
            }
          </div>
          :
          <div style={{ width: '100%', height: '80vh' }}>
            <Row>
              <Col md={2} xs={1}></Col>
              <Col md={8} xs={10} className='d-flex flex-column align-items-center justify-content-center'>
                <img src="https://cdn-icons-gif.flaticon.com/8717/8717908.gif" alt="no image" width={'80%'} height={'400px'} />
                <h4 className='text-center fw-bold'>Please <Link className='text-primary' to={'/login'} style={{ textDecoration: 'none' }}>Login</Link> to visit mor projects</h4>
              </Col>
              <Col md={2} xs={1}></Col>
            </Row>

          </div>
      }




    </>
  )
}

export default Project