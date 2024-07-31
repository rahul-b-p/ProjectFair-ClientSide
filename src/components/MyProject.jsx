import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { deleteProjectApi, userProjectApi } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/DataShare'


function MyProject() {
  const [userProject, setUserProject] = useState([])
  const [deleteResponse, setDeleteResponse] = useState({})

  const {addResponse} = useContext(addResponseContext)

  const {editResponse} = useContext(editResponseContext)

  const getUserProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await userProjectApi(reqHeader)
      // console.log(result);
      if(result.status==200){
      setUserProject(result.data)
      }
      else{
        toast.error('something went wrong')
      }
    }
  }

  const handleDelete = async (id) =>{
    const result = await deleteProjectApi(id)
    // console.log(result);
    if(result.status==200){
      toast.success('Project deleted successfully')
      setDeleteResponse(result)
    }
    else{
      toast.error('Something went wrong')
    }
  }

  // console.log(userProject);

  useEffect(() => {
    getUserProjects()
  }, [addResponse,deleteResponse,editResponse])
  
  return (
    <>
      <div className='w-100 border rounded shadow p-3'>
        <div className='d-flex mb-5'>
          <h3 className='text-primary me-auto fw-bold'>My Project</h3>
          <AddProject />
        </div>
        {
          userProject?.length>0?
          userProject?.map((item)=>(
            <div className='mb-3 bg-light rounded d-flex p-3' >
          <h5 className='me-auto fw-bold'>{item.title}</h5>
          <EditProject project={item} />
          <Link to={item.website} target='_blank' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faGlobe} className='text-warning ms-3 mb-1' /></Link>
          <Link to={item.github} target='_blank' style={{textDecoration:'none'}} ><FontAwesomeIcon icon={faGithub} className='text-success ms-3 mb-1' /></Link>
          <FontAwesomeIcon icon={faTrash} className='text-danger ms-3' onClick={()=>handleDelete(item._id)} />
        </div>
          ))
          
        :
        <p className='text-danger text-center'>No projects added yet</p>
        }
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default MyProject