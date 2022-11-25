let newId = new URLSearchParams(window.location.search);
const orderId = newId.get("id");
document.getElementById("orderId").innerHTML += `${orderId}`;