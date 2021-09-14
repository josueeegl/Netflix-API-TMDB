var c = 0;
//mostrar/ocultar ventana de filtros
function filtros() {

    if (c == 0) {
        document.getElementById('filtros').style.display = 'block';
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

//LLenar de años el select
var myDate = new Date();
var año = myDate.getFullYear();
var year = document.getElementById('fYear');
const llenar_select = () => {
    for (var i = 1940; i < año + 1; i++) {
        year.innerHTML += `<option value="${i}" selected="selected">${i}
        </option>`;
    }
}
llenar_select();



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
    var valor = 'pelis';
    var value_tipo = document.getElementsByName('tipo');
    for (let i = 0; i < value_tipo.length; i++) {
        if (value_tipo[i].checked) {
            valor = value_tipo[i].value;
            verificar = 1;
        }
    }
    if (valor == 'pelis') {
        solicitud_filtro = api_base + movie_genres_http;
    } else if (valor == 'series') {
        solicitud_filtro = api_base + tv_genres_http;
    }
    console.log(solicitud_filtro);
}

//evaluamos todos los checkbox de categorias
const evaluar_checkbox_categorias = (data) => {
    var c = 0;
    data.forEach((element) => {
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
// Está funcion aplicara todos los cambios elegidos en la seccion filtros
const aplicando_cambios = () => {
    arreglo = {
        genres: []
    };
    solicitud_filtro = '';
    evaluar_tipo();
    evaluar_checkbox_categorias(data_genres);
    if (verificar == 1) {
        solicitud_filtro += new URLSearchParams({
            api_key: api_key,
            page: Math.floor(Math.random() * 3) + 1,
            language: lenguage
        });
        document.querySelector('.main').innerHTML = main0;
        if (verificar_generos == 1) {
            recorrer(arreglo.genres);
        } else {
            recorrer(data_genres);
        }
    }
}

const recorrer = (data) => {
    data.forEach(element => {
        fetchMovieListByGenres(solicitud_filtro, element.id, element.name);
    });
};