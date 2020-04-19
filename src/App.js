import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./App.scss";

const App = () => {
  const [photo, setPhoto] = useState("");
  const clientID = "Ku3lPHKp5reQ48M2tSs7D5ANT0lgQAyEqf85zndcIow";
  const [next, setNext] = useState(1);

  const data = useSelector(state => state);
  const dispatch = useDispatch();

  const handleChange = e => {
    setPhoto(e.target.value);
  };

  const handleClick = (pageNo) => {
    setNext(pageNo);
    fetchData(pageNo);
  };

  function fetchData(pageNo) {
    dispatch({ type: "photos_fetch" });

    const url = `https://api.unsplash.com/search/photos?&query=${photo}&client_id=${clientID}&page=${pageNo}&per_page=2`;

    axios.get(url).then(response => {
      dispatch({ type: "photos_success", value: { photos: response.data.results } });
    }).catch(error => {
      dispatch({ type: "photos_failure", value: { error: error } });
    });
  }

  const nextPage = (pageNo) => {
    setNext(pageNo);
    fetchData(pageNo);
  };

  const previousPage = (pageNo) => {
    if (pageNo > 1) {
      pageNo = pageNo - 1;

      setNext(pageNo);
      fetchData(pageNo);
    }

    return false;
  };

  return (
    <div className="container">
      {data.isLoading && <div class="loading"></div>}

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
      <button className="button" onClick={() => handleClick(1)} type="submit">
        Search
      </button>
      <button className={next === 1 ? "btn-disabled" : "button"} onClick={() => previousPage(next)}>
        Previous
      </button>
      <button className="button" onClick={() => nextPage(next + 1)}>
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
