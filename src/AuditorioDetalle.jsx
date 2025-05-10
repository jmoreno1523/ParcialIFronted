import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const AuditorioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auditorio, setAuditorio] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auditorios')
      .then(res => {
        const encontrado = res.data.find(a => a._id === id);
        setAuditorio(encontrado);
      })
      .catch(err => console.error("Error al cargar el auditorio", err));
  }, [id]);

  if (!auditorio) return <p className="container">Cargando auditorio...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-btn">← Volver</button>
      <h2 className="title">{auditorio.nombre}</h2>

      <div className="grid">
        <div className="image-box">
          <img src={auditorio.imagenUrl} alt={`Imagen de ${auditorio.nombre}`} />
        </div>

        <div className="details">
          {Object.entries(auditorio).map(([key, value]) => {
            if (['_id', '__v', 'imagenUrl', 'nombre'].includes(key)) return null;
            return (
              <div className="detail-item" key={key}>
                <strong>{key.replace(/_/g, ' ')}</strong>
                {value || <em>No especificado</em>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuditorioDetalle;
