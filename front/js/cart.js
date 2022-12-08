let productInBasket = JSON.parse(localStorage.getItem("basket"));
/*Fonction permettant d'afficher tous les produits du localStorage
Pour chaque produit, appel de l'api pour récupération des éléments. Retour de la première promesse en json. Deuxième promesse permettant l'affichage des informations des produit. Insertion
des éléments. Utilisation des fonctions quantité total, prix total, modification et suppression*/
function displayProductInBasket(productInBasket){
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
        totalQuantities(product.quantiteStorage);
        incrementationTotalPrice(product.quantiteStorage,data.price);
        inputModification();
        deleteElement();
        });
    };
};
displayProductInBasket(productInBasket);
/*Fonction et variables de la quantité total
Sélection de l'ID dans html. Utilisation de parseInt pour convertir un argument en une chaîne de caractère. Calcul totalqt=totalqt+quantitysum. Envoie du calcul avec inner.text*/
const elementQuantity = document.getElementById("totalQuantity");
let totalquantity =0;
function totalQuantities(quantity){
    const quantitysum =  parseInt(quantity);
    totalquantity +=quantitysum;
    elementQuantity.innerText = totalquantity;
};
/*Fonction et varirables du prix total
Sélection de l'ID dans html. Il faut réaliser le calcul de la qt*prix. Ensuite calcul totalPrice=tatalPrice*priceOfProduct. Insérer le prix dans le total avec inner.text*/
let elementPrice = document.getElementById("totalPrice");
let totalPrice = 0;
function incrementationTotalPrice(qty,price){
    let priceOfProduct = qty * price;
    totalPrice += priceOfProduct;
    elementPrice.innerText = totalPrice;
};
/*Modification des produits de la page panier
Sélection de l'élément HTML. Au moment du changement de qt, ciblage du pdt qui a été modifié. Ensuite, on remonte à l'élément que l'on veut. Comparaison entre les produits du LS.
Création d'un nouveau fichier de produit. Mise à jour du LS, message d'alerte, mise à jour des totaux*/
function inputModification(){
    const elementModification = document.querySelectorAll(".itemQuantity");
    for(const modification of elementModification){
        modification.addEventListener("change",(ev)=>{
            ev.preventDefault();
            ev.target;
            let selectionModification = modification.closest("article");
            let selectModif = productInBasket.find(element => element.idStorage==selectionModification.dataset.id && element.couleurStorage === selectionModification.dataset.color);
            selectModif.quantiteStorage=modification.value;
            localStorage.setItem("basket", JSON.stringify(productInBasket));
            alert("Le produit a été modifié");
            location.reload();
        });
    };
};
/*Suppression des produits de la page panier
Sélection de l'élément HTML. Au moment du clic sur le bouton, ciblage du pdt. Remonter à l'élément que l'on veut. Comparaison des pdts présents dans le LS. Filtre des éléments du panier,
pour garder ceux qui ne sont pas supprimés. Mise à jour du localStorage. Suppression du pdt du html, message d'alerte, mise à jour des totaux*/
function deleteElement(){
    let inputDelete = document.querySelectorAll(".deleteItem");
    for(const deletion of inputDelete){
        deletion.addEventListener("click",(e)=>{
        e.preventDefault();
        e.target;
        let elementArticle = deletion.closest('article');
        const searchDeleteItem = productInBasket.find(element => element.idStorage == elementArticle.dataset.id && element.couleurStorage == elementArticle.dataset.color);
        productInBasket = productInBasket.filter(elt => elt !==searchDeleteItem);
        localStorage.setItem('basket',JSON.stringify(productInBasket));
        elementArticle.remove();
        alert("Le produit a été supprimé")
        location.reload();
        });
    };
};

//                                     Confirmation de la commande
let fieldFirstName = document.getElementById('firstName');
let fieldLastName = document.getElementById('lastName');
let fieldAddress = document.getElementById('address');
let fieldCity = document.getElementById('city');
let fieldEmail = document.getElementById('email');
let firstNameErrorMsg = fieldFirstName.nextElementSibling;
let lastNameErrorMsg = fieldLastName.nextElementSibling;
let addressErrorMsg = fieldAddress.nextElementSibling;
let cityErrorMsg = fieldCity.nextElementSibling;
let mailErrorMsg = fieldEmail.nextElementSibling;
//Expressions 
const regexText = /^[A-Za-zàâäéèêëïîôöùûüç]+$/;
const regexAdress = /^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
const regexMail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//Au changement de l'utilisateur, si la valeur de champ est différente du test regex, alors message d'erreur, sinon, pas de message
function inputsForm(){
    fieldFirstName.addEventListener('change', function() {
        if (!regexText.test(fieldFirstName.value)) {
            firstNameErrorMsg.innerText = "Merci de renseigner votre prénom";   
        }else{firstNameErrorMsg.innerText = "";  
        }
    });
    fieldLastName.addEventListener('change', function() {
        if (!regexText.test(fieldLastName.value)) {
            lastNameErrorMsg.innerText = "Merci de renseigner votre nom";   
        }else{lastNameErrorMsg.innerText = "";  
        }
    });
    fieldAddress.addEventListener('change', function() {
        if (!regexAdress.test(fieldAddress.value)) {
            addressErrorMsg.innerText = "Merci de renseigner le numéro de voie et la rue";   
        }else{addressErrorMsg.innerText = "";  
        }
    });
    fieldCity.addEventListener('change', function() {
        if (!regexAdress.test(fieldCity.value)) {
            cityErrorMsg.innerText = "Merci de renseigner le code postal et la ville";   
        }else{cityErrorMsg.innerText = "";  
        }
    });
    fieldEmail.addEventListener('change', function() {
        if (!regexMail.test(fieldEmail.value)) {
            mailErrorMsg.innerText = "Exemple : devinci@paint.table";   
        }else{mailErrorMsg.innerText = "";  
        }
    });
};
inputsForm();
/*Fonction d'envoie du formulaire
Au clic de l'utilisateur, si le panier est vide message d'alerte, sinon si, l'un des champs est vide alors message d'alerte, sinon, si l'un des champs est faux, alors message d'erreur, sinon,
création du fichier de contact, boucle pour récupérer les produits du LS. Ensuite, récupération du formulaire de contact et le tableau de produits. Création de la variable d'envoie du formulaire
et des produits au serveur. Par la suite, envoie du formulaire et des produits à l'api, suppression du LS et redirection vers la page confirmation avec l'id du numéro de commande */
function formOrder(){
    const elementOrder = document.getElementById("order");
    elementOrder.addEventListener("click",(ev)=>{
        ev.preventDefault();
        if(productInBasket.length===0 || productInBasket===null){
           alert("Votre panier est vide");
        }else if(!fieldFirstName.value || !fieldLastName.value || !fieldAddress.value || !fieldCity.value || !fieldEmail.value){
            alert("Merci de renseigner les champs vides")
        }else if(!regexText.test(fieldFirstName.value)||!regexText.test(fieldLastName.value)||!regexAdress.test(fieldAddress.value)||!regexAdress.test(fieldCity.value)||!regexMail.test(fieldEmail.value)){
            alert("Merci de vérifier les champs de saisie")
        }else{
            let contact = {
                firstName:fieldFirstName.value,
                lastName:fieldLastName.value,
                address:fieldAddress.value,
                city:fieldCity.value,
                email:fieldEmail.value,
            }
            let products=[];
            for(let i=0; i<productInBasket.length; i++){
                products.push(productInBasket[i].idStorage);
            }
            const ordered = {contact, products,}
            const options = {
                method:'POST',
                body: JSON.stringify(ordered),
                headers: { 
                    "Content-Type": 'application/json',
                }
            };
            fetch(`http://localhost:3000/api/products/order`, options)
            .then((response)=>response.json())
            .then((data)=>{
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
                document.location.href =`confirmation.html?orderId=`+ data.orderId;
            });
        };
    });
};
formOrder();