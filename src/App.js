import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from './cube/router';

import { routeConfig } from './routeConfig';

// import './App.css';


export default () => {
    return (
        <Router>
            <div className="App">
                <Routes routes={routeConfig} />
            </div>
        </Router>
    )
}

// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

// export default App;
