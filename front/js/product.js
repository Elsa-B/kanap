//Lien entre la page d'accueil et les produits

/*Mise en place d'une nouvelle URL.
Utilisation de window pour récupérer la page courante*/
const newUrl = window.location.search;
//Création d'une nouvelle URL
const urlParams = new URLSearchParams(newUrl);
//Création de l'id de la nouvelle URL
const id = urlParams.get('id');
const urlProduct = `http://localhost:3000/api/products/${id}`;


/*Variables pour l'affichage de mes produits
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

/*Ajout des produits dans le panier*/
