setTimeout(() => {
    const theme = document.getElementById("theme");
    theme.style.opacity = "0";

    setTimeout(() => {
        theme.style.display = "none";
    }, 1000);
}, 2000);