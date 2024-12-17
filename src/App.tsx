import './App.css'

function App() {
  return (
      <main>
          <h1>Welcome to our beautiful Pokedex</h1>
          <section className="search-bar-input">
              <input type="text" placeholder="Looking for a pokemon ?"/>
              <button><img src="../public/pokeball-pokemon-svgrepo-com.svg" alt="Pokeball-Button"/></button>
          </section>
          <section className="poke-card">
              <h2>Dracaufeu</h2>
              <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
              <p>Meilleur pokemon de l'histoire des pokemon</p>
              <button>More ...</button>
          </section>
          <section className="poke-card">
              <h2>Dracaufeu</h2>
              <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
              <p>Meilleur pokemon de l'histoire des pokemon</p>
              <button>More ...</button>
          </section>
          <section className="poke-card">
              <h2>Dracaufeu</h2>
              <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
              <p>Meilleur pokemon de l'histoire des pokemon</p>
              <button>More ...</button>
          </section>
          <section className="poke-card">
              <h2>Dracaufeu</h2>
              <img src="../public/Dracaufeu.png" alt="Dracaufeu"/>
              <p>Meilleur pokemon de l'histoire des pokemon</p>
              <button>More ...</button>
          </section>
      </main>
  )
}

export default App
