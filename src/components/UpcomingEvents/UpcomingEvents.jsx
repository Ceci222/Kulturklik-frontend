import React, { useState, useEffect } from 'react';
import fetchData from '../../utils/fetchData.js'; 
import './UpcomingEvents.css';


const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventListHandler = async () => {
      try {
        const route = "/events/upcoming";
        const upcomingEventsData = await fetchData(route);
        console.log(upcomingEventsData)
        setEvents(upcomingEventsData.items || []);
      } catch (error) {
        setError("Hubo un error al obtener los eventos.");
      } finally {
        setLoading(false); 
      }
    }
    eventListHandler();
  }, []);

  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Próximos Eventos</h1>
      <ul className='Upcoming-events'>
        {events.map((evnt, index) => (
          <li key={evnt.id}>
            <h2>{evnt.nameEs || "Sin nombre del evento"}</h2>  
            <p>{evnt.municipalityEs || "Municipio no disponible"}</p> 
            <p>{evnt.typeEs || "Tipo de evento no especificado"}</p> 
            <p>{evnt.openingHoursEs || "Horario no disponible"}</p>
            <p>{evnt.startDate.split('T')[0].split('-').reverse().join('/') || "Fecha no disponible"}</p>
            <p>{evnt.endDate.split('T')[0].split('-').reverse().join('/') || "Fecha no disponible"}</p>
            <p>Dónde: {evnt.establishmentEs || evnt.placeEs || "Ubicación no disponible"}</p>  
            {evnt.images && evnt.images.length > 0 && (
              <div>
                <img
                  className="eventList__img"
                  src={evnt.images[0].imageUrl}
                  alt={evnt.nameEs}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEvents;