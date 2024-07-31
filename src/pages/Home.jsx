import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import HomeImg from '../assets/homeimage.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allprojectApi, homeProjectApi } from '../services/allApi'




function Home() {
    const [isLogin, setIsLogin] = useState()

    const [homeProject, setHomeProject] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
        getHomeProject()
    },[])

    const getHomeProject = async () => {
        const result = await homeProjectApi()
        // console.log(result.data);
        setHomeProject(result.data)
    }

    // console.log(homeProject);

    return (
        <>
            <div className='bg-success w-100 container-fluid' style={{ height: '100vh', width: '100%' }}>
                <Row style={{ margin: '0px' }} className='align-items-center p-3 p-md-5'>
                    <Col xs={12} md={6}>
                        <h1 className='text-light fw-bolder mt-md-0 mt-5' style={{ fontSize: '50px' }}>Project Fair</h1>
                        <p className='mt-4'>One stop destination for all Software development project</p>

                        {!isLogin ? <Link to={'/login'}><Button variant='warning' className='ms-xs-2'>Get Starterd<FontAwesomeIcon className='ms-2' icon={faArrowRight} /></Button></Link>
                            :
                            <Link to={'/dashboard'}><Button variant='warning' className='ms-xs-2'>Manage Project<FontAwesomeIcon className='ms-2' icon={faArrowRight} /></Button></Link>}

                    </Col>
                    <Col xs={12} md={6}>
                        <img src={HomeImg} alt="no image" className='w-100' style={{ marginTop: '100px' }} />
                    </Col>
                </Row>
            </div>

            <div className="container-fluid">
                <h1 className='mt-5 text-center fw-bold'>Explore our Projects</h1>
                <Row className='mt-5'>
                    {
                        homeProject?.length > 0 ?
                            homeProject?.map((item) => (
                                <Col md={4} className='p-4'>
                                    <ProjectCard project={item} />
                                </Col>
                            ))

                            : null
                    }

                </Row>
                <Link to={'/project'} style={{ textDecoration: "none" }}><h5 className='text-center mt-4 mb-5 text-danger'>See More Projects</h5></Link>
            </div>


        </>
    )
}

export default Home