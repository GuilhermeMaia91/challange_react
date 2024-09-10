import React, { useEffect } from 'react';
import { Container, Row, Col, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { checkAuth, logout } from '../auth';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken')
    navigate('/');
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <h4>Menu</h4>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/countries">Países</Nav.Link>
          <NavDropdown.Divider />
          <Nav.Link href="#" onClick={handleLogout}>Sair</Nav.Link>
          {/* <Button variant="link" onClick={handleLogout}>Sair</Button> */}
        </Nav>
      </div>
      <div className="content">
        <Container>
          <Row>
            <Col>
              <h1>Bem-vindo à Página Inicial</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
