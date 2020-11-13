import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Button, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify';

const Signup = (prop) => {

  const { setChangeForm, toggle, setToken } = prop
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameValid, setUsernameValid] = useState(true)
  const [delay, setDelay] = useState(null)

  const toggleForm = () => setChangeForm(toggleChange => !toggleChange)
  
  const checkUsername = (newUsername) => {
    // console.count("Making API call to check username!")
    if (newUsername !== ""){
      axios.get(`https://flaskstagram.herokuapp.com/api/users/check_name?username=${newUsername}`)
      .then(result => {
        if (result.data.valid === true){
          setUsernameValid(true)
        } else {
          setUsernameValid(false)
        }
      })
    }
  }

  const handleInput = (e) => {
    if (e.target.name === "username"){
      clearTimeout(delay)
      const newUsername = e.target.value
      setUsername(newUsername)
      const newDelay = setTimeout(() => {
        checkUsername(newUsername)
      }, 500)
      setDelay(newDelay)
    } 
    if (e.target.name === "email"){
      setEmail(e.target.value)
    }
    if (e.target.name === "password"){
      setPassword(e.target.value)
    }
  }    

  const getInputProp = () => {
    if (!username.length){
      return null
    }
    if (username.length <= 5){
      return { invalid : true }
    }
    if (usernameValid){
      return { valid : true }
    } else {
      return { invalid : true }
    }
  }

  const getFormFeedback = () => {
    if (!username.length){
      return null
    }
    if (username.length <= 5){
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>
    } 
    if (usernameValid){
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>
    } else { 
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: "https://flaskstagram.herokuapp.com/api/users/signup",
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    .then(result => {
      setUsername("")
      toast.success(result.data.message)
      localStorage.setItem('token', result.data.auth_token)
      toggle()
      setToken(true)
    })
    .catch(error => {
      setPassword("")
      setUsername("")
      setEmail("")
      for (let message of error.response.data){
        toast.error(message['message'])
      }
    })
  }

  return (
    <Form onSubmit={handleSignUp}>
      <FormGroup>
        <Label for="username">Username</Label>
          <Input 
          type="text" 
          name="username" 
          onChange={handleInput}
          value={username}
          {...getInputProp()}/>
          {getFormFeedback()}
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
          <Input 
          type="email" 
          name="email" 
          onChange={handleInput}
          value={email}
          // {...getInputProp()}  // email Regex
          />
          {/* {getFormFeedback()} */}
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
          <Input 
          type="password" 
          name="password" 
          onChange={handleInput}
          value={password}
          // {...getInputProp()} // 1) <= 5 + special case 2) confirm pass
          />
          {/* {getFormFeedback()} */}
      </FormGroup>
      
        <p>Already a member? <span style={{cursor:"pointer", color:"blue"}} onClick={toggleForm} >Log in here.</span></p>

    <ModalFooter>
          <Button color="primary" type="submit" value="Sign Up" onClick={checkUsername} disabled={!usernameValid}>Sign up</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>

    </Form>
  );
}

export default Signup;