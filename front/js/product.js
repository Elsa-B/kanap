//Lien entre la page d'accueil et les produits

/*Mise en place d'une nouvelle URL.
Utilisation de window pour récupérer la page courante*/
const newUrl = window.location.search;
//Création d'une nouvelle URL
const urlParams = new URLSearchParams(newUrl);
//Création de l'id de la nouvelle URL
const id = urlParams.get('id');

/*Variables pour l'affichage de mes produits*/
const sectionProducts = document.getElementsByClassName("item");
const imageProducts = document.getElementsByClassName("item__img");
const titleProducts = document.getElementById("title");
const pricePoducts = document.getElementById("price");
const descriptionProducts = document.getElementById("description");


//Je fais appel à fetch pour l'URL de la page produit
fetch ("http://localhost:3000/api/products/",urlParams.get)
//Première promesse, qui récupére la réponse en json
    .then ((res) => {
        if(res.ok){
            return res.json();
        }
    })
    //Deuxième promesse pour l'affichage des produits
    .then (function allarticles (article){
        for (products of article)
        imageProducts.innerHTML =`<img src="${products.imageUrl}" alt="${products.altTxt}">`
        titleProducts.innerHTML =`${products.name}`
        pricePoducts.innerHTML =`${products.price}`
        descriptionProducts.innerHTML=`${products.description}`;  
    })
    //Message d'erreur si le serveur ne répond pas
    .catch(function(error){
        alert("Le serveur ne répond pas !!!");
    })
