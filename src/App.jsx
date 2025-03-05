import Home from "./Home.jsx";
import {Route, Routes} from "react-router";
import NotFound from "./NotFound.jsx";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>)
}

export default App
