// Pré-carrega imagens do carousel para melhorar performance
const preloadImages = [
    'images/massas/pene com molho branco brocolis e frango.jpg',
    'images/fundo-definitivo-camera.png',
    'images/massas/penne quatro queijos.jpg',
    'images/GAMBERI.jpg',
    'images/DOLLCI CHOCOLATE.jpg',
    'images/MARGUERITA.jpg',
    'images/PALMITO.jpg'
];
preloadImages.forEach(img => {
    const image = new Image();
    image.src = img;
});

document.querySelector('.menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('nav');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScrollToElement(section, 1400);
    }
}

// Rolagem suave com duração controlada + easing (mais suave que o "smooth" nativo)
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollToElement(element, duration) {
    duration = duration || 1400;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.scrollIntoView();
        return;
    }
    const headerOffset = 68;
    const startY = window.pageYOffset;
    const targetY = element.getBoundingClientRect().top + startY - headerOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;
    // Desliga o smooth nativo do CSS durante a animação por rAF,
    // senão cada window.scrollTo vira uma animação e trava a transição
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    let startTime = null;

    function step(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (elapsed < duration) {
            requestAnimationFrame(step);
        } else {
            html.style.scrollBehavior = prevBehavior;
            // Flash rápido no destino para evidenciar a chegada
            element.classList.add("destaque-chegada");
            setTimeout(function () { element.classList.remove("destaque-chegada"); }, 1600);
        }
    }
    requestAnimationFrame(step);
}

// Aplica a rolagem suave a todos os links de âncora do menu (ex: #sobre, #contato, #pedido)
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            const id = this.getAttribute("href");
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    smoothScrollToElement(target, 1400);
                    const menu = document.querySelector(".menu");
                    if (menu) menu.classList.remove("show");
                    history.replaceState(null, "", id);
                }
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
});

const pizzas = document.getElementsByClassName("carroussel--container")[0].children;
let actualImg = 0;
const loopInterval = setInterval(() => {
  pizzas[actualImg].style.opacity = 0;
  if (actualImg >= pizzas.length - 1) {
    actualImg = 0;
  } else {
    actualImg += 1;
  } 
  pizzas[actualImg].style.opacity = 1;
}, 2000);