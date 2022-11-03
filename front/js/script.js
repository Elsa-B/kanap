//Je fais appel à fetch pour l'URL de l'API
fetch ("http://localhost:3000/api/products")
    //Première promesse, qui récupére la réponse en json
    .then(reponse)
    //Deuxième promesse avec ma fonction de contenu
    .then(affichageArticles)
    //Message d'erreur si le serveur ne répond pas
    .catch(error)

    /*              Fonctions
    Fonction pour récupérer la réponse en json*/
    function reponse(res){
        if(res.ok){
            return res.json();
        }
    }
    //Fonction d'affichage des articles
    function affichageArticles(articles){
        //Boucle for avec la variable "product" de l'argument "articles"
        for (const product of articles){
            //Récupération des informations de l'id "items"
            let cardItems = document.getElementById("items");
            //Contenu à modifier
            const lienElement = document.createElement("a")
            const articleElement = document.createElement("article")
            const imgElement = document.createElement("img")
            const titleElement = document.createElement("h3")
            const pElement = document.createElement("p")

            cardItems.appendChild(lienElement)
            lienElement.appendChild(articleElement)
            articleElement.appendChild(imgElement)
            articleElement.appendChild(titleElement)
            articleElement.appendChild(pElement)

            imgElement.src = product.imageUrl
            imgElement.alt = product.altTxt
            titleElement.h3 = product.name
            
        }
    }
    //Fonction de message d'erreur
    function error(e){
        alert("Le serveur ne répond pas !!!");
    }
    