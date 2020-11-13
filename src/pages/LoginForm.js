import React, { useState } from 'react';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import { Button, ModalFooter } from 'reactstrap';
import axios from "axios"
import { toast } from "react-toastify"

const Login = (prop) => {
    const {setChangeForm, toggle, setToken} = prop
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const toggleForm = () => setChangeForm(toggleChange => !toggleChange)

    const handleInput = (e) => {
      if (e.target.name === "username"){
        setUsername(e.target.value)
      }
      if (e.target.name === "password"){
        setPassword(e.target.value)
      }
    }

    const handleLogin = (e) => {
      e.preventDefault()
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/sessions/login',
        data: {
          username: username,
          password: password
        }})
        .then(result => {
          toast.success(result.data.message)
          localStorage.setItem('token', result.data.auth_token)
          // localStorage.setItem('reactstagramme-user', JSON.stringify(result.data.user))
          setPassword("")
          setUsername("")
          toggle() // it must be called before setToken as it must be closed first; Else, setToken under app > navbar can't detect the modal itself. 
          setToken(true)
        })
        .catch(error => {
          setPassword("")
          setUsername("")
          toast.error(error.response.data.message)
        })    
      }

  return (
      <>
    <Form onSubmit = {handleLogin} >   
      <FormGroup>
        <Label for="username">Username</Label>
          <Input 
          type="text" 
          name="username" 
          onChange={handleInput}
          value={username} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
          <Input 
          type="password" 
          name="password" 
          onChange={handleInput}
          value={password}/>
      </FormGroup>

        <p>New Member? <span style={{cursor:"pointer", color:"blue"}} onClick={toggleForm} >Sign in here.</span></p>
      
      <ModalFooter>
          <Button color="primary" >Log in</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Form>
    </>
  );
}

export default Login;