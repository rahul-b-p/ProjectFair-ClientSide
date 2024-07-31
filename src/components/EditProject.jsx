import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { serverUrl } from '../services/serverUrl';
import { toast, ToastContainer } from 'react-toastify'
import { editProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/DataShare';




function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projImage: ""
  })
  const [preview, setPreview] = useState("")

  const [key,setKey] = useState(0)

  const {setEditResponse} = useContext(editResponseContext)

  const handleFileChange=(e)=>{
    e.preventDefault()
    setProjectDetails({...projectDetails,projImage:e.target.files[0]})
  }

  // console.log(projectDetails);

  const handleClose = () =>{
    handleCancel()
     setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleCancel= () =>{
    setProjectDetails({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projImage: ""
    })
    setPreview("")
    key==0?setKey(1):setKey(0)
  }

  const handleUpdate =async(e)=>{
    e.preventDefault()

    const { title, language, github, website, overview, projImage } = projectDetails
    if (!title || !language || !github || !website || !overview ) {
      toast.info('Please fill the form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      preview?reqBody.append("projImage", projImage):reqBody.append("projImage",project.projImage)

      const token = sessionStorage.getItem("token")

      const projectId = project._id

      if(preview){
        const reqHeader={
           "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await editProjectApi(projectId,reqBody,reqHeader)
        // console.log(result);
        if(result.status == 200){
          toast.success('Changes Updated Successfully')
          handleClose()
          setEditResponse(result.data)
        }
        else{
          toast.error('Something went wrong')
        }
      }
      else{
        const reqHeader = {"Content-Type": "application/json",
        "Authorization": `Bearer ${token}`}

        const result = await editProjectApi(projectId,reqBody,reqHeader)
        // console.log(result);
        if(result.status == 200){
          toast.success('Changes Updated Successfully')
          handleClose()
          setEditResponse(result.data)
        }
        else{
          toast.error('Something went wrong')
        }
      }

      

    }
  }

  useEffect(() => {
    if (projectDetails.projImage) {
      setPreview(URL.createObjectURL(projectDetails.projImage))
    }
  }, [projectDetails.projImage])
  return (
    <>
      <FontAwesomeIcon icon={faEdit} onClick={handleShow} className='text-primary' />

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="proImg" className='w-auto'>
                <input type="file" id='proImg' style={{ display: 'none' }} key={key} onChange={(e)=>handleFileChange(e)} />
                <img src={preview?preview:`${serverUrl}/uploads/${project.projImage}`} alt="add Image" width={'100%'} />
              </label>
            </Col>
            <Col sm={12} md={6}>
              <form className='p-3'>
                <div className="mb-3"><input type="text" className="form-control" placeholder='Title' value={projectDetails?.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} /></div>
                <div className="mb-3"><input type="text" className="form-control" placeholder='Language' value={projectDetails?.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} /></div>
                <div className="mb-3"><input type="text" className="form-control" placeholder='Github' value={projectDetails?.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} /></div>
                <div className="mb-3"><input type="text" className="form-control" placeholder='website' value={projectDetails?.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} /></div>
                <div className="mb-3"><textarea placeholder='overview' className="form-control" rows={'4'} value={projectDetails?.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} /></div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" onClick={(e)=>handleUpdate(e)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default EditProject