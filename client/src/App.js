import React from "react";
import { IntelligencePage } from "./pages/IntelligencePage";
import "./styles/App.scss";

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Threat Intelligence Dashboard</h1>
        <p>Analyze threat indicators and get insights about IP addresses</p>
      </header>
      <main className="main-content">
        <IntelligencePage />
      </main>
    </div>
  );
}

export default App;
