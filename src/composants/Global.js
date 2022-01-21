import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Container, Image, Label, Select } from "semantic-ui-react";
import axios from "axios";




const Global = (props) => {
 

    const [produit, setProduit] = useState([]);
     

   
    const appelProduit = () => {
        axios
        .get(`http://makeup-api.herokuapp.com/api/v1/products.json`)
        .then((response) =>{
        const data = response.data;
        console.log(data);
        setProduit(data);
    });} 

    


    const renderProduit = () => {
        return produit.map((item) => {
            return (
                <Card key={item.id}>
                 <Image src={item.image_link} /> 
                    <CardContent>
                        <CardHeader>
                            <Link to={`/produit/${item.id} ${item.brand} ${item.product_type} `}> {item.name} </Link>
                        </CardHeader>
                    </CardContent>
                </Card>

            )
        })
    }

    console.log(produit);
    return (
        <Container>
            <h1>Tous nos produits</h1>
            <Button onClick={appelProduit}> Afficher nos produits</Button>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                {produit.length > 0 ? renderProduit() : undefined}
            </div>

        </Container>
    )
};

export default Global;