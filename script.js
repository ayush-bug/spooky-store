setTimeout(() => {
    const theme = document.getElementById("theme");
    theme.style.opacity = "0";

    setTimeout(() => {
        theme.style.display = "none";
    }, 1000);
}, 2000);

document.getElementById("about").addEventListener("click", function(){
  document.querySelector(".about-overlay").style.display = "flex";
});



document.getElementById("hideAbout").addEventListener('click',function(){
   document.querySelector(".about-overlay").style.display = "none";
});


const cartitem = document.querySelector(".cart-item");

let cart = JSON.parse(localStorage.getItem("spookycart")) || [];

function updatecartitem(){
    const totalitem = cart.reduce((total,item) => {
        return total + item.quantity;
    },0);
    cartitem.textContent = totalitem;

}

function addtocart(){
    localStorage.setItem("spookycart", JSON.stringify(cart));
    updatecartitem();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click" , ()=>{
        const product = button.closest(".item-card");
        const name = product.dataset.name;
        const price = Number(product.dataset.price);
        const imgPath = product.dataset.img;
        const existingItem = cart.find(item => item.name === name);
        if(existingItem){
            existingItem.quantity += 1;
        }
        else{
            cart.push({
                name: name,
                price : price,
                img : imgPath,
                quantity: 1
            });
        }
        addtocart();
        const btntext = button.textContent;
        button.textContent = "Added";
        setTimeout(() => {
            button.textContent = btntext;
        },800);
    });
});
updatecartitem();