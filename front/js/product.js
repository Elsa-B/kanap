//Lien entre la page d'accueil et les produits

/*Mise en place d'une nouvelle URL.
Utilisation de window pour récupérer la page courante*/
const newUrl = window.location.search;
//Création d'une nouvelle URL
const urlParams = new URLSearchParams(newUrl);
//Création de l'id de la nouvelle URL
const id = urlParams.get('id');


//Je fais appel à fetch pour l'URL de la page produit
fetch ("http://localhost:3000/api/products/",urlParams.get)
//Première promesse, qui récupére la réponse en json
    .then ((res) => {
        if(res.ok){
            return res.json();
        }
    })
    //Message d'erreur si le serveur ne répond pas
    .catch(function(error){
        alert("Le serveur ne répond pas !!!");
    })
