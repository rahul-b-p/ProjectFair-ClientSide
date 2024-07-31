import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import dummyProfile from '../assets/dummyProfile.jpg'
import { serverUrl } from '../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { updateProfileApi } from '../services/allApi'



function Profile() {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    linkedin: "",
    github: "",
    profile: ""
  })

  const [existingImage, setExistingImage] = useState("")

  const [preview, setPreview] = useState("")

  const [editStatus, setEditStatus] =useState(false)

  const handleFile = (e) => {
    e.preventDefault()
    setProfileData({ ...profileData, profile: e.target.files[0] })
  }

  // console.log(profileData);

  const handleProfileUpdate = async () => {
    const { username, email, password, github, linkedin, profile } = profileData
    if (!github || !linkedin) {
      toast.info('Plaese Update before adding values')
    }
    else {
      const reqBody = new FormData()

      reqBody.append('username', username)
      reqBody.append('email', email)
      reqBody.append('password', password)
      reqBody.append('linkedin', linkedin)
      reqBody.append('github', github)
      profile ? reqBody.append('profile', profile) : reqBody.append('profile', existingImage)

      const token = sessionStorage.getItem("token")

      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await updateProfileApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success('Profile updated successfully')
          sessionStorage.setItem('existingUser', JSON.stringify(result.data))
          setEditStatus(true)
        }
        else {
          toast.error('Something went wrong')
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await updateProfileApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success('Profile updated successfully')
          sessionStorage.setItem('existingUser', JSON.stringify(result.data))
          setEditStatus(true)
        }
        else {
          toast.error('Something went wrong')
        }
      }

    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setProfileData({ ...profileData, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setExistingImage(user.profile)
    }
    setEditStatus(false)
  }, [editStatus])

  useEffect(() => {
    if (profileData.profile) {
      setPreview(URL.createObjectURL(profileData.profile))
    }
  }, [profileData.profile])

  return (
    <>
      <div className='p-4 rounded border shadow w-100' onMouseEnter={() => setOpen(true)} >
        <div className="d-flex">
          <h3 className='fw-bolder me-auto'>Profile </h3>
          <Button type='button' onClick={() => setOpen(!open)} variant='outline-dark'>
            {
              !open ?
                <FontAwesomeIcon icon={faChevronDown} />
                :
                <FontAwesomeIcon icon={faChevronUp} />
            }
          </Button>
        </div>

        <Collapse in={open} >
          <div>
            <div className='w-100 mt-3 d-flex align-items-center justif-content-center flex-column'>
              <label className='w-50' htmlFor='profile'>
                <input type="file" onChange={(e) => handleFile(e)} style={{ display: 'none' }} id='profile' />
                {
                  existingImage == "" ?
                    <img src={preview ? preview : dummyProfile} alt="no profile picture" style={{ width: '170px', height: '170px', borderRadius: '50%' }} />
                    :
                    <img src={preview ? preview : `${serverUrl}/uploads/${existingImage}`} alt="no profile picture" style={{ width: '170px', height: '170px', borderRadius: '50%' }} />
                }
              </label>
              <form className='w-100 mt-2'>
                <div className='mb-3'><input placeholder='Github' type="text" value={profileData.github} onChange={(e) => setProfileData({ ...profileData, github: e.target.value })} className='form-control  border border-1 border-dark' /></div>
                <div className='mb-3'><input placeholder='Linkedin' type="text" className='form-control border border-1 border-dark' value={profileData.linkedin} onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })} /></div>
                <div><Button variant='info' className='w-100 ' onClick={handleProfileUpdate} >Update</Button></div>
              </form>
            </div>
          </div>
        </Collapse>

      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Profile