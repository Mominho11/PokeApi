import './App.css'
import {useEffect, useRef, useState} from "react";
import Pokemon from "./interfaces/Pokemon.tsx";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
    const [abilities, setAbilities] = useState({"one": null, "two": null});

    const typeColors: Record<string, string> = {
        fire: "rgb(222, 106, 77)",
        water: "rgb(66, 127, 232)",
        grass: "rgb(90, 160, 59)",
        electric: "rgb(241, 196, 66)",
        bug: "rgb(149, 162, 44)",
        poison: "rgb(136, 68, 197)",
        flying: "rgb(142, 185, 235)",
        ground: "rgb(137, 83, 40)",
        psychic: "rgb(221, 78, 122)",
        rock: "rgb(175, 171, 134)",
    };

    useEffect(() => {
        const fetchDatas = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
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
        }
        fetchDatas();

    }, [selectedPokemon]);

    useEffect(() => {
        const fetchDatas = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`);
            const data = await response.json();

            const abi = {
                "one": data.abilities[0].ability.name,
                "two": data.abilities[1].ability.name,
            };
            setAbilities(abi);
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
                    {selectedPokemon.types.map((type: string) => (
                        <div
                            className="poke-card-background"
                            style={{"--type-color": typeColors[selectedPokemon.types[0]?.type.name] || "gray"} as React.CSSProperties}>
                            <article>
                                <h2>{selectedPokemon.name}</h2>

                                <div className="picture-container">
                                    <img src={selectedPokemon.sprites.front_default}
                                         alt={`Image for ${selectedPokemon.name} normal`}></img>
                                </div>

                                <section className="pokemon-infos">
                                    <p>N° {selectedPokemon.id} Pokémon Fake Flamme
                                        Height: {selectedPokemon.height} Weight: {selectedPokemon.weight}</p>
                                </section>

                                <ul className="pokemon-types">
                                    {selectedPokemon.types.map((type: string) => (
                                        <p className={`${type.type.name}-badge`}>
                                            {type.type.name}
                                        </p>
                                    ))}
                                </ul>

                                <ul className="abilities">
                                    <p className="ability">{abilities.one}</p>
                                    <p className="ability">{abilities.two}</p>
                                </ul>


                                <p className="pokemon-description">{selectedDescription!}</p>

                            </article>


                        </div>
                    ))}
                </section>
            )}
        </main>
    )
}

export default App
