import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
// Ce composant est de de type fonction qui nous permet de recuperer les props de la page recherche pour afficher les informations du produit selectionné
const Produit = (props) => {
    const id = props.match.params.id;
    const brand = props.match.params.brand;
    const type = props.match.params.type;
    const [produit, setProduit] = useState([]);
// le hook useEffect sert a charger les données du produit selectionné
    useEffect(() => {
        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type}`)

            .then((response) => response.json())
            .then((data) => setProduit(data))
            .catch((e) => console.log(e));

    }, [brand, type]);
    console.log(produit);
    // Puisque l'API ne permet pas de recupérer un produit par son id, on parcourt toute la liste des produits avec un map en faisant une comparaison des ids avec le (if)
    return produit.map((i) => {
        if (i.id === parseInt(id)) {
            console.log(props);
            return (
                <Container align="center">
                    <h1>{i.name}</h1>
                    <img alt="produit" src={i.image_link} style={{ width: 250, border: "1px solid grey" }} />
                    <h2>Marque : {i.brand} </h2>
                    <h2>type de produit : {i.type} </h2>
                    <h2>Prix : {i.price} $</h2>
                    <h2>Monnaie : {i.currency} </h2>
                    <p className="p">Description : {i.description}</p>
                </Container>
            )
        } return true;
    })
};

export default Produit;