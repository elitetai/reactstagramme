import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Login from '../pages/LoginForm';
import Signup from '../pages/SignUpForm';

const LoginModal = (props) => {
  const { buttonLabel, setToken } = props;
  const [modal, setModal] = useState(false);
  const [changeForm, setChangeForm] = useState(true)

  const toggle = () => setModal(!modal);

  return ( 
    <div>
      <Button color="white" onClick={toggle} style={{cursor:'pointer',margin:0}}>{buttonLabel}</Button>
      <Modal toggle={toggle} isOpen={modal} >
        <ModalHeader >{changeForm? "Login" : "Sign Up"}</ModalHeader>
        <ModalBody>
         {changeForm? 
         <Login setToken={setToken} toggle={toggle} setChangeForm={setChangeForm} />
         : 
         <Signup setToken={setToken} toggle={toggle} setChangeForm={setChangeForm}/>}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;