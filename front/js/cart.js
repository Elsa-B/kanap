let productInBasket = JSON.parse(localStorage.getItem("basket"));

//Boucle de création de la structure 
for(let product of productInBasket){
    fetch (`http://localhost:3000/api/products/${product.idStorage}`)
    .then((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then (data =>{
    const section = document.querySelector("#cart__items");
    //Insertion de l'article
    const articleSection = document.createElement("article");
    section.appendChild(articleSection);
    articleSection.className = "cart__item";
    //Insertion d'une div
    const divImage = document.createElement("div");
    articleSection.appendChild(divImage);
    divImage.className = "cart__item__img";
    //Insertion de l'image
    const imageSection = document.createElement("img");
    divImage.appendChild(imageSection);
    imageSection.src = data.imageUrl;
    imageSection.alt = data.altTxt;
    //Insertion d'une div
    const divDescription = document.createElement("div");
    const divContent = document.createElement("div");
    articleSection.appendChild(divContent);
    divContent.className = "cart__item__content";
    //Insertion d'une div
    divContent.appendChild(divDescription);
    divDescription.className = "cart__item__content__description";
    //Insertion du titre
    const titleSection = document.createElement("h2");
    divDescription.appendChild(titleSection);
    titleSection.innerText = data.name;
    //Insertion de la couleur
    const colorSection = document.createElement("p");
    divDescription.appendChild(colorSection);
    colorSection.innerText = product.couleurStorage;
    //Insertion du prix
    const priceSection = document.createElement("p");
    divDescription.appendChild(priceSection);
    priceSection.innerText = data.price +'€';
    //Insertion d'une div
    const settingsSection = document.createElement("div");
    divContent.appendChild(settingsSection);
    settingsSection.className = "cart__item__content__settings";
    //Insertion d'une div
    const divQuantitySection = document.createElement("div");
    settingsSection.appendChild(divQuantitySection);
    divQuantitySection.className = "cart__item__content__settings__quantity";
    //Insertion de la quantité
    const quantitySection = document.createElement("p");
    divQuantitySection.appendChild(quantitySection);
    quantitySection.innerText = "Qté :";
    //Insertion d'un bouton
    const inputSection = document.createElement("input");
    divQuantitySection.appendChild(inputSection);
    inputSection.setAttribute("type","number");
    inputSection.className = "itemQuantity";
    inputSection.setAttribute("name","itemQuantity");
    inputSection.setAttribute("min","1");
    inputSection.setAttribute("max","100");
    inputSection.value = product.quantiteStorage;
    //Insertion d'une div
    const settingsDelete = document.createElement("div");
    settingsSection.appendChild(settingsDelete);
    settingsDelete.className = "cart__item__content__settings__delete";
    //Insertion du bouton de suppression
    const deleteInput = document.createElement("p");
    settingsDelete.appendChild(deleteInput);
    deleteInput.className = "deleteItem";
    deleteInput.innerText = "Supprimer";
    }) 
//Prix total
const quantityTotal = document.querySelector("#totalQuantity");
const priceTotal = document.querySelector("#totalPrice");

//Quantité totale
const quantityOfProducts = parseInt(product.quantiteStorage);
const totalPriceProduct = quantityOfProducts * data.price;
console.log(quantityOfProducts);
console.log(totalPriceProduct);
}











//Modification des produits de la page panier

//Suppression des produits de la page panier
/*Confirmation de la commande
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const mail = document.getElementById("email");
const regexText = /^[a-z][A-Z][éèàëêïöô]{1,20}$/;
const regexAdress = /^[a-z][A-Z][éèàëêïöô]{1,50}$/;
const regexMail = /^[a-z A-Z 0-9]\.+@[a-z A-Z 0-9\.]$/;*/