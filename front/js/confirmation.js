//Récupération de l'URL //Récupération du numéro de commande
let newId = new URL(window.location.href).searchParams.get("orderId");
//Endroit où doit être affiché le numéro de commande
document.getElementById("orderId").innerHTML = `${newId}`;
localStorage.clear();