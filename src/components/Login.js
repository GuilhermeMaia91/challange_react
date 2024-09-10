import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { login } from '../auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true);
    setError(null);
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        user: {
          email,
          password
        }
      });

      if (response.data.status.code == 200) {
        login();
        setSuccess('Login bem-sucedido!');
        setError('');
        localStorage.setItem('authToken', response.headers.getAuthorization());
        navigate('/home')
      } else {
        setError('Credenciais inválidas.');
        setSuccess('');
      }
    } catch (error) {
      setError('Erro ao tentar login.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {loading ? 'Entrando...' : 'Login'}
          </Button>
        </Form>
        <div className="mt-3">
          <Link to="/register">Não tem uma conta? Registre-se</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
