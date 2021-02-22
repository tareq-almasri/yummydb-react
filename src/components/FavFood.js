import React, { useContext, useState, useEffect, Fragment } from "react";
import { TokenContext } from "./TokenContext";
import { Link } from "react-router-dom";
import "../styles/Search.css";

import Header from "./Header";
import Footer from "./Footer";

export default function FavFood() {
  const {token} = useContext(TokenContext);
  const [favArray, setFavArray] = useState([]);

  useEffect(() => {
    fetch("https://yummydb-api.herokuapp.com/get-fav", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFavArray(data));
  }, [token]);

  return (
    <Fragment>
      <Header />
      <div id="body">
        <h1 style={{ paddingTop: "30px" }} id="fav-recipes">
          Favorite recipes
        </h1>
        <div className="recipies-section">
          {favArray.map((res) => (
            <Link key={res.id} className="card-image" to={`recipe/${res.id}`}>
              <div id="image">
                <img src={res.image} alt={res.title} width="100%" />
              </div>
              <h2 id="recipe-title">
                {res.title.replace(/^\w/, (c) => c.toUpperCase())}
              </h2>
              <div id="time-icon">
                <i className="far fa-clock"></i>
                <span id="time">
                  {res.readyInMinutes > 60
                    ? Math.floor(res.readyInMinutes / 60) + "h"
                    : res.readyInMinutes + "min"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
