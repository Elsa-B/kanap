//             Lien entre la page d'accueil et les produits
/*Mise en place d'une nouvelle URL. Utilisation de window pour récupérer la page courante.
On accède aux arguments. Ensuite, création d'une nouvelle URL avec l'id.*/
const newUrl = window.location.search;
const urlParams = new URLSearchParams(newUrl);
const id = urlParams.get('id');
const urlProduct = `http://localhost:3000/api/products/${id}`;

/*             Stockage des variables d'affichage produit
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

/*Je fais appel à fetch pour exécuter l'URL de la page produit.
Première promesse, qui récupére la réponse en json. Deuxième promesse pour l'affichage des produits.
Message d'erreur si le serveur ne répond pas*/
fetch (urlProduct)
    .then ((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then (product)
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
    //Insertion de l'option. Utilisation d'une boucle
    for(let i=0; i<article.colors.length; i++){
        const option = document.createElement("option");
        option.innerText = article.colors[i];
        color.appendChild(option);
    };  
};
//Variable de conversion des données du format JSON au format Javascript et récupération des données
let productInBasket = JSON.parse(localStorage.getItem("basket"));
//Fonction de confirmation d'ajout du produit
const confirm = () => {
    alert ("Le produit a été ajouté au panier");
};
/*           Récupération de la sélection de l'utilisateur et envoie dans le panier.
Ecoute de la variable "check" au moment du clic de l'utilisateur. Demande de non-exécution de l'évenement.
Objet de récupération de la sélection utilisateur avec l'ID, la quantité et la couleur.
Utilisation des conditions. Si, la couleur est true entre les "" et la quantité est >0 et <=100, alors,si 
il y a des pdts dans le panier, utilisation de find qui renvoie la première valeur d'un élément dans un array.
Si, le pdt existe déjà dans l'array, alors calcul pour ajouter les quantités dans l'array.
Et envoie pour mise à jour dans le LS, message confirmation.
Sinon, s'il n'y en a pas ajout des produits dans le tableau+message confirmation. S'il n'y a aucun produit
dans le localStorage, création d'un tableau, envoie dans le LS et message confirmation. Sinon, message d'alerte*/
function sendInBasket(){
    check.addEventListener("click",(e)=>{
        e.preventDefault();
        const choiceProduct =  {
            idStorage:id,
            quantiteStorage:choiceQuantite.value,
            couleurStorage:color.value,
        };
        console.log(choiceProduct);
        //Fonction de stockage
        let eltLocalStorage= () =>{
            //Ajout des éléments dans le tableau avec push
            productInBasket.push(choiceProduct);
            //Stockage des données et conversion de celles-ci, du format javaScript au format JSON
            localStorage.setItem("basket", JSON.stringify(productInBasket)); 
        }
        if(choiceProduct.couleurStorage !== "" && choiceProduct.quantiteStorage > 0 && choiceProduct.quantiteStorage <= 100){
            if(productInBasket){
                const productOrdered = productInBasket.find(element => element.idStorage === id && element.couleurStorage === color.value)
                if(productOrdered){
                    let newQuantity = parseInt(choiceProduct.quantiteStorage) + parseInt(productOrdered.quantiteStorage);
                    productOrdered.quantiteStorage = newQuantity;
                    localStorage.setItem("basket", JSON.stringify(productInBasket));
                    confirm();
                }else{
                    eltLocalStorage();
                    confirm();
                }
            }else{
                productInBasket = [];
                eltLocalStorage();
                confirm();
            }
        }else{alert("Veuillez choisir une couleur ou saisir une quantité")}
    });
};
sendInBasket();