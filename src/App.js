import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import { Switch, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import LoadingIndicator from "./components/LoadingIndicator"
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage"
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'
import UploadPage from './pages/UploadPage'

function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(
    localStorage.getItem('token')
  ) 
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
    .then(result => {
      setUsers(result.data)
      setIsLoading(false)
    })
    .catch(error => {
      console.log('Error: ', error)
    })
  }, [])

  if (isLoading) {
    return <LoadingIndicator width="500px" height="500px" color="blue"/>
  }
  
  return (
    <div>
      <ToastContainer pauseOnHover={false} />
      <Navbar token={token} setToken={setToken} />

      <Switch>
        <Route exact path="/" >
          <HomePage token={token} users={users}/>
          </Route>
        <Route exact path="/profile" component={MyProfilePage}/>
        <Route path="/upload" component={UploadPage} />
        <Route path="/users/:username">
          <UserProfilePage />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
