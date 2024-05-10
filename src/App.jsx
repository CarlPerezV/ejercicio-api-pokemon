// Components
import Button from "./components/Button";
import Card from "./components/Card";
// Icons
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
// Styles
import "./sass/App.scss";
// Hooks
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokeId, setPokeId] = useState(1);
  const [pokeEvo, setPokeEvo] = useState([]);
  // const [pokeName, setPokeName] = useState();

  useEffect(() => {
    getEvo(pokeId);
  });

  async function getEvo(id) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const data = await response.json();

    let pokeEvoArray = [];

    let pokeEvo1 = data.chain.species.name;
    let pokeEvo1Img = await getPokeImg(pokeEvo1);
    pokeEvoArray.push([pokeEvo1, pokeEvo1Img]);

    // revisa si tiene evoluciones
    if (data.chain.evolves_to.length !== 0) {
      let pokeEvo2 = data.chain.evolves_to[0].species.name;
      let pokeEvo2Img = await getPokeImg(pokeEvo2);
      pokeEvoArray.push([pokeEvo2, pokeEvo2Img]);

      if (data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokeEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokeEvo3Img = await getPokeImg(pokeEvo3);
        pokeEvoArray.push([pokeEvo3, pokeEvo3Img]);
      }
    }
    setPokeEvo(pokeEvoArray);
  }

  async function getPokeImg(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  }

  function prevClick() {
    setPokeId === 1 ? setPokeId(1) : setPokeId(pokeId - 1);
  }

  function nextClick() {
    setPokeId(pokeId + 1);
  }

  return (
    <div className="app">
      <div className={`card-container card${pokeEvo.length}`}>
        {pokeEvo.map((pokemon) => (
          <Card key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />
        ))}
      </div>

      <div className="buttons-container">
        <Button icon={<TiArrowLeftOutline />} handleClick={prevClick} />
        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
    </div>
  );
}

export default App;
