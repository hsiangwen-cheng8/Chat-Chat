import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/Chat';
import './App.css';

const App = () => {
    return (
        <Router>
            <Route path="/" component={Chat}></Route>
        </Router>
    );
};

export default App;