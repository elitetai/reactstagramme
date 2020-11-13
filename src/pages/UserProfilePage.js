import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Container } from "reactstrap"
import axios from 'axios'
import LoadingIndicator from "./../components/LoadingIndicator"
import UserImages from './../containers/UserImages'

const UserProfilePage = () => {

  let {username} = useParams()
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios(`http://localhost:5000/api/users/${username}`,
    {
      headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('token')
      }
    })
    .then(result => {
        setUser(result.data)
        setIsLoading(false)
    })
    .catch(error =>{
      console.log('Error: ', error.response.data)
    })
  }, [username])

  if (isLoading){
    return <LoadingIndicator width="300px" height="300px" color="purple"/>
  }

  return (
    <Container>
    {
      user ?
      <div className="text-center m-3">
        <img src={user.profileImage} alt={user.username} width="150" className="rounded-circle img-thumbnail img-fluid" />
        <h3>@ {user.username}</h3>
      </div>
      : null
    }
    <UserImages userId={user.id} />
  </Container>
  )
}

export default UserProfilePage