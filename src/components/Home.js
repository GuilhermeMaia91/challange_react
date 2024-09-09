import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="d-flex">
      <div className="sidebar">
        <h4>Menu Lateral</h4>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </div>
      <div className="content">
        <Container>
          <Row>
            <Col>
              <h1>Bem-vindo à Página Inicial</h1>
              <p>Este é o conteúdo principal da sua aplicação.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
