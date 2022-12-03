//                Lien entre la page d'accueil et les produits
/*Mise en place d'une nouvelle URL.
Utilisation de window pour récupérer la page courante*/
const newUrl = window.location.search;
//Création d'une nouvelle URL
const urlParams = new URLSearchParams(newUrl);
//Création de l'id de la nouvelle URL
const id = urlParams.get('id');
const urlProduct = `http://localhost:3000/api/products/${id}`;

/*                 Stockage des variables d'affichage produit
Variable de l'image*/
const image = document.querySelector(".item__img");
const imageProduct = document.createElement("img");
//Variable du nom du produit
const titleProduct = document.getElementById("title");
//Variable du prix
const pricePoduct = document.getElementById("price");
//Variable de la description
const descriptionProduct = document.getElementById("description");
//Variable de l'option
const color = document.getElementById("colors");
//Variable de la quantité
const choiceQuantite = document.getElementById("quantity");
//Variable du bouton "Ajouter au panier"
const check = document.getElementById("addToCart");

//Je fais appel à fetch pour l'URL de la page produit
fetch (urlProduct)
/*Première promesse, qui récupére la réponse en json*/
    .then ((res) => {
        if(res.ok){
            return res.json();
        }
    })
    //Deuxième promesse pour l'affichage des produits
    .then (product)
    //Message d'erreur si le serveur ne répond pas
    .catch((error) =>{
        alert("Le serveur ne répond pas !!!");
    })

//Utilisation d'une fonction pour l'insertion des éléments du produit
function product (article){
    //Insertion des images
    imageProduct.src = article.imageUrl;
    imageProduct.alt = article.altTxt;
    image.appendChild(imageProduct);
    //Insertion du nom
    titleProduct.innerText = article.name;
    //Insertion du prix
    pricePoduct.innerText = article.price;
    //Insertion de la description
    descriptionProduct.innerText= article.description;
    /*Insertion de l'option
    Utilisation d'une boucle*/
    for(let i=0; i<article.colors.length; i++){
        const option = document.createElement("option");
        option.innerText = article.colors[i];
        color.appendChild(option);
    }   
}
//Conversion des données du format JSON au format Javascript
let productInBasket = JSON.parse(localStorage.getItem("basket"));
//Variable de confirmation d'ajout du produit
const confirm = () => {
    alert ("Le produit a été ajouté au panier");
};

/*                 Ajout des produits dans le panier
Récupération de la sélection de l'utilisateur et envoie dans le panier.
Ecoute de la variable "check" au moment du clic de l'utilisateur*/
function sendInBasket(){
    check.addEventListener("click",(e)=>{
        //Demande de non-exécution de l'évenement
        e.preventDefault();
        //Récupération de la sélection utilisateur avec l'ID, la quantité et la couleur
        const choiceProduct =  {
            idStorage:id,
            quantiteStorage:choiceQuantite.value,
            couleurStorage:color.value,
        };
        console.log(choiceProduct);
        //Variables de stockage
        let eltLocalStorage= () =>{
            //Ajout des éléments dans le tableau avec push
            productInBasket.push(choiceProduct);
            //Conversion des données du format javaScript au format JSON
            localStorage.setItem("basket", JSON.stringify(productInBasket)); 
        }
        /*Utilisation des conditions
        Si on ajoute un produit au panier*/
        if(productInBasket){
            // Utilisation de find qui renvoie la première valeur d'un élément dans un array
            const productOrdered = productInBasket.find(element => element.idStorage === id && element.couleurStorage === color.value)
            //Si, la couleur =null ou =0 ou la quantité est <=0 ou >100, message d'alerte
            if(choiceProduct.couleurStorage===null || choiceProduct.couleurStorage===0 || choiceProduct.quantiteStorage<=0 || choiceProduct.quantiteStorage>100){
                alert("Veuillez choisir une couleur ou une quantité")
            }
            //Sinon si, celui-ci existe déjà dans l'array
            else if(productOrdered){
                //Calcul pour ajouter les quantités dans l'array
                let newQuantity = parseInt(choiceProduct.quantiteStorage) + parseInt(productOrdered.quantiteStorage);
                productOrdered.quantiteStorage = newQuantity;
                localStorage.setItem("basket", JSON.stringify(productInBasket));
                confirm();
            //Sinon, s'il n'y en a pas ajout d'une ligne
            }else{
                eltLocalStorage();
                confirm();
            }
        }
        //S'il n'y a aucun produit dans le localStorage
        else{
            //Création d'un tableau
            productInBasket = [];
            eltLocalStorage();
            confirm();
        }
    });
};
sendInBasket();