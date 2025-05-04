import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({onFilter}) {
    const navigate = useNavigate(); //hook para poder cambiar de página

    const handleClick = (category) => {
        console.log('Categoría clicada:', category);
        if (onFilter) {//si existe el prop se invoca con este arg
          onFilter(category); // onFilter en EventsPage
        } else {
            navigate(`/events?filter=${encodeURIComponent(category)}`); // rfuncion q convierte cadenas url para q navigate redirja
        }
      };

      
    
  return (
  <section className='navbar'>

    
    <ul className='navbar__links'>
      
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick("Concierto"); }}>Conciertos</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick("Fiestas"); }}>Fiestas</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick("Conferencia"); }}>Conferencias</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick("Cine y audiovisuales"); }}>Cine y audiovisuales</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleClick("Otro"); }}>Otros</a></li>

      
    </ul>
  </section>

  )
}

export default NavBar;