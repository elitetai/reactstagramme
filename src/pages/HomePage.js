import React from 'react';
import {CardBody, CardImg, CardTitle, Button, Container, Row, Col } from "reactstrap"
import { Link } from 'react-router-dom';
import UserImages from '../containers/UserImages'

function HomePage(props) {

  const {users, token} = props

  return (
    <>
      <Container fluid={true} className="p-0 m-0">
        {token ? 
        <>
          {users.map(user => (
              <Row key={user.id} className="bg-light p-4 mx-0 my-5 rounded">
                <Col sm="2" className="mt-3">
                  <CardImg top width="100%" src={user.profileImage} alt="profile image" className="rounded-circle img-thumbnail img-fluid"/>
                  <CardBody className="text-center">
                    <CardTitle>{user.username}</CardTitle>
                    <Link to={`/users/${user.username}`}>
                      <Button color="primary" >See more</Button>
                    </Link>
                  </CardBody>
                </Col>
                <Col sm="10">
                  <UserImages userId={user.id}/>
                </Col>
              </Row>
          ))}
        </>
        : 
        <p className="text-center m-4">Please sign in to see the contents</p>
      }
      </Container>
    </>
  );
}

export default HomePage;
