import React from 'react';
import './Banner.css';

function Banner() {
  return (
  <section className='banner'>
    
    <h1 className='banner__heading'>KULTURKLIK</h1>

    <h3 className='banner__heading'>Próximos Eventos</h3>
    
    <ul className='banner__links'>
      <li><a href="#">Evento</a></li>
      <li><a href="#">Evento</a></li>
      <li><a href="#">Evento</a></li>
      <li><a href="#">Evento</a></li>
      <li><a href="#">Evento</a></li>
      
    </ul>
  </section>

  )
}

export default Banner;