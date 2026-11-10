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
  var BLOG_URL = "https://bibliotecariadelvillano.blogspot.com";
  var feedUrl = BLOG_URL + "/feeds/posts/default?alt=json&max-results=3";

  var status = document.getElementById("blog-status");
  var list = document.getElementById("blog-list");
  var count = document.getElementById("blog-count");
  var more = document.getElementById("blog-more");
  if (!status || !list) return;

  fetch(feedUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var feed = data.feed;
      var posts = feed.entry || [];

      count.textContent = "(" + feed.openSearch$totalResults.$t + ")";

      if (!posts.length) {
        status.textContent = "Próximamente reseñas de libros.";
        return;
      }

      status.textContent = "Últimas reseñas:";
      posts.forEach(function (p) {
        var enlace = p.link.find(function (l) { return l.rel === "alternate"; });
        if (!enlace) return;

        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = enlace.href;
        a.textContent = p.title.$t;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        list.appendChild(li);
      });

      more.href = BLOG_URL;
      more.hidden = false;
    })
    .catch(function () {
      status.textContent = "Próximamente reseñas de libros.";
    });
})();
