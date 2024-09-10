import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: formData})
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para a API');
      }

      const data = await response.json();
      setSuccess(`Registro realizado com sucesso!`);
    } catch (err) {
      setError(err.message);
      alert(`Erro ao registrar o usuário: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Telefone (opcional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu telefone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        <Button variant="primary" style={{ marginTop: 4 }} type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
