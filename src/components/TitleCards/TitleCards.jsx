import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjA4ZGZiYWNmYTRhMTg4NjY5NGZjOGJiZmYxNDY3YSIsIm5iZiI6MTcyMDk1NDI4Ny44NTg2MjQsInN1YiI6IjY2OTNhY2I0ZDE3MWRiY2I4OWE3YmI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.24mJDR0g5Yz7zpWHHYfmr0Egj1RTZ3gpheW65zqXXA0'
    }
  };
  
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=> {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])

  return (
    <div className='title-cards'>
        <h3>{title ? title : "Popular on Netflix"}</h3>
        <div className="card-list" ref={cardsRef} >
          {apiData.map((card, index)=> {
            return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.title}</p>
            </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards