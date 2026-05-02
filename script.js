/**
 * Lógica de Navegación QuimiLab
 */

function openTab(evt, tabName) {
    // Declarar variables
    let i, tabcontent, navlinks;

    // Ocultar todos los elementos con clase "tab-content"
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Quitar la clase "active" de todos los botones de navegación
    navlinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < navlinks.length; i++) {
        navlinks[i].classList.remove("active");
    }

    // Mostrar la pestaña actual y añadir clase "active" al botón
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    // Scroll suave al inicio si es necesario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicialización: Mostrar la pestaña de inicio por defecto
document.addEventListener('DOMContentLoaded', () => {
    console.log("QuimiLab 8.º cargado correctamente.");
});
