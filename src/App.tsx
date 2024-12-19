import './App.css'
import {useCallback, useEffect, useRef, useState} from "react";
import Pokemon from "./interfaces/Pokemon.tsx";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [searchName, setSearchName] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

    useEffect(() => {
        const fetchDatas = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=12");
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

    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            console.log('Modal ?? ', visible)
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && visible) {
                console.log("Je clique dehors, je dois cacher le modal !");
                setVisible(false);
            }
        },
        [visible]
    );

    useEffect(() => {
        if (visible) {
            console.log("Le modal est visible !")
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [handleOutsideClick, visible]);

    const handleModalClick = (event: MouseEvent) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const fetchDatas = async () => {
            if (!selectedPokemon) return;

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.name}`);
            const data = await response.json();
            setSelectedDescription(data.flavor_text_entries[0].flavor_text);
        }

        fetchDatas();

    }, [selectedPokemon]);

    async function handleFetchOnePokemon(searchName: string) {
        if (!searchName) return;

        console.log("searchname", searchName)
        console.log("Test ", Array(searchName))

        if (Array(searchName).length > 2) { // Marche po chef !!
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${searchName}`);
            const data = await response.json();

            console.log('Pokename fetché sur base de son nom ! -> ', data);
        }
        
        // setPokemon && description !
    }

    useEffect(() => {
        if (searchName) {
            const poke = handleFetchOnePokemon(searchName);
            console.log("Pokerrrrrrrr -> ", poke);
           // setPokemons(poke);
        }
    }, [searchName, selectedPokemon]);


    return (
        <main>
            <h1>Welcome to our beautiful Pokedex</h1>

            <section className="search-bar-input">
                <input className="search-input" type="text" placeholder="Looking for a pokemon ?"
                       onChange={(e) => setSearchName(e.target.value)}/>
                <button onClick={() => handleFetchOnePokemon(searchName)}>
                    <img src="../public/pokeball.svg" alt="Pokeball-Button"/>
                </button>
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
                        <h2>{selectedPokemon.name}</h2>

                        <div className="picture-container">
                            <img src={selectedPokemon.sprites.front_default}
                                 alt={`Image for ${selectedPokemon.name} normal`}></img>
                        </div>

                        <section className="pokemon-infos">
                            <p>N° {selectedPokemon.id} Pokémon FakeFlamme
                                Height: {selectedPokemon.height} Weight: {selectedPokemon.weight}</p>
                        </section>

                        <ul className="pokemon-types">
                            {selectedPokemon.types.map((type: string) => (
                                <li className={`badge ${type.type.name}`} key={type.type.name}>
                                    {type.type.name}
                                </li>
                            ))}
                        </ul>


                        <p className="pokemon-descrition">{selectedDescription!}</p>

                    </article>


                </section>
            )}
        </main>
    )
}

export default App
