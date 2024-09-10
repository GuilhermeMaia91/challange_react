const API_BASE_URL = 'http://localhost:3000';
const CONTEXT_COUNTRY = 'countries';
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

export const createCountry = async (user) => {
  const response = await fetch(`${API_BASE_URL}/${CONTEXT_COUNTRY}`, {
    method: 'POST',
    headers: headersAuthorization,
    body: JSON.stringify(user),
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
