import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ListPageCountries from './components/countries/ListPage';
import ListPageCountryDetail from './components/country_details/ListPage';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas de Login e Registro fora do Layout */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Rotas protegidas */}
        <Route element={<Home />}>
          <Route path="/countries" element={<ProtectedRoute element={<ListPageCountries />} />} />
          <Route path="/country_details" element={<ProtectedRoute element={<ListPageCountryDetail />} />} />
          {/* Adicione mais rotas aqui */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;