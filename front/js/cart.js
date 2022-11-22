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
/*Pour modifier la qt, il faut sélectionner la class du code html. La modification doit pouvoir se faire sur tous les pdts du LS. Utilisation d'une boucle.
Ecoute de la modification du panier. Pas de redirection. Comme le pdt est dans le LS, il faut le modifier*/
const inputModification = document.querySelectorAll(".itemQuantity");
function modificationElement (modifications){
    for(const quantityModification of modifications)
    //Au moment du changement des produits
    inputModification.addEventListener("change",(event)=>{
        //Ne pas écouter l'évènement
        event.preventDefault();
        //Modification du localStorage
        localStorage.setItem("basket", JSON.stringify(productInBasket));
        message ();
    })
}
//Suppression des produits de la page panier
/*Pour supprimer le pdt, sélection de la class dans le html. Ecoute de la fonction au clic. Pas de redirection.
Sélection de la suppression. Filtration des éléments pour le modification. Modification dans le LS.
Message de suppression*/
const input = document.querySelector(".deleteItem");
function deleteElement(inputDelete){
    inputDelete.addEventListener("click",(e)=>{
        e.preventDefault();
         
    })
        
}

//Confirmation de la commande
/*Sélection de l'id du code html. Lors du remplissage du champs, si celui-ci est bon, alors innertext"", sinon, message d'erreur.
Effectuer un test sur les champs de velidations.*/
//Expressions 
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
//Sélection des Regex
let elementForm = document.querySelector(".cart__order__form");
//Fonction de mise en place du formulaire
function creationForm(){
    inputFirstName();
    inputName();
    inputAddress();
    inputCity();
    inputMail();
}
//Validation du prénom
function inputFirstName(){
    let errorFirstName = inputFirstName.nextElementSibling;
    if(regexText.test(inputFirstName.value)){
        errorFirstName.innerText ="";
    }else{
        errorFirstName.innerText="Veuillez renseigner le champ";
    }
}
//Validation du nom
function inputName(){
    let errorName = inputName.nextElementSibling;
    if(regexText.test(inputName.value)){
        errorName.innerText ="";
    }else{
        errorName.innerText="Veuillez renseigner le champ";
    }
}
//Validation de l'adresse
function inputAddress(){
    let errorAddress = inputAddress.nextElementSibling;
    if(regexAdress.test(inputAddress.value)){
        errorAddress.innerText ="";
    }else{
        errorAddress.innerText="Veuillez renseigner le champ";
    }
}
//Validation de la ville
function inputCity(){
    let errorCity = inputCity.nextElementSibling;
    if(regexAdress.test(inputCity.value)){
        errorCity.innerText ="";
    }else{
        errorCity.innerText="Veuillez renseigner la ville";
    }
}
//Validation de l'e-mail
function inputMail(){
    let errorMail = inputMail.nextElementSibling;
    if(regexMail.test(inputMail.value)){
        errorMail.innerText ="";
    }else{
        errorMail.innerText="Veuillez renseigner le mail";
    }
}
//Fonction d'envoie du formulaire
function orderValidation(){
    const elementOrder = document.getElementById("order");
    elementOrder.addEventListener("click",(ev)=>{
        ev.preventDefault();
        formContact;
        for(const formArray of productInBasket){
            productInBasket.push(formArray.idStorage);
        }
        const sendForm = {
            method:"POST",
            body: JSON.stringify(formContact,formArray),
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json"
            }
        };
        fetch("http://localhost:3000/api/products/order", sendForm)
        .then(response=>response.json())
        .then(data=>{
            document.location.href="confirmation.html";
        });
    });
}