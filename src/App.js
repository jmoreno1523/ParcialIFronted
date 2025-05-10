import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auditorios from './Auditorios';
import AuditorioDetalle from './AuditorioDetalle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auditorios />} />
        <Route path="/auditorio/:id" element={<AuditorioDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
