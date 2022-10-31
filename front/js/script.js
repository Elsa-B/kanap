//Je fais appel à fetch pour l'URL de l'API
fetch ("http://localhost:3000/api/products")
    //Première promesse, qui récupére la réponse en json
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    //Deuxième promesse avec ma fonction de contenu
    .then(function allarticles (article){
        //Boucle for avec la variable "products" de l'argument "article"
        for (const products of article){
            //Récupération des informations de l'id "items"
            let cardItems = document.getElementById("items");
            //Contenu à modifier
            cardItems.innerHTML +=`
            <a href="./product.html?id=${products._id}">
            <article>
              <img src="${products.imageUrl}" alt="${products.altTxt}">
              <h3 class="productName">${products.name}</h3>
              <p class="productDescription">${products.description}</p>
            </article>
          </a>
        `;
        }
    })
    //Message d'erreur si le serveur ne répond pas
    .catch(function(error){
        alert("Le serveur ne répond pas !!!");
    })