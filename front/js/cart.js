let productInBasket = JSON.parse(localStorage.getItem("basket"));
function displayProductInBasket(productInBasket){
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
        articleSection.setAttribute("data-id",`${product.idStorage}`);
        articleSection.setAttribute("data-color",`${product.couleurStorage}`);
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
        inputSection.setAttribute("value",product.quantiteStorage) ;
        //Insertion d'une div
        const settingsDelete = document.createElement("div");
        settingsSection.appendChild(settingsDelete);
        settingsDelete.className = "cart__item__content__settings__delete";
        //Insertion du bouton de suppression
        const deleteInput = document.createElement("p");
        settingsDelete.appendChild(deleteInput);
        deleteInput.className = "deleteItem";
        deleteInput.innerText = "Supprimer";
        //Utilisation des fonctions quantité total, prix total, modification et suppression
        totalQuantities(product.quantiteStorage);
        incrementationTotalPrice(product.quantiteStorage,data.price);
        deleteElement();
        inputModification();
        });
    };
};
displayProductInBasket(productInBasket);
/*Fonction et variables de la quantité total
Sélection de l'ID dans html. Utilisation de parseInt pour convertir un argument
en une chaîne de caractère. Calcul totalqt=totalqt+quantitysum. Envoie du calcul avec inner.text*/
const elementQuantity = document.getElementById("totalQuantity");
let totalquantity =0;
function totalQuantities(quantity){
    const quantitysum =  parseInt(quantity);
    totalquantity +=quantitysum;
    elementQuantity.innerText = totalquantity;
}
/*Fonction et varirables du prix total
Sélection de l'ID dans html. Il faut réaliser le calcul de la qt*prix. Ensuite calcul 
totalPrice=tatalPrice*priceOfProduct. Insérer le prix dans le total avec inner.text*/
let elementPrice = document.getElementById("totalPrice");
let totalPrice = 0;
function incrementationTotalPrice(qty,price){
    let priceOfProduct = qty * price;
    totalPrice += priceOfProduct;
    elementPrice.innerText = totalPrice;
}
//Modification des produits de la page panier
function inputModification(){
    const elementModification = document.querySelectorAll(".itemQuantity");
    for(const modification of elementModification){
        //Au moment du changement de qt
        modification.addEventListener("change",(ev)=>{
            ev.preventDefault();
            //Cibler le pdt qui a été mofifié
            ev.target;
            //Remonter à l'élément que l'on veut
            let selectionModification = modification.closest("article");
            let selectModif = productInBasket.find(element => element.idStorage==selectionModification.dataset.id && element.couleurStorage === selectionModification.dataset.color);
            selectModif.quantiteStorage=modification.value;
            selectModif=productInBasket;
            //Mise à jour du localStorage+Mesage d'alerte + Mise à jour des totaux
            localStorage.setItem("basket", JSON.stringify(productInBasket));
            alert("Le produit a été modifié");
            location.reload();
        });
    };
};
//Suppression des produits de la page panier
function deleteElement(){
    let inputDelete = document.querySelectorAll(".deleteItem");
    for(const deletion of inputDelete){
        //Au clic sur le bouton
        deletion.addEventListener("click",(e)=>{
        e.preventDefault();
        //Cibler le pdt qui a été cliqué
        e.target;
        console.log(e.target);
        //Remonter à l'élément que l'on veut
        let elementArticle = deletion.closest('article');
        console.log(elementArticle);
        //Filtre des éléments du panier, pour garder ceux qui ne sont pas supprimé
        const searchDeleteItem = productInBasket.find(element => element.idStorage == elementArticle.dataset.id && element.couleurStorage == elementArticle.dataset.color);
        console.log(searchDeleteItem);
        productInBasket = productInBasket.filter(elt => elt !==searchDeleteItem);
        console.log(productInBasket = productInBasket.filter(elt => elt !==searchDeleteItem));
        //Mise à jour du localStorage
        localStorage.setItem('basket',JSON.stringify(productInBasket));
        //Supprime le pdt du html+Message d'alerte+Mise à jour des totaux
        elementArticle.remove();
        alert("Le produit a été supprimé")
        location.reload();
        });
    }
};
//                                     Confirmation de la commande
//Expressions 
const regexText = /^[A-Za-zàâäéèêëïîôöùûüç]+$/;
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
    //Si le test du regex est différent, alors message d'erreur
    if(!regexText.test(contact.firstName)){
        document.getElementById("firstNameErrorMsg").innerText="Merci de renseigner votre prénom";
    }return regexText.test(contact.firstName);
};
//Validation du nom
function inputLastName(){ 
    if(!regexText.test(contact.lastName)){
        document.getElementById("lastNameErrorMsg").innerText="Merci de renseigner votre nom";
    }return regexText.test(contact.lastName);

};
//Validation de l'adresse
function inputAddress(){
    if(!regexAdress.test(contact.address)){
        document.getElementById("addressErrorMsg").innerText="Merci de renseigner le numéro de voie et la rue";
    }return regexAdress.test(contact.address);
};
//Validation de la ville
function inputCity(){
    if(!regexAdress.test(contact.city)){
        document.getElementById("cityErrorMsg").innerText="Merci de renseigner le code postal et la ville";
    }return regexAdress.test(contact.city);
};
//Validation de l'e-mail
function inputMail(){
    if(!regexMail.test(contact.email)){
        document.getElementById("emailErrorMsg").innerText="Exemple : devinci@paint.table";
    }return regexMail.test(contact.email);
};
//Fonctions du formulaire
function allForm (){
    inputFirstName();
    inputLastName();
    inputAddress();
    inputCity();
    inputMail();
};
allForm ();
//Fonction d'envoie du formulaire
function formOrder(){
    const elementOrder = document.getElementById("order");
    //Ecoute de la variable elementOrder au clic de l'utilisateur
    elementOrder.addEventListener("click",(ev)=>{
        if(productInBasket.length===0 || productInBasket===null){
            alert("Votre panier est vide");
            ev.preventDefault();
        }
        //Si l'un des champs est vide alors message d'alerte, pas de renvoie vers la page confirmation
        else if(!contact.firstName || !contact.lastName || !contact.address || !contact.city || !contact.email){
            alert("Merci de renseigner les champs vides");
            ev.preventDefault();
            //Sinon, si l'un des champs est faux, alors message d'erreur, pas de renvoie vers la page confirmation
        }else if(!inputFirstName()||!inputLastName()||!inputAddress()||!inputCity()||!inputMail()){
            alert("Merci de vérifier les champs de saisie")
            ev.preventDefault();
        }
        else{//Sinon, non-éxecution de l'évènement
            ev.preventDefault();
            //Boucle pour récupérer les produits du LS
            let products=[];
            for(let i=0; i<productInBasket.length; i++){
                products.push(productInBasket[i].idStorage);
            }
            //Récupération du formulaire de contact et le tableau de produits
            const ordered = {contact, products,}
            //Variable envoie du formulaire et les produits au serveur
            const options = {
                method:'POST',
                body: JSON.stringify(ordered),
                headers: { 
                    "Content-Type": 'application/json',
                }
            };
            //Envoie du formulaire et des produits à l'api
            fetch(`http://localhost:3000/api/products/order`, options)
            .then((response)=>response.json())
            .then((data)=>{
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
                //Redirection vers la page confirmation avec l'id du numéro de commande
                document.location.href =`confirmation.html?orderId=`+ data.orderId;
            });
        };
    });
};
formOrder();