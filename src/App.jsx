import './App.css'
import Grid from "./components/Grid.jsx";
import Loader from "./components/Loader.jsx";
import loader from "./assets/js/loader.js";
import {useEffect} from "react";


function App() {
    useEffect(() => {
        loader(document.querySelector('.loader'))
    }, []);

    return (<>
        <Grid/>
        <Loader/>
    </>)
}

export default App
