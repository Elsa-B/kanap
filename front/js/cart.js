let productInBasket = JSON.parse(localStorage.getItem("basket"));

displayProduct(productInBasket);

//Fonction d'affichage des produits
function displayProduct(productInBasket){
    //Boucle permettant d'afficher tous les produits du localStorage
    for(let product of productInBasket){
        //Appel de l'api pour récupération des éléments
        fetch (`http://localhost:3000/api/products/${product.idStorage}`)
        //Retour de la première promesse en json
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        //Deuxième promesse permettant l'affichage des informations des produits
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
    }
}

//Fonction de la quantité total
//Fonction du prix total
//const quantityOfProduct = product.quantiteStorage;
//Modification des produits de la page panier
//Suppression des produits de la page panier
function inputDelete(input){
    const deleteProduct = document.querySelector(".deleteItem");
    deleteProduct.addEventListener("click", () => {
        localStorage.clear();
    })
}
/*Confirmation de la commande
const regexText = /^[a-z][A-Z][éèàëêïöô]{1,20}$/;
const regexAdress = /^[a-z][A-Z][éèàëêïöô]{1,50}$/;
const regexMail = /^[a-z A-Z 0-9]\.+@[a-z A-Z 0-9\.]$/;
const formContact = {
    firstName:document.getElementById("firstName").value,
    lastName:document.getElementById("lastName").value,
    address:document.getElementById("address").value,
    city:document.getElementById("city").value,
    mail:document.getElementById("email").value,
}
function verificationFirstName()*/