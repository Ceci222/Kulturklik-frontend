import React, { useState, useEffect } from 'react';
import './EventList.css';
import fetchData from '../../utils/fetchData.js'; 

const EventList = () => {
    const [events, setEvents] = useState([]); //events va a aser la variable q almacene los datos obtenidos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { //ejecuta llamada al montarse el componente y actualiza edo cn nuevos datos
        const eventListHandler = async () => {
            try {
                const route = "/events";  // pasar la ruta del endpoint


                const eventsData = await fetchData(route);  // invocar a fetchData para obtener los datos y psarle la ruta
                
                console.log(eventsData)

                setEvents(eventsData.items || []);  // actualizar estado del array vacío incial a los datos obtenidos o arr vacío si falla
                //_embedded.events para no obtener el array completo, pq los eventos están anidados en _embedded.events, fromato HAL(?) TODO: buscar

            } catch (error) {
                setError("Hubo un error al obtener los eventos.");
            } finally {
                setLoading(false); //finalizar el edo de carga
            }
        };

        eventListHandler();
    }, []);  // Esto hace que se ejecute una vez al montar el componente

    if (loading) {
        return <div>Cargando eventos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Eventos de Kulturklik</h1>
            <ul className="eventList-list">
                {events.map((event, index) => { //events refiere a la variable que almacena los datos obtenidos: const [events, setEvents] = useState([]);
                    return ( 
                        <li key={event.id}>  {/* Usar el id del evento como 'key' */}
                            <h2>{event.nameEs || "Sin nombre del evento"}</h2>  
                            <p>{event.municipalityEs || "Municipio no disponible"}</p> 
                            <p>{event.typeEs || "Tipo de evento no especificado"}</p> 
                            <p>{event.openingHoursEs || "Horario no disponible"}</p>
                            <p>Desde: {event.startDate.split('T')[0].split('-').reverse().join('/') || "Fecha no disponible"}</p>
                            <p>Hasta: {event.endDate.split('T')[0].split('-').reverse().join('/')|| "Fecha no disponible"}</p>   
                            {/* <p>{new Date(event.endDate).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                                }) || Fecha no disponible}
                            </p> */}
                          <p> Dónde: {event.establishmentEs || event.placeEs || "Ubicación no disponible"}</p>  
                        
                          {event.images && event.images.length > 0 && ( //verificar img, si existe y es > a 0 renderizo
                            <div>
                                <img className="eventList__img"
                                    src={event.images[0].imageUrl} //tomo solo la de index 0 por si hay más
                                    alt={event.nameEs} 
                                    
                                />
                            </div>
                          )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default EventList;
