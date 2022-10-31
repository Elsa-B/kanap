//Lien entre la page d'accueil et les produits

/*Mise en place d'une nouvelle URL.
Utilisation de window pour récupérer la page courante*/
const paramPage = new URLSearchParams(window.location.href);
//Création de l'id de la nouvelle URL
const id = paramPage.get("id")

 console.log(paramPage)
