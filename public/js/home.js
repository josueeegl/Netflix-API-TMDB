// aca obtengo los generos
fetch(genres_list_http + new URLSearchParams({
        api_key: api_key,
        language: lenguage
    }))
    .then(res => res.json()).then(data => {
        data.genres.forEach(item => {
            console.log(item);
            fetchMovieListByGenres(item.id, item.name); //le paso el id y el name del genero

        })
    })

// obtengo las peliculas por genero
const fetchMovieListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
            api_key: api_key,
            with_genres: id,
            page: Math.floor(Math.random() * 3) + 1,
            language: lenguage
        })).then(res => res.json()).then(data => {
            // se envian las peliculas por categoria
            makeCategoryElement(genres, data.results);

        })
        .catch(err => console.log(err));
}

const main = document.querySelector('.main');
const makeCategoryElement = (category, data) => {
    main.innerHTML += `<div class="movie-list">
    <button class="pre-btn"><img src="img/pre.png" alt="" /></button>
    <h1 class="movie-category">${category}</h1>
    <div class="movie-container" id="${category}">
      
    </div>
    <button class="nxt-btn">
      <img src="img/nxt.png" alt="" />
    </button>
  </div>`;
    makeCards(category, data);
}

//agregamos el contenido a los div creados anteriormente, con imagen y nombre
const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }
        movieContainer.innerHTML += `<div class="movie" onclick="location.href = '/${item.id}'">
        <img src="${img_url}${item.backdrop_path}" alt="" />
        <p class="movie-title">${item.title}</p>
      </div>
        `;
        if (i == data.length - 1) {
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }
    })

}