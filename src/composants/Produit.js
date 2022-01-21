import { useEffect, useState } from "react";
import { Container} from "semantic-ui-react";

const Produit = (props) => {
const id = props.match.params.id;
const brand=props.match.params.brand;
const type=props.match.params.type;
const [produit, setProduit] = useState([]);

    useEffect(() => {
    //    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?id=${id}`)
        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type}`)

            .then((response) => response.json())
            .then((data) => setProduit(data))
            .catch((e) => console.log(e));

    }, [brand, type]);
    console.log(produit);
    return produit.map((i) => {
      if(i.id===parseInt(id)){
          console.log(props);
        return (
        <Container align="center">
            <br/>
            <br/>
            <br/>
            <h1>{i.name}</h1>
            <h2>Marque : {i.brand} </h2>
            <h2>Prix : {i.price} $</h2>
            <h2>Monnaie : {i.currency} </h2>
            <img alt="produit" src={i.image_link} style={{ width: 430, border: "1px solid grey" }} />
        </Container>
        )}return true;
    })
};

export default Produit;