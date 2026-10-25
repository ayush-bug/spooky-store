let cart = JSON.parse(localStorage.getItem("spookycart")) || [];

const cartitem = document.querySelector(".cart-item");
const subtotal = document.querySelector(".sub-total");
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

     <h3 style="font-family:monospace;">Total: ${item.quantity} x $${item.price} = $${item.quantity*item.price}</h3>
     </div>
    `
});
updatecartitem();
makeReceipt();
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



function makeReceipt(){
    const totalItem = cart.reduce((total,item) => {
        return total + item.quantity;
    },0);
    
    const alltotal = cart.reduce((total, item)=>
          total + (Number(item.price) * (item.quantity)),0
    );
  subtotal.innerHTML = `
    <div class="reciept">
    <p class="name">Spooky store</p>
    <p class="subname">THE BLOODY TRANSACTION</p>
    <div class="line"></div>
    <div class="bill-info">
    <span>RECIEPT NO .</span>
    <span>#${Math.floor(Math.random()*9000)+10000}</span>
    </div>
    <div class="reciept-info">
      <span>ITEMS</span>
      <span>${totalItem}</span>
    </div>
    <div class="line"></div>
    <h4>ORDER DETAILS</h4>
    ${cart.map(item => `
        <div class="receipt-product">
           <span>${item.name} x ${item.quantity}</span>
           <span>$${item.price * item.quantity}</span>
        </div>
        `).join("")}
        <div class="line"></div>
        <div class="reciept-info">
          <span>DELIVERY</span><span>FREE</span>
        </div>
   <div class="receipt-total">
     <span>TOTAL : </span> <span>${alltotal}</span>
   </div>
   <div class="line"></div>
   <p class="address">
   NO NEED TO ENTER YOUR ADDRESS
   <br><br>
   OUR WITCHES KNOW YOUR HOME ALREADY .</p>
   <button class="place-order">
    PLACE ORDER
   </button>
        </div>
  `



}

document.querySelector(".place-order").addEventListener("click", function(){
 Swal.fire({
  title: "Are you sure? ",
  text: "Are you sure you want to place order , payment will be cash on delivery , if you wont pay us then next day you will become a item in our shop , hahah",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Place order"
}).then((result) => {
  if (result.isConfirmed) Swal.fire({
    title: "Order placed",
    text: "the item will be delivered to you when our witches like to deliver .",
    icon: "success"
  });
});
});
