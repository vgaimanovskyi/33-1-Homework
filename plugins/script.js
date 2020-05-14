const url = "https://www.omdbapi.com/?apikey=b159341b&";
function searchFilm() {
    document.getElementById("catalog").innerHTML = null;
    document.getElementById("js-pagination").innerHTML = null;
    const search = document.getElementById("input-search").value.replace(/ /g, '+');
    const type = document.getElementById("type-search").value;
    fetch(url + "s=" + search + "&type=" + type).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.Response === "True") {

            const resultLength = result.totalResults;
            const list = result.Search;
            let active;

            // create pagination
            if (list.length) {
                const onPage = 10;
                const numberOfPages = Math.ceil(resultLength / onPage);
                if (resultLength / 10 < 6) {
                    for (let i = 1; i <= numberOfPages; i++) {
                        let span = document.createElement("span");
                        span.innerHTML = i;
                        document.getElementById("js-pagination").appendChild(span);
                    }
                } else {
                    document.getElementById("js-pagination").innerHTML = `<div class="pag-nav prev">&#171;</div>`;
                    for (let i = 1; i <= numberOfPages; i++) {
                        let span = document.createElement("span");
                        span.innerHTML = i;
                        document.getElementById("js-pagination").appendChild(span);
                    }
                    document.getElementById("js-pagination").innerHTML += `<div class="pag-nav next">&#187;</div>`;

                    const prev = document.querySelector(".pag-nav.prev");
                    const next = document.querySelector(".pag-nav.next");
                    prev.addEventListener("click", function () {
                        next.removeAttribute("style");
                        if (active.previousElementSibling) {
                            showPage(active.previousElementSibling);
                        }
                    })
                    next.addEventListener("click", function () {
                        prev.removeAttribute("style");
                        if (active.nextElementSibling) {
                            showPage(active.nextElementSibling);
                        }
                    })
                }

                const pagination = document.querySelectorAll("#js-pagination span");
                for (let span of pagination) {
                    span.addEventListener("click", function () {
                        showPage(this);
                    })
                }

                showPage(pagination[0]);

                function showPage(page) {
                    if (active) {
                        active.classList.remove("active");
                    }
                    active = page;
                    page.classList.add("active");

                    // display pagination 
                    if (resultLength / 10 >= 6) {
                        let pagArr = [];
                        for (let i of pagination) {
                            pagArr.push(i.innerText);
                            i.style.display = "none"
                        }
                        active.style.display = "block";
                        let start = +active.innerText - 1 < pagination.length - 6 ? +active.innerText - 1 : pagination.length - 7;
                        let end = +active.innerText + 4 < pagination.length ? +active.innerText + 4 : pagination.length - 1;
                        let showPag = pagArr.slice(start, end);
                        for (let i of showPag) {
                            pagination[i].style.display = "block";
                        }
                        if (active.textContent == 1) {
                            document.querySelector(".pag-nav.prev").style.display = "none";
                        } else {
                            document.querySelector(".pag-nav.prev").style.display = "block";
                        }
                        if (active.textContent == numberOfPages) {
                            document.querySelector(".pag-nav.next").style.display = "none";
                        } else {
                            document.querySelector(".pag-nav.next").style.display = "block";
                        }
                    }
                    // print search result
                    fetch(url + "s=" + search + "&page=" + page.textContent).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        const list = result.Search;
                        let item = "";
                        for (let film of list) {
                            item += `<div class="catalog__item" onclick="filmInfo('${film.imdbID}')">`;
                            item += `<div class="front-side">`;
                            item += `<img src="${film.Poster !== "N/A" ? film.Poster : 'images/no-poster.png'}" alt="${film.Title}" class="poster">`;
                            item += `<div class="back-side">`;
                            item += `<span><strong>Title:</strong> ${film.Title}</span>`;
                            item += `<span><strong>Year:</strong> ${film.Year}</span>`;
                            item += `<span><strong>Type:</strong> ${film.Type}</span>`;
                            item += `</div>`; // back-side
                            item += `</div>`; // front-side
                            item += `</div>`; // catalog__item
                        }
                        document.getElementById("catalog").innerHTML = item;
                    });
                }
            }
        } else {
            document.getElementById("catalog").innerHTML = `<div class="error">Error:<br>"${result.Error}"</div>`;
        }
    }).catch(function (e) {
        console.error(e)
    });
}

function filmInfo(id) {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    fetch(url + "i=" + id).then(function (response) {
        return response.json();
    }).then(function (result) {
        let item = "";
        item += `<div class="row">`;
        item += `<div class="col-4">`;
        item += `<img src="${result.Poster !== "N/A" ? result.Poster : 'images/no-poster.png'}" alt="${result.Title}" class="poster">`;
        item += `</div>`; // col-4;
        item += `<div class="col-8">`;
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

        document.getElementById("info").innerHTML = item;

    })
}

function clearCatalog() {
    document.getElementById("catalog").innerHTML = null;
    document.getElementById("js-pagination").innerHTML = null;
    document.getElementById("input-search").value = null;
    document.getElementById("type-search").value = "movie";
}
function modalClose() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
    document.getElementsByTagName("body")[0].removeAttribute("style");
}