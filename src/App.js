import { Fragment } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';
import './App.css';
import Accueil from './composants/Accueil';
import Global from './composants/Global';
import Page404 from './composants/Page404';
import Produit from './composants/Produit';
import Recherche from './composants/Recherche';

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <h1 align="center" >Bienvenue sur notre site beauté</h1>
                <Menu >
                    <MenuItem as={NavLink} activeStyle={{ color: "violet", fontWeight: "bold" }} to="/" exact>Accueil</MenuItem>
                    <MenuItem as={NavLink} activeStyle={{ color: "violet", fontWeight: "bold" }} to="/recherche">Produit</MenuItem>
                    <MenuItem as={NavLink} activeStyle={{ color: "violet", fontWeight: "bold" }} to="/produit">Information</MenuItem>
                    <MenuItem as={NavLink} activeStyle={{ color: "violet", fontWeight: "bold" }} to="/global">Global</MenuItem>
                </Menu>

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