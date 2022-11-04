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
            
            /*Contenu à créer
            Insertion du lien hypertexte*/
            const lienElement = document.createElement("a");
            cardItems.appendChild(lienElement);
            lienElement.href = `product.html?id=${product._id}`;

            //Insertion de l'article
            const articleElement = document.createElement("article");
            lienElement.appendChild(articleElement);

            //Insertion de l'image
            const imgElement = document.createElement("img");
            articleElement.appendChild(imgElement);
            imgElement.src = product.imageUrl;
            imgElement.alt = product.altTxt;

            //Insertion du nom du produit
            const titleElement = document.createElement("h3");
            articleElement.appendChild(titleElement);
            titleElement.innerText = product.name;

            //Insertion de la description
            const pElement = document.createElement("p");
            articleElement.appendChild(pElement);
            pElement.innerText = product.description;   
        }
    }
    //Fonction de message d'erreur
    function error(e){
        alert("Le serveur ne répond pas !!!");
    }
    