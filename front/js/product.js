//Lien entre la page d'accueil et les produits

/*Mise en place d'une nouvelle URL.
Utilisation de window pour récupérer la page courante*/
const newUrl = window.location.search;
//Création d'une nouvelle URL
const urlParams = new URLSearchParams(newUrl);
//Création de l'id de la nouvelle URL
const id = urlParams.get('id');
const urlProduct = `http://localhost:3000/api/products/${id}`;

/*Variables pour l'affichage de mes produits*/
const imageProduct = document.getElementsByClassName("item__img");
const titleProduct = document.getElementById("title");
const pricePoduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");


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
        imageProduct.innerHTML = article.imageUrl, article.altTxt;
        titleProduct.innerHTML = article.name;
        pricePoduct.innerHTML = article.price;
        descriptionProduct.innerHTML= article.description;
    }