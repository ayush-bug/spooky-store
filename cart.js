let cart = JSON.parse(localStorage.getItem("spookycart")) || [];

const cartitem = document.querySelector(".cart-item");

function updatecartitem(){
    const totalitem = cart.reduce((total,item) => {
        return total + item.quantity;
    },0);
    cartitem.textContent = totalitem;

}
updatecartitem();

const cartcontain = document.querySelector(".items-contain");

cart.forEach(item => {
    cartcontain.innerHTML += `
     <div class="items">
     <h3>${item.name}</h3>
     <p>${item.price}</p>
     <p>${item.quantity}</p>
     </div>
    `
});