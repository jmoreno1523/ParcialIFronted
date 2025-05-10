import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Auditorios = () => {
  const [auditorios, setAuditorios] = useState([]);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/auditorios')
      .then(res => setAuditorios(res.data))
      .catch(err => console.error("❌ Error cargando auditorios", err));
  }, []);

  const handleSeleccion = (e) => {
    const id = e.target.value;
    navigate(`/auditorio/${id}`);
  };

  const consultarChatGPT = async () => {
    if (!pregunta.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/chatgpt', { pregunta });
      setRespuesta(res.data.respuesta);
    } catch (err) {
      console.error("Error al consultar ChatGPT", err);
      setRespuesta("Error al obtener respuesta de la IA.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Auditorios disponibles</h2>

      <select onChange={handleSeleccion} defaultValue="" className="select">
        <option value="" disabled>Selecciona un auditorio para ver detalles</option>
        {auditorios.map(a => (
          <option key={a._id} value={a._id}>{a.nombre}</option>
        ))}
      </select>

      <div className="chat-box">
        <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>¿Tienes dudas? Pregúntale a la IA:</h4>

        <textarea
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Ejemplo: ¿Cuál auditorio tiene mejor tablero?"
          rows={4}
        />

        <button onClick={consultarChatGPT}>Consultar</button>

        {respuesta && (
          <div className="response-box">
            <strong>Respuesta:</strong>
            <p>{respuesta}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auditorios;
