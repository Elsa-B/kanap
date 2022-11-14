let productInBasket = JSON.parse(localStorage.getItem("basket"));
console.log(productInBasket);


/*         Stockage des variables d'affichage du tableau
Récupération de l'id de section*/
const section = document.querySelector("#cart__items");
//Insertion de l'article
const articleSection = document.createElement("article");
//Insertion d'une div
const divImage = document.createElement("div");
//Insertion de l'image
const imageSection = document.createElement("img");
//Insertion d'une div
const divContent = document.createElement("div");
//Insertion d'une div
const divDescription = document.createElement("div");
//Insertion du titre
const titleSection = document.createElement("h2");
//Insertion de la couleur
const colorSection = document.createElement("p");
//Insertion du prix
const priceSection = document.createElement("p");
//Insertion d'une div
const settingsSection = document.createElement("div");
//Insertion d'une div
const divQuantitySection = document.createElement("div");
//Insertion de la quantité
const quantitySection = document.createElement("p");
//Insertion d'un bouton
const inputSection = document.createElement("input");
//Insertion d'une div
const settingsDelete = document.createElement("div");
//Insertion du bouton de suppression
const deleteInput = document.createElement("p");

//Fonction de création de la structure 
function displayProductInBasket(){
    for(i=0; i<productInBasket.length;i++){
        //Insertion de l'article
        section.appendChild(articleSection);
        articleSection.className = "cart__item";
        //Insertion d'une div
        articleSection.appendChild(divImage);
        divImage.className = "cart__item__img";
        //Insertion de l'image
        divImage.appendChild(imageSection);
        imageSection.src = productInBasket[i].image;
        imageSection.alt = productInBasket[i].color;
        //Insertion d'une div
        articleSection.appendChild(divContent);
        divContent.className = "cart__item__content";
        //Insertion d'une div
        divContent.appendChild(divDescription);
        divDescription.className = "cart__item__content__description";
        //Insertion du titre
        divDescription.appendChild(titleSection);
        titleSection.innerText = productInBasket[i].name;
        //Insertion de la couleur
        divDescription.appendChild(colorSection);
        colorSection.innerText = productInBasket[i].couleurStorage;
        //Insertion du prix
        divDescription.appendChild(priceSection);
        priceSection.innerText = productInBasket[i].description;
        //Insertion d'une div
        divContent.appendChild(settingsSection);
        settingsSection.className = "cart__item__content__settings";
        //Insertion d'une div
        settingsSection.appendChild(divQuantitySection);
        divQuantitySection.className = "cart__item__content__settings__quantity";
        //Insertion de la quantité
        divQuantitySection.appendChild(quantitySection);
        quantitySection.innerText = "Qté :";
        //Insertion d'un bouton
        divQuantitySection.appendChild(inputSection);
        inputSection.setAttribute("type","number");
        inputSection.className = "itemQuantity";
        inputSection.setAttribute("name","itemQuantity");
        inputSection.setAttribute("min","1");
        inputSection.setAttribute("max","100");
        inputSection.value = productInBasket[i].quantiteStorage;
        //Insertion d'une div
        settingsSection.appendChild(settingsDelete);
        settingsDelete.className = "cart__item__content__settings__delete";
        //Insertion du bouton de suppression
        settingsDelete.appendChild(deleteInput);
        deleteInput.className = "deleteItem";
        deleteInput.innerText = "Supprimer";
    }
}

if(productInBasket == null || productInBasket == 0){
    productInBasket = [];
    console.log(productInBasket);
}else{
    displayProductInBasket();
}


