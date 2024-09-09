// src/components/NotFound.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="text-center">
        <Col>
          <h1 className="display-1">404</h1>
          <h2>Página Não Encontrada</h2>
          <p className="lead">Desculpe, a página que você está procurando não existe.</p>
          <Button variant="primary" onClick={handleGoHome}>
            Voltar para a Página Inicial
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
