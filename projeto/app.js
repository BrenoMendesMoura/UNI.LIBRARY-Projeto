const base_url = "https://api.jikan.moe/v4";


function searchAnime(event) {

  event.preventDefault();

  const form = new FormData(this);
  const query = form.get("search");

  fetch(`${base_url}/anime?q=${query}&page=1`)
    .then(res => res.json())
    .then(updateDom)
    .catch(err => console.warn(err.message));
}

function updateDom(data) {

  const searchResults = document.getElementById('search-results-a');
  console.log(data.data);
  const animeByCategories = data.data
    .reduce((acc, anime) => {

      const { type } = anime;
      if (acc[type] === undefined) acc[type] = [];
      acc[type].push(anime);

      return acc;

    }, {});

  searchResults.innerHTML = Object.keys(animeByCategories).map(key => {

    const animesHTML = animeByCategories[key]

      .sort((a, b) => a.episodes - b.episodes)
      .map(anime => {
        return `<a href="${anime.url}" class="imagem" data-bs-toggle="modal" data-bs-target="#exampleModal${anime.mal_id}">
                <img class="movie" src="${anime.images.jpg.large_image_url}"  style="margin-bottom:1rem;" alt="..."></a>
              `
      }).join("");


    return `
                <section>
                    <h3  class="text-white" style="">${key}</h3>
                    <div class="text-white">${animesHTML}</div>
                    <hr class="text-white" style="">
                </section>
            `
  }).join("");
}

function searchManga(event) {

  event.preventDefault();

  const form = new FormData(this);
  const query = form.get("search_manga");

  fetch(`${base_url}/manga?q=${query}&page=1`)
    .then(res => res.json())
    .then(updateDomManga)
    .catch(err => console.warn(err.message));
}

function updateDomManga(data) {

  const searchResults = document.getElementById('search-results-m');
  console.log(data.data);
  const animeByCategories = data.data
    .reduce((acc, manga) => {

      const { type } = manga;
      if (acc[type] === undefined) acc[type] = [];
      acc[type].push(manga);
      return acc;

    }, {});

  searchResults.innerHTML = Object.keys(animeByCategories).map(key => {

    const mangaHTML = animeByCategories[key]
      .sort((a, b) => a.episodes - b.episodes)
      .map(manga => {
        return `<a href="${manga.url}" class="imagem" data-bs-toggle="modal" data-bs-target="#exampleModal${manga.mal_id}">
                                <img class="movie" src="${manga.images.jpg.large_image_url}"  style="margin-bottom:1rem;" alt="..."></a>
                              `
      }).join("");


    return `
                <section>
                    <h3 class="text-white">${key}</h3>
                    <div class="text-white">${mangaHTML}</div>
                    <hr class="text-white">
                </section>
            `
  }).join("");
}

function pageLoaded() {
  const form = document.getElementById('search_form');
  form.addEventListener("submit", searchAnime);
}
function pageLoadedManga() {
  const form_manga = document.getElementById('search_manga');
  form_manga.addEventListener("submit", searchManga);
}


window.addEventListener("load", pageLoaded);
window.addEventListener("load", pageLoadedManga);

