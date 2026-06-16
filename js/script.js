const sonidoAlerta = new Audio("assets/alerta.mp3");
sonidoAlerta.volume = 1;
const mapa = L.map("map").setView([-34.5222, -58.4815], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors"
}).addTo(mapa);

const puntosDeInteres = [
    {
        nombre: "EEST N°1 Vicente López",
        coordenadas: [-34.5222, -58.4815],
        descripcion: "Sede central de operaciones y proyectos de 7mo año."
    },
    {
        nombre: "Punto de Monitoreo Norte",
        coordenadas: [-34.5150, -58.4900],
        descripcion: "Estación de control auxiliar simulada."
    }
];

puntosDeInteres.forEach(punto => {

    const marcador = L.marker(punto.coordenadas).addTo(mapa);

    const htmlPopup = `
        <div class="popup-contenido">
            <h3>📍 ${punto.nombre}</h3>
            <p>${punto.descripcion}</p>
        </div>
    `;

    marcador.bindPopup(htmlPopup);

    marcador.on("click", () => {
        sonidoAlerta.currentTime = 0;

        sonidoAlerta.play().catch(error => {
            console.log("El navegador bloqueó el audio.");
        });
    });

});