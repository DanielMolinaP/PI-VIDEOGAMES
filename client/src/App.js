// import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Componets/LandingPge/LandingPage.jsx"
import Home from "./Componets/Home/Home.jsx"
import CreateVideogame from './Componets/CreateVideogame/CreateVideogame'; 
import VideogameDetail from './Componets/VideogameDetail/VideogameDetail';
import VideogamesFavorites from "./Componets/Favorites/VideogamesFavorites.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route exact path={'/'} render={() => <LandingPage/>}/>
      <Route path={'/home'} render={() => <Home/>}/>
      <Route path={'/videogameDetail/:idVideogame'} render={(match) => <VideogameDetail match={match}/>}/>
      <Route path={'/createvideogame'} render={() => <CreateVideogame/>}/>
      <Route path={'/videogameFavorites'} render={() => <VideogamesFavorites/>}/>
      </BrowserRouter>
    </div>
  );
}


export default App;
