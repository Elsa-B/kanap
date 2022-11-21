let productInBasket = JSON.parse(localStorage.getItem("basket"));


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
    totalQuantities(quantity);
    totalPrice(price); 
    })   
}



//Fonctions de messages
const confirm = () => {
    alert ("Le produit a été supprimé");
};
function message (){
    alert("Le panier a été modifié");
}
//Fonction de la quantité total
/*Pour la qt totale, il faut sélectionner l'ID dans html. Utilisation de parseInt pour convertir un argument
en une chaîne de caractère. Calcul totalqt=totalqt+quantitysum. Envoie du calcul avec inner.text*/
let totalquantity =0;
function totalQuantities(quantity){
    const elementQuantity = document.getElementById("#totalQuantity");
    const quantitysum =  parseInt(product.quantiteStorage);
    totalquantity +=quantitysum;
    elementQuantity.innerText(totalquantity);
}
//Fonction du prix total
/*Pour le prix total, il faut sélectionner l'ID dans html. Il faut réaliser le calcul de la qt*prix.
Insérer le prix dans le total avec inner.text*/
const elementPrice = document.getElementById("#totalPrice");
function totalPrice(price){
    let priceOfProduct = product.quantiteStorage * data.price;
    price += priceOfProduct;
    elementPrice.innerText(totalPrice);
}

//Modification des produits de la page panier
/*Pour modifier la qt, il faut sélectionner le btn. Au clic, il doit y avoir un chgmnt de qt. Pas de redirection.
La modification doit pouvoir se faire sur tous les pdts du LS. Utilisation d'une boucle. 
Comme le pdt est dans le LS, il faut modifier le modifier*/
function modificationElement (modifications){
    //Sélection de la classe du code html
    const inputModification = document.querySelectorAll(".itemQuantity");
    //Boucle pour répéter l'action
    for(const quantityModification of modifications)
    //Au moment du changement des produits
    inputModification.addEventListener("change",(m)=>{
        //Ne pas écouter l'évènement
        m.preventDefault();
        //Modification du localStorage
        localStorage.setItem("basket", JSON.stringify(productInBasket));
        message ();
    })
}
//Suppression des produits de la page panier
/*Pour supprimer le pdt, il faut sélectionner le bouton. Le navigateur va écouter au clic la suppression
du pdt. Le clic ne doit pas rediriger vers une page. Comme le pdt est dans le LS, il faut sélectionner l'ID et la couleur
. Il faut ensuite filtrer et envoyer les nouvelles données au LS. Pour finir, message d'alerte*/
function deleteElement(inputDelete){
    //Sélection de la classe du code html
    const deleteItem = document.querySelector(".deleteItem");
    //Boucle pour répéter l'action
    for (const deleteProduct of inputDelete)
    //Au clic de la souris sur le bouton
    deleteItem.addEventListener("click",(d)=>{
        //Ne pas écouter l'évènement
        d.preventDefault();
        //Sélection des suppressions
        const selectionProduct = product.idStorage && product.couleurStorage;
        //Filtration des éléments
        const filterProduct = productInBasket.filter (el =>el.idStorage != el.selectionProduct);
        //Modification du localStorage
        localStorage.setItem("basket", JSON.stringify(productInBasket));
        confirm();
    })
}

//Confirmation de la commande
/*L'utilisateur rempli le form dans les champs. Si le champs est mal renseigné alors message d'alerte, sinon true.
Utiliser des variables regex pour les différents champs. Sélectionner l'id de chaque champs à compléter.
Lorsque le champs est correctement compléter, il faut envoyer le form et les pdts dans le LS. Utilisation
d'une requête et créer un array de contact et de pdts. Prévoir un envoie vers la page confirmation*/
const regexText = /^[a-z][A-Z][éèàëêïöô]{1,20}$/;
const regexAdress = /^[a-z][A-Z][éèàëêïöô]{1,50}$/;
const regexMail = /"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"/;
const formContact = {
    firstName:document.getElementById("firstName").value,
    lastName:document.getElementById("lastName").value,
    address:document.getElementById("address").value,
    city:document.getElementById("city").value,
    mail:document.getElementById("email").value,
}