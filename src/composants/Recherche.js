
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Container, Icon, Image, Label, Select } from "semantic-ui-react";
import axios from "axios";


// Ce composant est de de type fonction qui nous permet de selectionner les différents choix de recherche afin de nous afficher les produits souhaités
const Recherche = (props) => {
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [greatherPrice, setGreatherPrice] = useState("");
    const [type, setType] = useState("");
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");
    const [produit, setProduit] = useState([]);

//Quelques marques suggérées par l'API
    const optionsBrand = [
        { value: "nyx", key: "nyx", text: "NYX" },
        { value: "l'oreal", key: "l'oreal", text: "L'oréal" },
        { value: "marcelle", key: "marcelle", text: "Marcelle" },
        { value: "clinique", key: "clinique", text: "Clinique" },
        { value: "maybelline", key: "maybelline", text: "Maybelline" },
        { value: "annabelle", key: "annabelle", text: "Annabelle" },
        { value: "almay", key: "almay", text: "Almay" },
        { value: "covergirl", key: "covergirl", text: "Covergirl" },
        { value: "revlon", key: "revlon", text: "Revlon" }


    ]
    //Quelques types de produit suggérés par l'API
    const optionsType = [
        { value: "mascara", key: "mascara", text: "Mascara" },
        { value: "bronzer", key: "bronzer", text: "Bronzer" },
        { value: "eyeliner", key: "eyeliner", text: "Eyeliner" },
        { value: "lipstick", key: "lipstick", text: "Lipstick" },
        { value: "blush", key: "blush", text: "Blush" },
        { value: "eyebrow", key: "eyebrow", text: "Eyebrow" }


    ]
    //Quelques Tags suggérés par l'API
    const optionsTags = [
        { value: "vegan", key: "vegan", text: "vegan" },
        { value: "organic", key: "organic", text: "organic" },
        { value: "ecoCert", key: "ecoCert", text: "EcoCert" },
        { value: "canadian", key: "canadian", text: "Canadian" },
        { value: "hypoallergenic", key: "hypoallergenic", text: "Hypoallergenic" },
        { value: "natural", key: "natural", text: "Natural" }


    ]
    //La liste des prix probables
    const optionsPrices = [
        { value: 5, key: "5", text: "5" },
        { value: 10, key: "10", text: "10" },
        { value: 15, key: "15", text: "15" },
        { value: 20, key: "20", text: "20" },
        { value: 25, key: "25", text: "25" },
        { value: 30, key: "30", text: "30" },
        { value: 35, key: "35", text: "35" },
        { value: 40, key: "40", text: "40" },
        { value: 45, key: "45", text: "45" }


    ]
//Quelques catégories des produits suggérées par l'API
    const optionsCategories = [
        { value: "liquid", key: "liquid", text: "Liquid" },
        { value: "gel", key: "gel", text: "Gel" },
        { value: "cream", key: "cream", text: "Cream" },
        { value: "pencil", key: "pencil", text: "Pencil" },
        { value: "powder", key: "powder", text: "Powder" },
        { value: "concealer", key: "Concealer", text: "Concealer" },
        { value: "highlighter", key: "highlighte", text: "Highlighter" },
        { value: "palette", key: "palette", text: "Palette" },
    ]

    const reset=()=> {
        setBrand("");
        setType("");
        setCategory("");
        setTag("");
        setPrice("");
        setGreatherPrice("");
        

    }

    // Plusieurs appel de l'API avec  fetch et axios pour recupérer des données 
    const appelApi = () => {
        if (brand) {
            fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${type}`)
                .then((response) => response.json())
                .then((data) => setProduit(data))
                .catch((erreur) => console.log(erreur));

        } else if (tag) {
            fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${tag}`)
                .then((response) => response.json())
                .then((data) => setProduit(data))
                .catch((erreur) => console.log(erreur));
        }
        else if (type) {
            fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`)
                .then((response) => response.json())
                .then((data) => setProduit(data))
                .catch((erreur) => console.log(erreur));
        } else if (price) {
            axios
                .get(`http://makeup-api.herokuapp.com/api/v1/products.json?price_less_than=${greatherPrice}&price_greater_than=${price}`)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    setProduit(data);
                });
        }
        else if (category) {
            axios
                .get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_category=${category}`)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    setProduit(data);
                });
        }
        else {
            alert("Veuillez faire un choix de recherche");
        }
    }
    // cette fonction retourche un affichage de type Card avec toutes les spécifications de l'item choisi
    const renderProduit = () => {
        return produit.map((item) => {
            return (
                <Card key={item.id} >
                    <Image src={item.image_link} />
                    <CardContent >
                        <CardHeader>
                            <Link to={`/produit/${item.id} ${item.brand} ${item.product_type} `}> {item.name}<br /> {item.brand} </Link>
                        </CardHeader>
                    </CardContent>
                </Card>

            )
        })
    }

    console.log(produit);
    return (
        <Container align="center">
            <h1 color="black">Chercher vos produits / marques préférés </h1>
            <Label as='a' color='violet' image>
                <img src='https://www.logolynx.com/images/logolynx/2d/2df46e3a2fa89f974f745fe3c998f374.jpeg' />
                Marque :
            </Label>
            <Select placeholder='Select your brand' options={optionsBrand} value={brand} onChange={(e, data) => setBrand(data.value)}  /><br /><br />
            <Label as='a' color='violet' image>
                <img src='https://www.fashionsfever.com/wp-content/uploads/2021/11/different-type-makeup-products-black-backdrop.jpg' />
                Type du Produit :
            </Label>
            <Select placeholder='Select your Product Type' options={optionsType} value={type} onChange={(e, data) => setType(data.value)} /><br /><br />
            <Label as='a' color='violet' image>
                <img src='https://i.pinimg.com/originals/d9/04/84/d90484563ca52bda82e4ce2933f07d99.gif' />
                Catégorie du Produit :
            </Label>
            <Select placeholder='Select your Product category' options={optionsCategories} value={category} onChange={(e, data) => setCategory(data.value)} /><br /><br />
            <Label as='a' color='violet' image>
                <img src='https://previews.123rf.com/images/paullynn/paullynn1803/paullynn180300168/98790668-natural-cosmetic-makeup-organic-skincare-serum-product-packaging-with-leaves-herb-on-nature-beauty-c.jpg' />
                Tag :
            </Label>
            <Select placeholder='Select the TAG' options={optionsTags} value={tag} onChange={(e, data) => setTag(data.value)} /><br /><br />
            <Label as='a' color='violet' image>
                <img src='http://cdn.onlinewebfonts.com/svg/img_28562.png' />
                Prix minimal :
            </Label>
            <Select placeholder='Select your Product Type' options={optionsPrices} value={price} onChange={(e, data) => setPrice(data.value)} />
            <Label as='a' color='violet' image>
                <img src='http://cdn.onlinewebfonts.com/svg/img_28562.png' />
                Prix maximal :
            </Label>
            <Select placeholder='Select your Product Type' options={optionsPrices} value={greatherPrice} onChange={(e, data) => setGreatherPrice(data.value)} /><br />  <br />

            <div>
                <Button inverted color='black' animated onClick={appelApi}>
                    <Button.Content visible >Rechercher</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>

                <Button inverted color='black' animated onClick={reset}>
                    <Button.Content visible >Réinitialiser</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>

            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                {produit.length > 0 ? renderProduit() : undefined}
            </div>

        </Container>
    )
};

export default Recherche;