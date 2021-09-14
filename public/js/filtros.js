var c = 0;

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
const categoria_filtros = (id, genres) => {
    div.innerHTML += `<p class="pGeneros">
    <input type="checkbox" name="${genres}" value="${id}" />
    ${genres}
  </p>`;
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