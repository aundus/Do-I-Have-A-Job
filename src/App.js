import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto">
          <Route path="/" exact component={Home} />
        </div>
      </div>
    </Router>
  );
}

export default App;
