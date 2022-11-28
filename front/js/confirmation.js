//Récupération de l'URL
let newId = new URLSearchParams(window.location.search);
//Récupération du numéro de commande
const orderId = newId.get("id");
//Endroit où doit être affiché le numéro de commande
document.getElementById("orderId").innerHTML += `${orderId}`;