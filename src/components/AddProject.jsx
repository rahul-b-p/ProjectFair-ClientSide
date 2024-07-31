import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import addImage from '../assets/addImage.png'
import { toast, ToastContainer } from 'react-toastify'
import { addProjectApi } from '../services/allApi'
import { addResponseContext } from '../context/DataShare'



function AddProject() {
  const [show, setShow] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projImage: ""
  })
  // console.log(projectDetails);

  const [preview, setPreview] = useState("")

  const [token,setToken] = useState("")

  const [key, setKey] =useState(0)

  const {setAddResponse} = useContext(addResponseContext)

  const handleFile = (e) => {
    // console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projImage: e.target.files[0] })
  }

  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projImage: ""
    })
    setPreview("")
    key==0?setKey(1):setKey(0)
  }

  const handleAdd = async (e) => {
    e.preventDefault()

    const { title, language, github, website, overview, projImage } = projectDetails
    if (!title || !language || !github || !website || !overview || !projImage) {
      toast.info('Please fill the form completely')
    }
    else {
      // creating an object to FormData
      const reqBody = new FormData()
      // adding projectDetails into reqBoady
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projImage", projImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await addProjectApi(reqBody, reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success('New Project Added')
          handleClose()
          setAddResponse(result.data)
        }
         else if(result.response.status==406){
          toast.warning(result.response.data)
        }
        else{
          toast.error('Something went wrong, please try after sometime')
        } 
      }
      else{
        toast.warning('Please Login')
      }
    }



  }

  const handleClose = () => {
    handleCancel()
    setShow(false);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (projectDetails.projImage) {
      setPreview(URL.createObjectURL(projectDetails.projImage));
    }
  }, [projectDetails.projImage])
  // console.log(preview);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  // console.log(token);
  return (
    <>
      <Button variant='warning' onClick={handleShow}>Add New <FontAwesomeIcon icon={faPlus} className='ms-2' /></Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="proImg" className='w-auto'>
                <input type="file" id='proImg' style={{ display: 'none' }} key={key} onChange={(e) => handleFile(e)} />
                <img src={preview ? preview : addImage} alt="add Image" width={'100%'} />
              </label>
            </Col>
            <Col sm={12} md={6}>
              <form className='p-3'>
                <div className="mb-3">
                  <input value={projectDetails.title} type="text" className="form-control" placeholder='Title' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.language} className="form-control" placeholder='Language' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.github} className="form-control" placeholder='Github' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" value={projectDetails.website} className="form-control" placeholder='website' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea placeholder='overview' value={projectDetails.overview} className="form-control" rows={'4'} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" onClick={(e) => handleAdd(e)}>
            Add 
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default AddProject