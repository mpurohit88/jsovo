import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./App.scss";

const App = () => {
  const [photo, setPhoto] = useState("");
  const clientID = "Ku3lPHKp5reQ48M2tSs7D5ANT0lgQAyEqf85zndcIow";
  const [next, setNext] = useState(0);

  const data = useSelector(state => state);
  const dispatch = useDispatch();

  const handleChange = e => {
    setPhoto(e.target.value);
  };

  const handleClick = e => {
    const url = `https://api.unsplash.com/search/photos?&query=${photo}&client_id=${clientID}&page=${next}&per_page=50`;

    axios.get(url).then(response => {
      dispatch({ type: "photos", data: response.data.results })
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
      {console.log("photos....", data.photos)}
      <h1 className="heading">Unsplash Image Search</h1>

      <div className="input-group">
        <input
          className="input-group__input"
          id="photo"
          type="text"
          placeholder=" "
          onChange={handleChange}
        />
        <label className="input-group__label" htmlFor="photo">
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
      <div className="masonry">
        {(data.photos || []).map((ar, id) => {
          return (
            <React.Fragment>
              <div className="grid">
                <img
                  src={ar.urls.small}
                  alt={ar.alt_description}
                  title={ar.alt_description}
                />
                <div className="grid__body">
                  <div className="relative">
                    <a
                      className="grid__link"
                      target="_blank"
                      href={ar.urls.full}
                    />
                    <h1 className="grid__title">{ar.alt_description}</h1>
                    <p className="grid__author">{ar.user.name}</p>
                  </div>
                  <div className="mt-auto">
                    {ar.tags.map(tag => {
                      return <span className="grid__tag">{tag.title}</span>;
                    })}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default App;
