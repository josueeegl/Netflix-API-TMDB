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