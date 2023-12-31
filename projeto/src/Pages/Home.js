import React from 'react';
import { register } from 'swiper/element/bundle';
import '../Styles/Home.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import image1 from '../img/03.png';
import image2 from '../img/02.jpg';
import image3 from '../img/05.jpg';
import Card from './Card';

register();

function Home() {
  const data = [
    { id: '1', image: image1 },
    { id: '2', image: image2 },
    { id: '3', image: image3 },
  ];

  const cardData = [
    { title: 'Ganhe 2 Meses! ', content: 'Aderindo o plano mestre, você ganha dois meses de desconto.', color: '#8B0000' },
    { title: 'Atualização às 12:00!', content: 'Nossa plataforma ficará indisponível durante às 12:00 até às 17:00 para correção de erros do sistema.', color: '#1E1E1E' },
    { title: 'Sorteio de livro de T20!', content: 'Concorra ao sorteio de um livro oficial de T20 oferecido pela nossa parceria com a Editora Jambô', color: '#8B0000' },
    { title: 'Melhor do Brasil!', content: 'Crítica avalia Beholder como o melhor site de interação e encontro de jogadores de RPG.', color: '#1E1E1E' },
  ];

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>
      <Swiper slidesPerView={1} pagination={{ clickable: true }} navigation>
        {data.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="image-container">
              <img src={item.image} alt={`Slider ${index + 1}`} className="slide-item" />
              {item.id === '1' && (
                <div className="content-overlay">
                  <p className="image-text">
                  <b>Encontre as melhores mesas de RPG!</b><br />
                    Seja você um mestre ou jogador, sua diversão está garantida aqui.
                  </p>
                  <Link to="/cadastro">
                    <button className="overlay-button">Jogue ainda hoje!</button>
                  </Link>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Renderize os cards abaixo do slider */}
      <div className="card-container">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} content={card.content} customColor={card.color} className='custom-card' />
        ))}
      </div>
    </div>
  );
}

export default Home;
