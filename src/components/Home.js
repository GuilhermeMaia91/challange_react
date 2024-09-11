import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Home.css';
import { checkAuth, logout } from '../auth';

const Layout = () => {
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
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/countries">Mundo Turismo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/countries">Países</Nav.Link>
            <Nav.Link as={Link} to="/country_details">Detalhes dos Países</Nav.Link>
            <NavDropdown.Divider />
            <Nav.Link href="#" onClick={handleLogout}>Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Container className="mt-4">
          <Outlet /> {/* Renderiza as rotas filhas */}
        </Container>
      </main>
      <footer className="text-center mt-4">
        <p>© 2024 Mundo Turismo</p>
      </footer>
    </div>
  );
};

export default Layout;