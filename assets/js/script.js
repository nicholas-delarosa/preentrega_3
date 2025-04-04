// Menú mobile (hamburguesa)
var menu = document.querySelector('.hamburger');
var menuMobile = document.querySelector('.menuppal');

// Método para alternar menú
function toggleMenu(event) {
    event.preventDefault();
    this.classList.toggle('is-active');
    menuMobile.classList.toggle('is_active');

    // Sonidos de apertura y cierre
    if (menuMobile.classList.contains("is_active")) {
        playSound(menuOpenSound);
    } else {
        playSound(menuCloseSound);
    }
}

// Evento de clic para abrir/cerrar menú
menu.addEventListener('click', toggleMenu, false);

// Menú desktop - Búsqueda en la barra
function buscar() {
    let query = document.getElementById("search").value.trim().toLowerCase();

    // Validar entrada
    if (query === "" || /^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(query)) {
        alert("Por favor, escribe una búsqueda válida.");
        return;
    }

    // Remover resaltado previo
    document.querySelectorAll('.highlight').forEach(el => el.outerHTML = el.innerHTML);

    let found = false;
    document.querySelectorAll("p, h1, h2, li").forEach(element => {
        let text = element.innerHTML.toLowerCase();
        if (text.includes(query)) {
            let regex = new RegExp(query, "gi");
            element.innerHTML = element.innerHTML.replace(regex, match => `<span class='highlight'>${match}</span>`);
            found = true;
        }
    });

    if (!found) alert("No se encontraron coincidencias.");
}

// Detectar ENTER en el campo de búsqueda
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") buscar();
});

// 🔹 Manejo de sonidos
const basePath = window.location.pathname.includes("/pages/") ? "../assets/audio/" : "assets/audio/";
const hoverSound = new Audio(basePath + "hover.mp3");
const clickSound = new Audio(basePath + "click.mp3");
const menuOpenSound = new Audio(basePath + "menu-open.mp3");
const menuCloseSound = new Audio(basePath + "menu-close.mp3");

// Función para reproducir sonido de manera segura
function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(error => console.error("Error al reproducir sonido:", error));
}

// Eventos para enlaces del menú (desktop y mobile)
const navLinks = document.querySelectorAll(".nav-links a, .menuppal ul li a");
navLinks.forEach(link => {
    link.addEventListener("mouseover", () => playSound(hoverSound));

    link.addEventListener("click", (event) => {
        event.preventDefault();
        playSound(clickSound);
        setTimeout(() => { window.location.href = link.href; }, 200);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const audios = document.querySelectorAll("audio");
    let currentAudio = null;

    audios.forEach(audio => {
        audio.addEventListener("play", function () {
            if (currentAudio && currentAudio !== this) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = this;
        });

        audio.addEventListener("ended", function () {
            if (currentAudio === this) {
                currentAudio = null;
            }
        });
    });
});

// Tada desktop
document.addEventListener("DOMContentLoaded", function () {
    const dogImg = document.querySelector(".dog");

    dogImg.addEventListener("mouseenter", function () {
        // Agrega las clases para iniciar la animación "tada"
        dogImg.classList.add("animate__animated", "animate__tada");
    });

    dogImg.addEventListener("animationend", function () {
        // Remueve las clases para permitir que la animación se vuelva a disparar en futuros hovers
        dogImg.classList.remove("animate__animated", "animate__tada");
    });
});

// Capítulos 3 y 4. No disponibles hasta NS2
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        const href = link.getAttribute("href");

        if (!href || href.trim() === "") {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                alert("Gracias por tu interés 😊 Este capítulo estará disponible el 5 de junio de 2025. ¡Te esperamos!");

            });
        }
    });
});

