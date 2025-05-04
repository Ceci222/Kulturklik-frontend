import React, { useState, useEffect } from 'react'; // Asegúrate de tener esta importación
import './EventList.css'; // Si es necesario, importa tus estilos
import fetchData from '../utils/fetchData.js'; // O lo que necesites para obtener los datos

const EventInfoPanel = () => {
  const [events, setEvents] = useState([]); // Usa el hook useState para gestionar los eventos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data._embedded.events || []);
      } catch (err) {
        setError('Hubo un error al obtener los eventos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Cargando eventos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Eventos de Kulturklik</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h2>{event.name || 'Sin título'}</h2>
            <p>{event.startDate || 'Fecha no disponible'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventInfoPanel;
