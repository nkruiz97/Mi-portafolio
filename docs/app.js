const API_URL = "https://nicoweb.onrender.com/api/proyectos/";

// Inicializar animaciones de scroll
const configurarAnimaciones = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
};

// Traer proyectos del Backend de Django
async function obtenerProyectos() {
  const contenedor = document.getElementById("contenedor-proyectos");

  try {
    const respuesta = await fetch(API_URL);
    const proyectos = await respuesta.get();

    // Limpiar el mensaje de carga
    contenedor.innerHTML = "";

    // Si no hay proyectos guardados en el admin de Django
    if (proyectos.length === 0) {
      contenedor.innerHTML = `<p style="color: var(--muted); grid-column: 1/-1; text-align: center;">No hay proyectos disponibles por el momento.</p>`;
      return;
    }

    // Variar las clases de color de las tarjetas (t1, t2, t3) dinámicamente
    const clasesColor = ["t1", "t2", "t3"];

    proyectos.forEach((proyecto, indice) => {
      const claseElegida = clasesColor[indice % clasesColor.length];

      // Separar el string de tecnologías por comas si viene como "React, Django"
      const tagsHTML = proyecto.tecnologias
        ? proyecto.tecnologias
            .split(",")
            .map((tech) => `<span class="tag">${tech.trim()}</span>`)
            .join("")
        : '<span class="tag">Full Stack</span>';

      const tarjeta = document.createElement("div");
      tarjeta.className = "project-card fade-up";

      tarjeta.innerHTML = `
        <div class="project-thumb ${claseElegida}">💻</div>
        <div class="project-body">
          <div class="project-cat">Proyecto Django</div>
          <div class="project-name">${proyecto.titulo}</div>
          <p class="project-desc">${proyecto.descripcion}</p>
        </div>
        <div class="project-footer">
          <div class="project-stack">
            ${tagsHTML}
          </div>
          <a href="${proyecto.link_github || "#"}" target="_blank" class="project-link">Ver Código →</a>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });

    // Activar las animaciones en las tarjetas recién creadas
    configurarAnimaciones();
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    contenedor.innerHTML = `
      <p style="color: #FF5F57; grid-column: 1/-1; text-align: center;">
        Error al cargar los proyectos. El backend de Render puede estar despertando, por favor recarga en unos segundos.
      </p>
    `;
  }
}

// Formulario de contacto
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.textContent = "✓ Mensaje enviado";
  btn.style.background = "#2A8C5A";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Enviar mensaje";
    btn.style.background = "";
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// Arrancar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  obtenerProyectos();
  configurarAnimaciones();
});
