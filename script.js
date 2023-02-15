
let datosResultado;
let indice;

function sugerencias() {

  var busqueda = document.getElementById("busqueda").value;

  //llamar API.

  //Codigo generado por la página https://rapidapi.com/wirefreethought/api/geodb-cities/

  const data = null;

  const xhttp = new XMLHttpRequest();
  xhttp.withCredentials = true;

  // listener para ejecutar codigo cuando se completa la llamada a la API
  xhttp.addEventListener("readystatechange", function () {
    if (this.readyState === 4 && this.status === 200) {
      //procesar la respuesta de la API

      // el resultado esta en la propiedad "responseText"
      var resultadoJSON = JSON.parse(xhttp.responseText);
      procesarResultado(resultadoJSON);
    }
  });

  xhttp.open("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=ES&namePrefix=" + busqueda);
  xhttp.setRequestHeader("X-RapidAPI-Key", "fb87d7a3b9mshdc50827050564a7p168cfbjsne0473be5d1d7");
  xhttp.setRequestHeader("X-RapidAPI-Host", "wft-geo-db.p.rapidapi.com");

  xhttp.send(data);

}

function procesarResultado(resultadoJSON) {
  // variable para el contenido html de la lista de sugerenecias (ul)
  let lihtml = ""

  const listaSugerencias = document.getElementById("listaSugerencia");
  listaSugerencias.style.display="block";

  // en en campo data del JSON estan los datos de la lista
  datosResultado = resultadoJSON["data"];

  // recorrer para generar los items de la lista
  for (let i = 0; i < datosResultado.length; i++) {
    const dato = datosResultado[i];

    // para diferenciar el elemento de listas que se pulsa, al onclick le pasamos el indice (i) como parametro
    lihtml = lihtml + "<li onclick='opcionLista(" + i + ")'>" + dato["name"] + "</li>"
  }

  // insertar el html de la lista
  listaSugerencias.innerHTML = lihtml;
}

function opcionLista(opcion) {
  indice = opcion;

  // obtenenmos la opcion de la lista que ha seleccion el usuario haciendo click
  const dato = datosResultado[indice];

  // relleneamos la caja de busqueda con el nombre del pueblo y ocultamos la lista de sugerencias
  document.getElementById("busqueda").value = dato["name"];
  document.getElementById("listaSugerencia").style.display = "none";
}

let map;

function buscarPueblo() {
  const dato = datosResultado[indice];

  const latitud = dato["latitude"];
  const longitud = dato["longitude"];

  const provincia = dato["region"];
  const poblacion = dato["population"];

  document.getElementById("provincia").innerHTML=provincia;
  document.getElementById("poblacion").innerHTML=poblacion;

  initMap(latitud, longitud);

  document.getElementById("resultado").style.display = "block";
}

function initMap(latitud, longitud) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitud, lng: longitud },
    zoom: 9,
  });
}



