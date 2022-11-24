const elementOrder = document.getElementById("orderId");
function confirmation(){
   elementOrder.innerText = localStorage.getItem("orderId")
}
confirmation();