import { Fragment } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';
import './App.css';
import Accueil from './composants/Accueil';
import Global from './composants/Global';
import Page404 from './composants/Page404';
import Produit from './composants/Produit';
import Recherche from './composants/Recherche';

//Le APP permet de nous afficher le menu de notre application , et de créer des routes pour les différentes composantes.


function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <h1 align="center" > </h1>
                
                 <div  class="topnav-centered" > 
                <Menu align="center" pointing secondary>
                    <MenuItem   as={NavLink} activeStyle={{ color: "white", fontWeight: "bold"}} class="item active" to="/" exact>Accueil</MenuItem>
                    <MenuItem  as={NavLink} activeStyle={{ color: "white", fontWeight: "bold" }} class="item" to="/recherche">Produit</MenuItem>
                    <MenuItem  as={NavLink} activeStyle={{ color: "white", fontWeight: "bold" }} class="item" to="/produit">Information</MenuItem>
                    <MenuItem  as={NavLink} activeStyle={{ color: "white", fontWeight: "bold" }}  class="item" to="/global">Meilleurs Produits</MenuItem>
                </Menu>
                </div>

                <Switch>
                    <Route path="/" component={Accueil} exact />
                    <Route path="/recherche" component={Recherche} />
                    <Route path="/produit/:id :brand :type" component={Produit} />
                    <Route path="/global" component={Global} />
                    <Route path="*" component={Page404} />

                </Switch>
            </BrowserRouter>
        </Fragment>
    );
}
export default App;