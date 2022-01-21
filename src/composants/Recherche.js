import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Container, Image, Label, Select } from "semantic-ui-react";
import axios from "axios";




const Recherche = (props) => {
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [produit, setProduit] = useState([]);
     

    const optionsBrand = [
        { value: "nyx", key:"nyx", text: "NYX"},
        { value: "l'oreal", key:"l'oreal", text: "L'oréal"},
        { value: "marcelle", key:"marcelle", text: "Marcelle"},
        { value: "clinique", key:"clinique", text: "Clinique"},
        { value: "maybelline", key:"maybelline", text: "Maybelline"},
        { value: "annabelle", key:"annabelle", text: "Annabelle"},
        { value: "almay", key:"almay", text: "Almay"},
        { value: "covergirl", key:"covergirl", text: "Covergirl"},
        { value: "revlon", key:"revlon", text: "Revlon"}
        
        
    ]
    const optionsType= [
        { value: "mascara", key:"mascara", text: "Mascara"},
        { value: "bronzer", key:"bronzer", text: "Bronzer"},
        { value: "eyeliner", key:"eyeliner", text: "Eyeliner"},
        { value: "lipstick", key:"lipstick", text: "Lipstick"},
        { value: "blush", key:"blush", text: "Blush"},
        { value: "eyebrow", key:"eyebrow", text: "Eyebrow"}


    ]
   
 

    const appelApi = () => {
        if(brand){
        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type}`)
            .then((response) => response.json())
            .then((data) => setProduit(data))
            .catch((erreur) => console.log(erreur));
   }else {
       alert("Veuillez entrer la marque du produit recherché");
    }
}

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
            <h1>Produit recherché</h1>
            <Label pointing="right">marque</Label>
     
          <Select placeholder='Select your brand' options={optionsBrand} value={brand}  onChange={(e,data) => setBrand(data.value)}/>
            <Label pointing="right">Type produit</Label>
            <Select placeholder='Select your Product Type' options={optionsType} value={type}  onChange={(e,data) => setType(data.value)}/>
            <Button onClick={appelApi}> Rechercher</Button>
           <h2>Résultats </h2>
            {produit.length >= 0 ? `Il y a ${produit.length} résultat(s)` : undefined} 
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                {produit.length > 0 ? renderProduit() : undefined}
            </div>

        </Container>
    )
};

export default Recherche;