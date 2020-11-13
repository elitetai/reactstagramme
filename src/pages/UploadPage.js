import React, {useState} from 'react';
import { Form, FormGroup, Input, FormText, Button } from 'reactstrap';
import axios from "axios"
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const history = useHistory()
  const location = useLocation()

  const handleImageUpload = (e) => {
    e.preventDefault()

    const formData = new FormData()
    // additional append: change path for either user's profile image or user's images  
    if (location.path === 'image'){
      formData.append('path', 'image')
    } else if (location.path === 'user'){
      formData.append('path', 'user')    
    }
    else{
      history.push("/")
      toast.error("Invalid route!")
    }
    formData.append('image', imageFile)
    
    axios({
        method: 'POST',
        url: 'http://localhost:5000/api/images/',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data: formData
    })
    .then(result => {
        // console.log(result)
        history.push("/profile")
        toast.success("Image uploaded successfully!")
    })
    .catch(error => {
        console.log(error.response)
    })
  }

  const handleInputChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0])
  }


    return(
    <div>
      <div className="card">
        {previewImage ? (
          <img
            src={previewImage}
            width="50%"
            height="50%"
            alt="preview"
          />
          ) : (
          <h3 className="text-center">
          </h3>
        )}
      </div>
      <Form onSubmit={handleImageUpload}>
        <FormGroup>
          <Input
            type="file"
            name="image-file"
            onChange={handleInputChange}
          />
          <FormText color="muted">
            Make sure the image being uploaded is a supported format.
          </FormText>
        </FormGroup>
        <Button type="submit" color="primary">
          Upload
        </Button>
      </Form>
    </div>
  )
}

export default UploadPage;