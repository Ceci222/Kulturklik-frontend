import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import fetchData from '../utils/fetchData';
import { useSearchParams } from 'react-router-dom'; //hook para que acceda a los params del la URL del filtro en navigate

function EventsPage() {
  const [searchParams] = useSearchParams(); // es un hook que toma params de la url /events?filter=Conciert
  const initialFilter = searchParams.get('filter') || ''; //establece el valor inicial o de los params (filter) o string vacío
  const [filter, setFilter] = useState(initialFilter); //fija el valor incial en el del filtro, si no hay será ""
  const [events, setEvents] = useState([]); // Estado p/events
  const [categories, setCategories] = useState([]); // Estado p/categorías
  const [loading, setLoading] = useState(true); // Estado p/loading
  const [error, setError] = useState(null); // Estado p/errors


  useEffect(() => {
    const newFilter = decodeURIComponent(searchParams.get('filter') || '');
    console.log('Filtro desde URL:', newFilter);
    setFilter(newFilter);
  }, [searchParams]);
  /* useEffect(() => { //useEffect para ejecutar este codigo cuando algo cambia 
    setFilter(searchParams.get('filter') || '');   // obtiene el valor de filter de la URL (o usa '' si no hay filtro y guarda en filter
  }, [searchParams]); //useEffect se ejecuta si searchParams cambia
 */
  // Obtener eventos desde la API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const route = "/events?page=0&size=200";  // pasar la ruta del endpoint

        const eventsData = await fetchData(route);  //fetchData se encarga de errores y devolver .json

        const fetchedEvents = eventsData.items || []; 

        console.log('Evento completo:', eventsData.items[0]);

        setEvents(fetchedEvents);
        console.log('Categorías en eventos cargados:', fetchedEvents.map(event => event.typeEs));        

        // Extraer las categorías únicas desde typeEs
        const uniqueCategories = [...new Set(fetchedEvents.map(event => event.typeEs))]; //SET para almacear valores unicos y descartar duplicados, simil python
        //desestructuro la categorias que ontiene map a partir de evnt.typeES y las almaceno en un set

        setCategories(uniqueCategories); //actualizo edo
        console.log('Categorías disponibles:', uniqueCategories);
      } catch (err) {
        setError('No se pudieron cargar los eventos. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false); //fin carga
      }
    };
    fetchEvents();
    
  }, []);

  console.log('Filtro actual:', filter);
  let filteredEvents = [];
  

  if (filter) { //si tiene valor asignado 
    
    if (filter === 'Otro') {
      
      const otherCategories = [
        'Teatro',
        'Danza',
        'Exposición',
        'Bertsolarismo',
        'Formación',
        'Concurso',
        'Evento/Jornadas',
        "Otro"
      ];

      filteredEvents = events.filter(event => otherCategories.includes(event.typeEs));
    } else {
      filteredEvents = events.filter(event => event.typeEs.toLowerCase().trim() === filter.toLowerCase().trim());    
    }
    
  
  } else {
    filteredEvents = events; 
  }

  console.log('Eventos filtrados:', filteredEvents);


  const filterHandler = (category) => {
    
    setFilter(category); //TODO: quitar CONSOLE:LOG
    console.log(`Filtrado por: ${category}`); //valor de filter aquí pero metido en banner 
  };


  //carga o error
  if (loading) return <div>Cargando eventos...</div>;
  if (error) return <div>{error}</div>; //del setError

  return (
    <div>
      <section>
        <h2>Eventos</h2>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map(evt => (
              <li key={evt.id}>
                <h2>{evt.nameEs || "Sin nombre"}</h2>
                <p>{evt.descriptionEs?.replace(/<[^>]+>/g, '') || "Sin descripción"}</p>
                <p>Lugar: {evt.establishmentEs || "No hay información disponible"}</p>
                <p>Fecha: {evt.startDate || "No hay información disponible"}</p>
                <p>Precio: {evt.priceEs || "No hay información disponible"}</p>
                {evt.images?.length > 0 && <img src={evt.images[0]?.imageUrl} alt={evt.nameEs} />}
                {evt.purchaseUrlEs && <a href={evt.purchaseUrlEs}>Comprar</a>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay eventos disponibles para la siguiente categoría: "{filter || 'todas'}".</p>
        )}
      </section>
    </div>
  );
}

export default EventsPage;