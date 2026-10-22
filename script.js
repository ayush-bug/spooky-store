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