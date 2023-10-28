const themes = document.querySelectorAll(".theme-item");
const html = document.querySelector("html");

addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme");
    if(theme) html.setAttribute("data-theme", theme);
});

themes.forEach((theme) => {
    theme.addEventListener("click", () => {
        const theme_name = theme.getAttribute("theme");
        html.setAttribute("data-theme", theme_name);
        saveTheme(theme_name);
    });
});

function saveTheme(theme_name) {
    localStorage.setItem("theme", theme_name);
}