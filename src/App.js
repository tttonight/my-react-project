import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from './cube/router';

import { routeConfig } from './routeConfig';

// import './App.css';
import 'src/data/mock';
import './assets/css/common.scss';

export default () => {
    return (
        <Router>
            <Routes routes={routeConfig} />
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
