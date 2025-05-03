import React from 'react';
import './Banner.css';

function Banner() {
  return (
  <section className='banner'>
    
    <h1>KULTURKLIK</h1>

    <h3>Próximos Eventos</h3>
    
    <ul className='banner__links'>
      <li><a href="#">Conciertos</a></li>
      <li><a href="#">Fiestas</a></li>
      <li><a href="#">Ferias</a></li>
      <li><a href="#">Conferencias</a></li>
      <li><a href="#">Cine y audiovisuales</a></li>
      <li><a href="#">Otros</a></li>
      
    </ul>
  </section>

  )
}

export default Banner;