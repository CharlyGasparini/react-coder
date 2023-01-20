import './App.css';
import pokemon from 'pokemontcgsdk'
import { useEffect, useRef, useState } from 'react';

pokemon.configure({apiKey: '3f6f93a3-51d8-4371-a3ef-c85261add868'});

function App() {
  
  const [cards, setCards] = useState([]);
  const [maxCards, setMaxCards] = useState(0);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const ref = useRef();

  useEffect(() => {
    pokemon.card.where({ q: `name:${value}*`, pageSize: 20, page: page })
    .then(cards => {
      setCards(cards.data);
      setMaxCards(cards.totalCount);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [page, value])
  

  return (
    <div className="App">
      <div className='page-wrapper'>
          <h1 className='title'>BUSCADOR DE CARTAS POKÉMON</h1>
          <form className='form' style={{marginBottom: "40px"}} 
            onSubmit={(e) => {
            e.preventDefault();
            setValue(ref.value);
          }}
          >
            <input ref={ref} type="text" placeholder='Ingrese busqueda aquí' value={value} onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value)
            }}/>
            <button type='submit'>Buscar</button>
          </form>
          <div>pagina{page}</div>
          <button onClick={() => { if(page > 1){ setPage(prev => prev - 1)}}}>
            Ir atras
          </button>
          <button onClick={() => { if(page < maxCards/20)setPage(prev => prev + 1)}}>
            Ir adelante
          </button>
          <div className='container'>
            {cards.map((card) => {
              return (
                <div key={card.id}>
                  <img src={card.images.small} style={{width: "100%"}} alt={card.name}/>
                  <div style={{color:"white", backgroundColor:"gray", borderRadius:"10px", padding: "10px", minHeight: "100px", display:"flex", flexDirection:"column" ,justifyContent:"space-between" }}>
                    <h2>{card.name}</h2>
                    <div>{card.id}</div>
                    <div>{card.cardmarket && `$${card.cardmarket.prices.trendPrice}`}</div>
                  </div>
                </div>
              )
            })}
          </div>

      </div>
    </div>
  );
}

export default App;
