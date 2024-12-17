import './App.css'
import Footer from "./components/Footer.tsx";
import {useEffect, useState} from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
      const fetchDatas = async () => {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=40&limit=10");
          const data = await response.json();
          setPokemon(data);
      }
      fetchDatas();

  }, [])

    useEffect(() => {
        console.log("AHHHHHHHHHHHH ", pokemon);
    }, [pokemon]);

  return (
      <main>
          <h1>Welcome to our beautiful Pokedex</h1>


          <section className="search-bar-input">
              <input type="text" placeholder="Looking for a pokemon ?"/>
              <button><img src="../public/pokeball-pokemon-svgrepo-com.svg" alt="Pokeball-Button"/></button>
          </section>

          <ul className="poke-card-container">
              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Mega Dracaufeu X</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>

              <li className="poke-card">
                  <h2>Dracaufeu</h2>
                  <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
                  <p>Meilleur pokemon de l'histoire des pokemon</p>
                  <button>More ...</button>
              </li>
          </ul>
          <Footer />
      </main>
  )
}

export default App
