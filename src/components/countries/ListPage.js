import React, { useState, useEffect } from 'react';
import { Container,
         Table,
         Button,
         Alert,
         Modal,
         Form,
         Col,
         Row,
         InputGroup,
         FormControl
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  createCountry,
  getCountries,
  deleteCountry,
  updateCountry
} from "../../services/api";

const ListPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({ name: '', name_short: '' });
  const [filter, setFilter] = useState({ name: '', name_short: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [countries, filter]);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response.data);
    } catch (err) {
      setError('Erro ao carregar países');
    }
  };

  const applyFilters = () => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      country.name_short.toLowerCase().includes(filter.name_short.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja deletar este país?')) {
      try {
        await deleteCountry(id);
        fetchCountries();
      } catch (err) {
        setError('Erro ao deletar o país');
      }
    }
  };

  const handleEdit = (country) => {
    setFormData({ name: country.name, name_short: country.name_short });
    setSelectedCountry(country);
    setModalType('edit');
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({ name: '', nameShort: '' });
    setSelectedCountry(null);
    setModalType('create');
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create') {
        await createCountry(formData);
      } else {
        await updateCountry(selectedCountry.id, formData);
      }
      setShowModal(false);
      fetchCountries();
    } catch (err) {
      setError('Erro ao salvar o país');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Container className="mt-5">
      <h2>Lista de Países</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Row>
          <Col>
            <FormControl
              placeholder="Filtrar por nome"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
            />
          </Col>
          <Col>
            <FormControl
              placeholder="Filtrar por abreviação"
              name="name_short"
              value={filter.name_short}
              onChange={handleFilterChange}
            />
          </Col>
        </Row>
      </Form>

      <Button variant="primary" onClick={handleCreate} className="mb-3">
        Criar País
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Abreviação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>{country.name_short}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(country)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(country.id)}>
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Criar/Editar Usuário */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'create' ? 'Criar País' : 'Editar País'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do País"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNameShort" className="mt-3">
              <Form.Label>Abreviação</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a abreviação do país"
                name="name_short"
                value={formData.name_short}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {modalType === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ListPage;