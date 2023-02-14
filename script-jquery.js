
let datosResultado;
let indice;

function sugerencias() {

  var busqueda = $("#busqueda").val();

  //llamar API.

  //Codigo generado por la página https://rapidapi.com/wirefreethought/api/geodb-cities/
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=ES&namePrefix=" + busqueda ,
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "fb87d7a3b9mshdc50827050564a7p168cfbjsne0473be5d1d7",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(function (response) {
    // el resultado esta en "response" y ya en formato JSON
    procesarResultado(response);
  });
  
}
function procesarResultado(resultadoJSON) {
  // variable para el contenido html de la lista de sugerenecias (ul)
  let lihtml = ""

  const listaSugerencias = $("#listaSugerencia");
  listaSugerencias.css("display","block");

  // en en campo data del JSON estan los datos de la lista
  datosResultado = resultadoJSON["data"];

  // recorrer para generar los items de la lista
  for (let i = 0; i < datosResultado.length; i++) {
    const dato = datosResultado[i];

    // para diferenciar el elemento de listas que se pulsa, al onlick le pasamos el indice (i) como parametro
    lihtml = lihtml + "<li onclick='opcionLista(" + i + ")'>" + dato["name"] + "</li>"
  }

  // insertar el html de la lista
  listaSugerencias.html(lihtml);
}

function opcionLista(opcion) {
  indice = opcion;

  // obtenenmos la opcion de la lista que ha seleccion el usuario haciendo clic
  const dato = datosResultado[indice];

  // relleneamos la caja de busqueda con el nombre del pueblo y ocultamos la lista de sugerencias
  $("#busqueda").val(dato["name"]);
  $("#listaSugerencia").css("display", "none");
}

let map;

function buscarPueblo() {
  const dato = datosResultado[indice];

  const latitud = dato["latitude"];
  const longitud = dato["longitude"];

  const provincia = dato["region"];
  const poblacion = dato["population"];

  $("#provincia").html(provincia);
  $("#poblacion").html(poblacion);

  initMap(latitud, longitud);

  $("#resultado").css("display", "block");
}

function initMap(latitud, longitud) {
  map = new google.maps.Map($("#map")[0], {
    center: { lat: latitud, lng: longitud },
    zoom: 9,
  });
}



