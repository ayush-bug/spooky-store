let cart = JSON.parse(localStorage.getItem("spookycart")) || [];
const cartitem = document.querySelector(".cart-item");

function updatecartitem(){
    const totalitem = cart.reduce((total,item) => {
        return total + item.quantity;
    },0);
    cartitem.textContent = totalitem;

}
updatecartitem();

