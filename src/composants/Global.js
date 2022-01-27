import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Container, Image, Label, Select } from "semantic-ui-react";
import axios from "axios";

// Composant de type fonction qui nous retourne tous les meilleurs produits qui ont une évaluation supérieur a 4.9/5 e 
//et ceci a l'aide de l'appel de l'API avec AXIOS
const Global = (props) => {
    const [produit, setProduit] = useState([]);
    useEffect(() => {
        axios
            .get(`http://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=4.9`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setProduit(data);
            })
    });

    const renderProduit = () => {
        return produit.map((item) => {
            return (
                <Card key={item.id}>
                    <Image src={item.image_link} />
                    <CardContent>
                        <CardHeader>
                            <Link to={`/produit/${item.id} ${item.brand} ${item.product_type} `}> {item.name} <br /> Rating: {item.rating} </Link>
                        </CardHeader>
                    </CardContent>
                </Card>

            )
        })
    }

    console.log(produit);
    return (
        <Container>
            <h1 align="center">Tous nos meilleurs produits</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                {produit.length > 0 ? renderProduit() : undefined}
            </div>

        </Container>
    )
};

export default Global;