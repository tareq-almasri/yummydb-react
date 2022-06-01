import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Info from "./CreateAccount";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import OneRecipe from "./OneRecipe";
import { TokenProvider } from "./TokenContext";
import FavFood from "./FavFood";
import EditAccount from "./EditAccount";
import Header from "./Header";
import Footer from "./Footer";

export default function Container() {
  return (
    <TokenProvider>
      <Router>
        <Header />
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/create-account" component={Info} />
            <Route path="/edit-account-info" component={EditAccount} />
            <Route path="/favorite" component={FavFood} />
            <Route path="/recipes" exact component={Search} />
            <Route path="/recipe/:id" component={OneRecipe} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </TokenProvider>
  );
}
