import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import LoginModal from './LoginModal'
 
const Navigation = (props) => {
  const {token, setToken} = props
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory()

  const toggle = () => setIsOpen(!isOpen);
  // const user = JSON.parse(localStorage.getItem('reactstagramme-user'))

  const removeJWT = () => {
    localStorage.removeItem('token')
    // localStorage.removeItem('reactstagramme-user')
    setToken(false)
    history.push('/')
  }

  return (
    <div>   
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">Reactstagramme</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {token ? 
            <>
              <NavItem>
                <NavLink tag={Link} to={`/profile`}>Profile</NavLink>
                {/* <NavLink tag={Link} to={`/profile`}>{user.username}&nbsp; 
                <img className="rounded-circle" width="35px" src={user.profileImage} alt="profile pic" />
                </NavLink> */}
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} to={`/chat`}>Group Chat</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={removeJWT}>Logout
                </NavLink>
              </NavItem>
            </>
            :
              <NavItem>
                <NavbarText>
                  <LoginModal setToken={setToken} buttonLabel='Login / Signup'/> 
                </NavbarText>
              </NavItem>
          }
          </Nav>
        </Collapse>
      </Navbar> 
    </div>
  );
}

export default Navigation;
