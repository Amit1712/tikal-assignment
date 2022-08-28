import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, MAX_EPISODES } from "../assets/constants";

import "../assets/characterDisplay.css";

const CharacterDisplay = () => {
  const [characterData, setCharacterData] = useState({});
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    const getDisplayData = async () => {
      try {
        //get Earth C-137 location data
        const response = await axios.get(API_BASE_URL + "/location/1");
        if (response.status === 200) {
          setLocationData(response.data);
          //get all Earth C-137 residents
          const residents = response.data.residents;
          let idsArray = [];
          //extract characters Ids
          residents.forEach((re) => {
            idsArray.push(re.match(/\d/g).join(""));
          });
          //get all characters data
          const res = await axios.get(
            API_BASE_URL + "/character/" + idsArray.join(",")
          );
          if (res.status === 200) {
            const characters = res.data;
            let shortest = MAX_EPISODES;
            //find the character with the least episodes
            characters.forEach((char) => {
              if (char.episode.length < shortest) {
                shortest = char.episode.length;
                setCharacterData(char);
              }
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDisplayData();
  }, []);

  return (
    Object.keys(characterData).length > 0 && (
      <div className="character-card-wrapper">
        <div className="card-header">
          <img src={characterData.image} alt="avatar-pic" />
          <div className="name">{characterData.name}</div>
        </div>
        <div className="card-body">
          <div className="txt">
            <div className="label">Origin: </div> {characterData.origin.name}
          </div>
          <div className="txt">
            <div className="label">Dimension: </div> {locationData.dimension}
          </div>
          <div className="txt">
            <div className="label">Popularity: </div>
            {characterData.episode.length}
          </div>
        </div>
      </div>
    )
  );
};

export default CharacterDisplay;
