/*Je fais appel à fetch pour exécuter l'URL de l'API.
Première promesse, qui récupére la réponse en json.
Deuxième promesse avec ma fonction de contenu. Message d'erreur si le serveur ne répond pas.*/
fetch ("http://localhost:3000/api/products")
    .then(reponse)
    .then(affichageArticles)
    .catch(error)
    /*              Fonctions
    Fonction pour récupérer la réponse en json*/
    function reponse(res){
        if(res.ok){
            return res.json();
        };
    };
    /*Fonction d'affichage des articles. Utilisation d'une boucle pour récupérer chaque produit.
    Récupération des informations de l'id "items". Insertion des éléments à créer.*/
    function affichageArticles(articles){
        for (const product of articles){
            let cardItems = document.getElementById("items");
            //Insertion du lien hypertexte
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
        };
    };
    //Fonction de message d'erreur
    function error(e){
        alert("Le serveur ne répond pas !!!");
    };