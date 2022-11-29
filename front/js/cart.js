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
    //Utilisation de la fonction quantité total
    totalQuantities(product.quantiteStorage);
    //Utilisation de la fonction prix total
    incrementationTotalPrice(product.quantiteStorage,data.price); 
    })
    inputModification();
}
/*Fonction et variables de la quantité total
Pour la qt total, il faut sélectionner l'ID dans html. Utilisation de parseInt pour convertir un argument
en une chaîne de caractère. Calcul totalqt=totalqt+quantitysum. Envoie du calcul avec inner.text*/
const elementQuantity = document.getElementById("totalQuantity");
let totalquantity =0;
function totalQuantities(quantity){
    const quantitysum =  parseInt(quantity);
    totalquantity +=quantitysum;
    elementQuantity.innerText = totalquantity;
}
/*Fonction et varirables du prix total
Pour le prix total, il faut sélectionner l'ID dans html. Il faut réaliser le calcul de la qt*prix.
Ensuite calcul totalPrice=tatalPrice*priceOfProduct. Insérer le prix dans le total avec inner.text*/
let elementPrice = document.getElementById("totalPrice");
let totalPrice = 0;
function incrementationTotalPrice(qty,price){
    let priceOfProduct = qty * price;
    totalPrice += priceOfProduct;
    elementPrice.innerText = totalPrice;
}
//Fonctions de messages
const confirm = () => {
    alert ("Le produit a été supprimé");
};
function message (){
    alert("Le panier a été modifié");
}
//Modification des produits de la page panier
/*Pour modifier la qt, il faut sélectionner la class du code html. La modif doit pouvoir se faire sur chaque pdt.
Pour modifier la qt, il faut écouter l'évènement, qui est un chgmt. Il ne doit pas y avoir de renvoie vers une page.
Il faut ensuite sélectionner l'élément qui va être modifier. Utilisation de find pour trouver le pdt dans le ls.
Envoie des modifs dans le LS.*/
function inputModification(){
    const elementModification = document.querySelectorAll(".itemQuantity");
    for(const modification of elementModification){
        modification.addEventListener("change",(ev)=>{
            ev.preventDefault();
            let selectionModification = modification.closest("article");
            let selectProductInBasket = productInBasket.find(element => element.idStorage==selectionModification.idStorage);
            localStorage.setItem("basket", JSON.stringify(selectProductInBasket));
            message();
        })
    }
};
//Suppression des produits de la page panier
const input = document.querySelector(".deleteItem");
function deleteElement(){
    //Au clic sur le bouton
    input.addEventListener("click",(e)=>{
    e.preventDefault();
    //Sélection du produit qui a été cliqué
    //Remonter à l'élément que l'on veut
    //Retirer le produit du panier
    productInBasket = productInBasket.filter(elt => elt.idStorage !==articleElement.dataset.id || elt.couleurStorage !== articleElement.dataset.color);
    console.log(productInBasket);
    //Mise à jour du localStorage
    localStorage.setItem('basket',JSON.stringify(productInBasket));
    confirm()
    })
};

//Confirmation de la commande
//Expressions 
const regexText = /^[A-Z][A-Za-z-]+$/;
const regexAdress = /^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
const regexMail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//Variables
let contact = {
    firstName:document.getElementById("firstName").value,
    lastName:document.getElementById("lastName").value,
    address:document.getElementById("address").value,
    city:document.getElementById("city").value,
    email:document.getElementById("email").value,
}
//Validation du prénom
function inputFirstName(){ 
    //Si le test du regex est vrai, alors retourner vrai, sinon, message d'erreur et retourner faux
    if(!regexText.test(contact.firstName)){
        document.getElementById("firstNameErrorMsg").innerText="Merci de renseigner le champ";
    }
    return regexText.test(contact.firstName);
}
//Validation du nom
function inputLastName(){ 
    //Si le test du regex est vrai, alors retourner vrai, sinon, message d'erreur et retourner faux
    if(!regexText.test(contact.lastName)){
        document.getElementById("lastNameErrorMsg").innerText="Merci de renseigner le champ";
    }
    return regexText.test(contact.lastName);

}
//Validation de l'adresse
function inputAddress(){
    //Si le test du regex est vrai, alors retourner vrai, sinon, message d'erreur et retourner faux
    if(!regexAdress.test(contact.address)){
        document.getElementById("addressErrorMsg").innerText="Merci de renseigner le champ";
    }
    return regexText.test(contact.address);
}
//Validation de la ville
function inputCity(){
    //Si le test du regex est vrai, alors retourner vrai, sinon, message d'erreur et retourner faux
    if(!regexAdress.test(contact.city)){
        document.getElementById("cityErrorMsg").innerText="Merci de renseigner le champ";
    }
    return regexText.test(contact.city);
}
//Validation de l'e-mail
function inputMail(){
    //Si le test du regex est vrai, alors retourner vrai, sinon, message d'erreur et retourner faux
    if(!regexMail.test(contact.email)){
        document.getElementById("emailErrorMsg").innerText="Merci de renseigner le champ";
    }
    return regexText.test(contact.email);
}
//Fonctions du formulaire
function allForm (){
    inputFirstName();
    inputLastName();
    inputAddress();
    inputCity();
    inputMail();
}
allForm ();
//Fonction d'envoie du contact dans le localStorage
function validateForm(){
    if(inputFirstName() && inputLastName() && inputAddress() && inputCity() && inputMail()==false){
        alert("Veuillez renseigner les champs de saisie");
        localStorage.setItem("contact", json.stringify(productInBasket))
    }else{
        return true;
    }
}
//Fonction d'envoie du formulaire

    const elementOrder = document.getElementById("order");
    //Ecoute de la variable elementOrder au clic de l'utilisateur
    elementOrder.addEventListener("click",(ev)=>{
        //Non-éxecution de l'évènement
        ev.preventDefault();
        let products=[];
        //Boucle pour récupérer les produits du LS
        for(let i=0; i<productInBasket.length; i++){
            products.push(productInBasket[i].idStorage);
        }
        //Récupération du formulaire de contact
        const ordered = {contact, products,}
        console.log(ordered);
        //Envoie du formulaire et les produits au serveur
        const options = {
            method:'POST',
            body: JSON.stringify(ordered),
            headers: { 
                "Content-Type": 'application/json',
            }
        };
        console.log(options);
        //Fetch pour aller sur la page confirmation
        fetch(`http://localhost:3000/api/products/order`, options)
        .then((response)=>response.json())
        .then((data)=>{
            
            localStorage.setItem("orderId", data.orderId);
            document.location.href =`confirmation.html?orderId=`+ data.orderId;
            console.log(data);
        });
        //.catch(localStorage.clear());
    });
