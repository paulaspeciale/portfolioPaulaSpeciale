(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (!toggle || !nav) return;

  function abrirNav() {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function cerrarNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var abierto = toggle.getAttribute("aria-expanded") === "true";
    if (abierto) {
      cerrarNav();
    } else {
      abrirNav();
    }
  });

  // cerrar el menú al elegir un link
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", cerrarNav);
  });

  // cerrar con Escape
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      cerrarNav();
    }
  });

  // si se agranda la ventana y el menú mobile estaba abierto, resetear
  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) {
      cerrarNav();
    }
  });
})();
(function () {
  var BLOG_ID = "8119254594228731307";
  var API_KEY = "AIzaSyCaUOuAYEzvDqN-Ss6EibClNxVHRULhJt0";
  var base = "https://www.googleapis.com/blogger/v3/blogs/" + BLOG_ID;

  var status = document.getElementById("blog-status");
  var list = document.getElementById("blog-list");
  var count = document.getElementById("blog-count");
  var more = document.getElementById("blog-more");
  if (!status || !list) return;

  Promise.all([
    fetch(base + "?key=" + API_KEY).then(function (r) { return r.json(); }),
    fetch(base + "/posts?key=" + API_KEY + "&maxResults=3&fetchBodies=false")
      .then(function (r) { return r.json(); })
  ])
    .then(function (res) {
      var blog = res[0];
      var posts = res[1].items || [];

      count.textContent = "(" + blog.posts.totalItems + ")";

      if (!posts.length) {
        status.textContent = "Próximamente reseñas de libros.";
        return;
      }

      status.textContent = "Últimas reseñas:";
      posts.forEach(function (p) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = p.url;
        a.textContent = p.title;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        list.appendChild(li);
      });

      more.href = blog.url;
      more.hidden = false;
    })
    .catch(function () {
      status.textContent = "Próximamente reseñas de libros.";
    });
})();
