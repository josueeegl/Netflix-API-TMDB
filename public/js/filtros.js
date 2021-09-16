var c = 0;
//mostrar/ocultar ventana de filtros
function filtros() {
    if (c == 0) {
        document.getElementById('filtros').style.display = 'block';
        window.scrollTo(0, 160);
        c = 1;
    } else {
        document.getElementById('filtros').style.display = 'none';
        c = 0;
    }

}

//Agregamos los generos en el div categorias de filtrado
var div = document.getElementById('flCategoria');
var data_genres; //servira mas adelante
const categoria_filtros = (id, genres, data) => {
    div.innerHTML += `<p class="pGeneros">
    <input type="checkbox" id="${genres+id}" value="${id}" />
    ${genres}
  </p>`;
    data_genres = data;
}
//Agregamos los generos en el div categorias de filtrado
var div_clasificacion = document.getElementById('flClasificacion');
const agregar_clasificaciones = () => {
    fetch('https://api.themoviedb.org/3/certification/movie/list?api_key=71af66658989368f32199a9e2250ec32')
        .then(res => res.json()).then(data => {
            data.certifications.US.forEach(item => {
                div_clasificacion.innerHTML += `<p class="fTipo">
                <input type="radio" name="clasificacion" required value="&certification_country=US&certification=${item.certification}" />
                ${item.certification}
              </p>`;
            })
        })
}
agregar_clasificaciones();

//LLenar de años el select
var myDate = new Date();
var año = myDate.getFullYear();
var year = document.getElementById('fYear');
const llenar_select = () => {
    for (var i = año; i > 1940 + 1; i--) {
        year.innerHTML += `<option value="${i}">${i}
        </option>`;
    }
}
llenar_select();

//////////////////////////////////////////////////////////////////////////////////

// INICIO de boton GUARDAR
const aplicar_cambios = () => {
    filtros();
    aplicando_cambios();
}
var solicitud_filtro;
var main0 = document.querySelector('.main').innerHTML;
var verificar_generos = 0;
var verificar = 0;
var arreglo = {
    genres: []
};

// evaluar tipo de contenido 
const evaluar_tipo = () => {
    var valor = 'pelis'; //valor por defecto pelis
    var value_tipo = document.getElementsByName('tipo');
    for (let i = 0; i < value_tipo.length; i++) {
        if (value_tipo[i].checked) { //Si se ha seleccionado pelicula o serie
            valor = value_tipo[i].value;
            verificar = 1;
        }
    }
    if (valor == 'pelis') { // si no se ha seleccionado nada se aplicara para peliculas
        solicitud_filtro = api_base + movie_genres_http;
    } else if (valor == 'series') {
        solicitud_filtro = api_base + tv_genres_http;
    } else if (valor == 'mejor') {
        solicitud_filtro = api_base + api_mejor_calificadas;
    } else if (valor == 'proxima') {
        solicitud_filtro = api_base + api_proximamente;
    }
}

//evaluamos todos los checkbox de categorias
const evaluar_checkbox_categorias = (data) => {
    var c = 0;
    data.forEach((element) => {
        //Si se selecciona un genere se llena el array con los generps seleccionados
        if (document.getElementById(`${element.name+element.id}`).checked) {
            verificar_generos = 1;
            verificar = 1;
            arreglo.genres[c] = {
                id: element.id,
                name: element.name
            };
        }
        c++;
    });
}

// Año seleccionado
const por_fecha = () => {
    var value_year = document.getElementById('fYear').value;
    if (value_year != 'year') {
        solicitud_filtro += `&primary_release_year=${value_year}`;
        verificar = 1;
    }
}

//Clasificacion para adultos
const para_adultos = () => {
    var value_clasificacion = document.getElementsByName('clasificacion');
    for (let i = 0; i < value_clasificacion.length; i++) {
        if (value_clasificacion[i].checked) {
            solicitud_filtro += value_clasificacion[i].value;
            verificar = 1;
        }
    }

}

//Por orden de... 
const ver_por = () => {
    var value_ordenar = document.getElementsByName('ordenar');
    for (let i = 0; i < value_ordenar.length; i++) {
        if (value_ordenar[i].checked) { //Si se ha seleccionado pelicula o serie
            solicitud_filtro += value_ordenar[i].value;
            verificar = 1;
        }
    }
}

//////////////////////////////////////////

// Está funcion aplicara todos los cambios elegidos en la seccion filtros
const aplicando_cambios = () => {
    arreglo = {
        genres: []
    };
    solicitud_filtro = '';
    evaluar_tipo();
    evaluar_checkbox_categorias(data_genres);
    solicitud_filtro += new URLSearchParams({
        api_key: api_key,
        page: Math.floor(Math.random() * 3) + 1,
        language: lenguage
    });
    por_fecha();
    para_adultos();
    ver_por();
    if (verificar == 1) {
        document.querySelector('.main').innerHTML = main0;
        if (verificar_generos == 1) {
            recorrer(arreglo.genres);
        } else {
            recorrer(data_genres);
        }
    }
}

// Aca se recorre el arreglo para imprimir en pantalla
const recorrer = (data) => {
    console.log(solicitud_filtro);
    data.forEach(element => {
        fetchMovieListByGenres(solicitud_filtro, element.id, element.name);
    });
};