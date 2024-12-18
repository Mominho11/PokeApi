import './App.css'
import {useEffect, useRef, useState} from "react";
import Pokemon from "./interfaces/Pokemon.tsx";
import pokemon from "./interfaces/Pokemon.tsx";

function App() {
    const [pokemons, setPokemons] = useState([]);
    // const [pokemonPhoto, setPokemonPhoto] = useState([]);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchDatas = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10?lang=fr");
            const data = await response.json();
            const filteredDatas = data.results.filter((pokemon) => pokemon.name);

            for (const pokemon of filteredDatas) {
                const response = await fetch(pokemon.url);
                const details = await response.json();

                setPokemons((previousPokemon: Pokemon) => {
                    if (!previousPokemon.some((p: Pokemon) => p.name === details.name)) {
                        return [...previousPokemon, details];
                    }
                    return previousPokemon;
                });

                // Fetch photos sur base de la logique au dessus !
            }
        }
        fetchDatas();

    }, [])

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node) && !visible) {
            console.log("Je clique dehors, je dois cacher le modal !");
            setVisible(false);
        }
    };

    useEffect(() => {
        if (visible) {
            console.log("Je call la fermeture")
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            console.log("Je call l'ouverture")
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [visible]);

    const handleModalClick = (event: MouseEvent) => {
        event.stopPropagation();
    };

    useEffect(() => {
        console.log("Selected poké", selectedPokemon);

    }, [selectedPokemon]);

return (
    <main>
        <h1>Welcome to our beautiful Pokedex</h1>

        <section className="search-bar-input">
            <input type="text" placeholder="Looking for a pokemon ?"/>
            <button><img src="../public/pokeball-pokemon-svgrepo-com.svg" alt="Pokeball-Button"/></button>
        </section>

        <ul className="poke-card-container">
            {pokemons.map((pokemon: Pokemon) => (
                <li className="poke-card" key={pokemon.id}>
                    <h2>{pokemon.name}</h2>
                    <img src="" alt="Tempo"></img>
                    <p>{pokemon.types.map((type: Pokemon.types) => type.type.name).join(' - ')}</p>
                    <button className="open-details-button" onClick={() => {
                        setSelectedPokemon(() => pokemons.find((p) => p.name === pokemon.name));
                        setVisible(!visible);
                    }} type="button">More . . .
                    </button>
                </li>
            ))}
        </ul>

        {visible && selectedPokemon && (
            <section className="poke-details-modal"   ref={modalRef} onClick={handleModalClick}>
                    <article>
                        <h2>You selected {selectedPokemon.name} !</h2>
                        <img src={selectedPokemon.sprites.front_shiny} alt={`Image for ${selectedPokemon.name}`}></img>
                        {/*<p>{pokemon.types.map((type) => type.type.name.join(' - '))}</p>*/}
                    </article>



                {/*<h2>You selected {pokemons[0].name} !</h2>*/}
                {/*<img src="" alt="Tempo"></img>*/}
                {/*<p>{pokemons.types.map((type) => type.type.name).join(' - ')}</p>*/}

            </section>
        )}
    </main>
)
}

export default App
