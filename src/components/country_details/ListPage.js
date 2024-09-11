import React, { useState, useEffect } from 'react';
import { Container,
         Table,
         Button,
         Alert,
         Modal,
         Form,
         Col,
         Row,
         Figure,
         FormControl
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  deleteCountryDetail,
  createCountryDetail,
  updateCountryDetail,
  getCountryDetails,
  getCountries
} from "../../services/api";

const ListPage = () => {
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [filteredCountryDetails, setFilteredCountryDetails] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedCountryDetail, setSelectedCountryDetail] = useState(null);
  const [formData, setFormData] = useState({ observation: '', picture: '' });
  const [filter, setFilter] = useState({ name: '', observation: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchCountryDetails();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [countryDetails, filter]);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response.data);
    } catch (err) {
      setError('Erro ao carregar detalhes dos países');
    }
  };

  const fetchCountryDetails = async () => {
    try {
      const response = await getCountryDetails();
      setCountryDetails(response.data);
    } catch (err) {
      setError('Erro ao carregar detalhes dos países');
    }
  };

  const applyFilters = () => {
    const filtered = countryDetails.filter(country_detail =>
      country_detail.country.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      country_detail.observation.toLowerCase().includes(filter.observation.toLowerCase())
    );
    setFilteredCountryDetails(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja deletar o detalhe do país?')) {
      try {
        await deleteCountryDetail(id);
        fetchCountryDetails();
      } catch (err) {
        setError('Erro ao deletar o detalhe do país');
      }
    }
  };

  const handleEdit = (country_detail) => {
    setFormData({ observation: country_detail.observation, picture: country_detail.picture });
    setSelectedCountryDetail(country_detail);
    setSelectedCountry(country_detail.country.id);
    setModalType('edit');
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({ observation: '', picture: '' });
    setSelectedCountryDetail(null);
    setModalType('create');
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.value)
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'create') {
        formData.country_id = selectedCountry;
        await createCountryDetail(formData);
      } else {
        await updateCountryDetail(selectedCountryDetail.id, formData);
      }
      setShowModal(false);
      fetchCountryDetails();
    } catch (err) {
      setError('Erro ao salvar o detalhe do país');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Container className="mt-5">
      <h2>Lista do Detalhe dos Países</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Row>
          <Col>
            <FormControl
              placeholder="Filtrar por nome do país, ex: Brasil"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
            />
          </Col>
          <Col>
            <FormControl
              placeholder="Filtrar por observação"
              name="observation"
              value={filter.observation}
              onChange={handleFilterChange}
            />
          </Col>
        </Row>
      </Form>

      <Button variant="primary" onClick={handleCreate} className="mb-3">
        Criar Detalhes
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>País</th>
            <th>Observação</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountryDetails.map((country_detail) => (
            <tr key={country_detail.id}>
              <td>{country_detail.id}</td>
              <td>{country_detail.country.name}</td>
              <td>{country_detail.observation}</td>
              <td>
              <Figure>
                <Figure.Image
                  width={80}
                  height={80}
                  alt="80x80"
                  src={country_detail.picture}
                />
              </Figure>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(country_detail)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(country_detail.id)}>
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
          <Modal.Title>{modalType === 'create' ? 'Criar Detalhe do País' : 'Editar Detalhe do País'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            { (modalType == 'create') ? (
                <Form.Group controlId="formCountry">
                  <Form.Label>Escolha o País</Form.Label>
                  <Form.Select aria-label="Selecione o País" required value={selectedCountry} onChange={handleSelectCountry}>
                    <option></option>
                    {countries.map((country) => (
                      <option value={country.id}>{country.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : ('')
            }
            <Form.Group controlId="formObservation">
              <Form.Label>Observação</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a observação do País"
                name="observation"
                value={formData.observation}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPicture" className="mt-3">
              <Form.Label>Imagem (opcional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o endereço da foto do país, ex: https//googlefotos.com.br"
                name="picture"
                value={formData.picture}
                onChange={handleFormChange}
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