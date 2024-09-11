const API_BASE_URL = 'http://localhost:3000';
const CONTEXT_COUNTRY = 'countries';
const CONTEXT_COUNTRY_DETAILS = 'country_details';
const headersAuthorization = { 'Content-Type': 'application/json',
                               'Authorization': localStorage.getItem('authToken') }

export const getCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY}`, { headers: headersAuthorization });
  if (!response.ok) throw new Error('Erro ao buscar países');
  return response.json();
};

export const getCountryById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar país');
  return response.json();
};

export const createCountry = async (country) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY}`, {
    method: 'POST',
    headers: headersAuthorization,
    body: JSON.stringify(country),
  });
  if (!response.ok) throw new Error('Erro ao criar o país');
  return response.json();
};

export const updateCountry = async (id, country) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY}/${id}`, {
    method: 'PUT',
    headers: headersAuthorization,
    body: JSON.stringify(country),
  });
  if (!response.ok) throw new Error('Erro ao atualizar o país');
  return response.json();
};

export const deleteCountry = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY}/${id}`, {
    method: 'DELETE',
    headers: headersAuthorization
  });

  if (!response.ok) throw new Error('Erro ao deletar o país');
};

export const getCountryDetails = async () => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY_DETAILS}`, { headers: headersAuthorization });
  if (!response.ok) throw new Error('Erro ao buscar detalhes do país');
  return response.json();
};

export const getCountryDetailById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY_DETAILS}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar o detalhe do país');
  return response.json();
};

export const createCountryDetail = async (country_detail) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY_DETAILS}`, {
    method: 'POST',
    headers: headersAuthorization,
    body: JSON.stringify(country_detail),
  });
  if (!response.ok) throw new Error('Erro ao criar o detalhe do país');
  return response.json();
};

export const updateCountryDetail = async (id, country) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY_DETAILS}/${id}`, {
    method: 'PUT',
    headers: headersAuthorization,
    body: JSON.stringify(country),
  });
  if (!response.ok) throw new Error('Erro ao atualizar o detalhe do país');
  return response.json();
};

export const deleteCountryDetail = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY_DETAILS}/${id}`, {
    method: 'DELETE',
    headers: headersAuthorization
  });

  if (!response.ok) throw new Error('Erro ao deletar o detalhe do país');
};
