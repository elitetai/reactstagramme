import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import { useLocation } from "react-router-dom"
import Likes from './Likes';

const UserImages = (props) => {
    const {userId} = props
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        // let mounted = true
        axios.get(`http://localhost:5000/api/images/images?userId=${userId}`) 
        .then(response => {
            // if (mounted){
            setImages(response.data)           
            setIsLoading(false)
            // }
        })
        .catch(error => {
            console.log('Error: ', error.response)
        })
        // return function cleanup() {
            // mounted = false
        // }
    }, [userId])

    if (isLoading){
        return <LoadingIndicator width="300px" height="300px" color="green"/>
    }

    return (
        <div className="d-flex flex-wrap">
        {
          images.map((image)=>{
            if (location.pathname === "/"){
              return (
                <div className='col-12 col-sm-6 col-md-4 p-3 p-sm-0' key={`images.${image.id}`} >
                  <img src={image.url} alt="user images" style={{objectFit:'cover'}} width="100%" height="250" className='p-1 mx-auto'/>
                </div>
              )
            }  else {
              return (
                <div className='card col-12 col-sm-6 col-md-4 p-3 p-sm-0' key={`images.${image.id}`} >
                  <img src={image.url} alt="user images" style={{objectFit:'cover'}} width="100%" height="250" className='p-1 mx-auto'/>
                  <Likes imageId={image.id} />
                  {/* <Comments imageId={image.id} /> */}
                </div>
              )
            }          
          })
        }        
      </div>
    )
}

export default UserImages