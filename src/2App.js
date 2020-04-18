import React, { useState, useEffect } from "react";
import Posts from "./Components/Posts";
import Pagination from "./Components/Pagination";
import axios from "axios";
import "./App2.scss";

const App = () => {
  const [photo, setPhoto] = useState("");
  const clientID = "Ku3lPHKp5reQ48M2tSs7D5ANT0lgQAyEqf85zndcIow";
  const [result, setResult] = useState([]);
  const [next, setNext] = useState(0);
  const handleChange = e => {
    setPhoto(e.target.value);
  };

  const handleClick = e => {
    const url = `https://api.unsplash.com/search/photos?&query=${photo}&client_id=${clientID}&page=${next}&per_page=50`;

    axios.get(url).then(response => {
      setResult(response.data.results);
    });
  };

  const nextPage = () => {
    setNext(next + 1);
    handleClick();
  };
  const previousPage = () => {
    setNext(next - 1);
    handleClick();
  };

  return (
    <div className="container">
      <h1 className="heading">Unsplash Image Search</h1>

      <div className="input-group">
        <input
          className="input-group__input"
          id="photo"
          type="text"
          placeholder=" "
          onChange={handleChange}
        />
        <label className="input-group__label" for="photo">
          Find Photo
        </label>
      </div>
      <button className="button" onClick={handleClick} type="submit">
        Search
      </button>
      <button className="button" onClick={previousPage}>
        Previous
      </button>
      <button className="button" onClick={nextPage}>
        Next
      </button>
      <div className="gallery">
        {result.map((ar, id) => {
          return (
            <React.Fragment>
              <div className="gallery-item">
                <img
                  className="gallery-image"
                  src={ar.urls.small}
                  alt={ar.alt_description}
                  title={ar.alt_description}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default App;
