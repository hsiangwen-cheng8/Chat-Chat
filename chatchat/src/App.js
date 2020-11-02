import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/Chat';
import './App.css';
// I took this concept from a online tutorial found here: https://www.youtube.com/watch?v=ZwFA3YMfkoc&ab_channel=JavaScriptMastery
// I was tring new stuff with react and since its pretty general, 
// I leaved it as pretty mcuh as the same as the tutorial
const App = () => {
    return (
        <Router>
            <Route path="/" component={Chat}></Route>
        </Router>
    );
};

export default App;