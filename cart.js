let cart = JSON.parse(localStorage.getItem("spookycart")) || [];

const cartitem = document.querySelector(".cart-item");

function updatecartitem(){
    const totalitem = cart.reduce((total,item) => {
        return total + item.quantity;
    },0);
    if(cartitem){ 
    cartitem.textContent = totalitem;}

}


const cartcontain = document.querySelector(".items-contain");
function renderCart(){ 
    cartcontain.innerHTML = "";
cart.forEach((item , index)=> {
    cartcontain.innerHTML += `
     <div class="items">
     <div class="img">
     <img src="${item.img}" alt="${item.name}" width="100px">
     </div>
     <div class="data">
     <h3>${item.name}</h3>
     <p>Price : $${item.price}</p>
     <div class="quantity">
     <button data-action="decrease" data-index="${index}">-</button>
    <span>${item.quantity}</span>
    <button data-action="increase" data-index="${index}">+</button>
     </div>
         <button class="remove-item" data-action="delete" data-index="${index}">
     Delete item
     </button>
     </div>

     <h3>Total: ${item.quantity} x $${item.price} = $${item.quantity*item.price}</h3>
     </div>
    `
});
updatecartitem();
}
cartcontain.addEventListener("click", (e)=>{
    const button = e.target.closest("button[data-action]");
    if(!button) return;
    const index = Number(button.dataset.index);
    const action = button.dataset.action;
    if(!cart[index]) return;
    if(action === "increase"){
        cart[index].quantity++;
    }
     else  if(action === "decrease"){
        if(cart[index].quantity > 1){ 
        cart[index].quantity--;
        }
    }
    else if(action === "delete"){
        cart.splice(index,1);
    }
    localStorage.setItem("spookycart", JSON.stringify(cart));
    cartitem.innerHTML = "";
    renderCart(); 
});
renderCart();