import './App.css'
import {useEffect, useRef, useState} from "react";
import Pokemon from "./interfaces/Pokemon.tsx";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

    useEffect(() => {
        const fetchDatas = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=12?lang=fr");
            const data = await response.json();
            const filteredDatas = data.results.filter((pokemon: Pokemon) => pokemon.name);

            for (const pokemon of filteredDatas) {
                const response = await fetch(pokemon.url);
                const details = await response.json();

                setPokemons((previousPokemon: Pokemon) => {
                    if (!previousPokemon.some((p: Pokemon) => p.name === details.name)) {
                        return [...previousPokemon, details];
                    }
                    return previousPokemon;
                });
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
        const fetchDatas = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.name}`);
            const data = await response.json();
            setSelectedDescription(data.flavor_text_entries[0].flavor_text);
            console.log("Desc -> ", selectedDescription);
        }
        fetchDatas();

    }, [selectedPokemon]);

    return (
        <main>
            <h1>Welcome to our beautiful Pokedex</h1>

            <section className="search-bar-input">
                <input type="text" placeholder="Looking for a pokemon ?"/>
                <button><img src="../public/pokeball.svg" alt="Pokeball-Button"/></button>
            </section>

            <ul className="poke-card-container">
                {pokemons.map((pokemon: Pokemon) => (
                    <li className="poke-card" key={pokemon.id}>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
                        <p className="test-type">{pokemon.types.map((type: Pokemon.types) => type.type.name).join(' - ')}</p>
                        <button className="open-details-button" onClick={() => {
                            setSelectedPokemon(() => pokemons.find((p) => p.name === pokemon.name));
                            setVisible(!visible);
                        }} type="button">More
                        </button>
                    </li>
                ))}
            </ul>

            {visible && selectedPokemon && (
                <section className="poke-details-modal" ref={modalRef} onClick={handleModalClick}>
                    <article>
                        <h2>You selected {selectedPokemon.name} !</h2>

                        <div className="picture-container">
                            <img src={selectedPokemon.sprites.front_default}
                                 alt={`Image for ${selectedPokemon.name} normal`}></img>
                        </div>

                        <section className="pokemon-infos">
                            <p>N° {selectedPokemon.id} Pokémon FakeFlamme Height: {selectedPokemon.height} Weight: {selectedPokemon.weight}</p>
                        </section>

                        <p className="pokemon-descrition">{selectedDescription!}</p>

                        <ul className="pokemon-types">
                            {selectedPokemon.types.map((type) => (
                                <p className="badge">
                                    {type.type.name}
                                </p>
                            ))}
                        </ul>
                    </article>



                    {/*<p>{pokemons.types.map((type) => type.type.name).join(' - ')}</p>*/}

                </section>
            )}
        </main>
    )
}

export default App
