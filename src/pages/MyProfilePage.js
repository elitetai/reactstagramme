import React, { useState, useEffect} from 'react'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import { toast } from 'react-toastify'
import UserImages from "../containers/UserImages"
import { Container, Button } from "reactstrap"
import { useHistory } from "react-router-dom"

const MyProfilePage = () => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    
    useEffect(() => {
        document.title="My Profile"
        axios('http://localhost:5000/api/users/me',
        {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
        .then(result => {
            console.log(result)
            setUser(result.data)
            setIsLoading(false)
        })
        .catch(error => {
            toast.error(error.response.data)
            console.log(error.response.data)
        })
    }, [])

    if (isLoading){
        return <LoadingIndicator width="300px" height="300px" color="blue"/>
    }

    return (
        <Container>
        {
          user ?
          <div className="text-center m-3">
            <img src={user.profile_picture} alt={user.username} width="150" className="rounded-circle img-thumbnail img-fluid" />
            <h3>@ {user.username}</h3>
            <Button color="primary" onClick={()=>{history.push({
            pathname: "/upload",
            path: 'user'
            })}}>Update Profile Image</Button>
          </div>
          : null
        }
        <Button onClick={()=>{history.push({
            pathname: "/upload",
            path: 'image'
            })}}>Upload image!</Button>
        <UserImages userId={user.id}/>
      </Container>
    )
}

export default MyProfilePage