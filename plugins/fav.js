
const favouriteList = JSON.parse(localStorage.getItem("favList"));
for (let filmId of favouriteList) {
    fetch(url + "i=" + filmId).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result)
        let item = `<div class="film">`;
        item += `<div class="row">`;
        item += `<div class="col-4">`;
        item += `<img src="${result.Poster !== "N/A" ? result.Poster : 'images/no-poster.png'}" alt="${result.Title}" class="poster">`;
        item += `</div>`; // col-4;
        item += `<div class="col-8">`;
        item += `<div class="like">`;
        item += `<i class="fas fa-heart active" onclick="toggleFavourite('${result.imdbID}', this)"></i>`;
        item += `</div>`; // like;
        item += `<div class="title">${result.Title} / ${result.Year}</div>`;
        if (result.imdbRating !== "N/A") {
            item += `<div class="rating">IMDb rating: ${result.imdbRating} /10 (${result.imdbVotes} votes)</div>`;
        }
        item += `<div class="category"><strong>Genre: </strong>${result.Genre}</div>`;
        item += `<div class="category"><strong>Runtime: </strong>${result.Runtime}</div>`;
        item += `<div class="category"><strong>Director: </strong>${result.Director}</div>`;
        item += `<div class="category"><strong>Writer: </strong>${result.Writer}</div>`;
        item += `<div class="category"><strong>Country: </strong>${result.Country}</div>`;
        item += `<div class="category"><strong>Released: </strong>${result.Released}</div>`;
        item += `<div class="category"><strong>Actors: </strong>${result.Actors}</div>`;
        if (result.Plot !== "N/A") {
            item += `<div class="category">${result.Plot}</div>`;
        }
        item += `</div>`; // col-8;
        item += `</div>`; // row;
        item += `</div>`; // film;

        document.getElementById("favourite-list").innerHTML += item;
    })
}