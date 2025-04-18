const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies() {
    showSpinner();
    const { results } = await fetchData('movie/popular');
    results.forEach((movie) => {
        console.log(movie);
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />` : 
                    `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });
    hideSpinner();
}

async function displayPopularShows() {
    showSpinner();
    const { results } = await fetchData('tv/popular');
    results.forEach((show) => {
        console.log(show);
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
            ${
                show.poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />` : 
                    `<img src="images/no-image.jpg" class="card-img-top" alt="${show.name}" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });
    hideSpinner();
}

const displayMovieDetails = async () => {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchData(`movie/${movieId}`);
    displayBackgroundImage('movie', movie.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
    <div>
            ${movie.backdrop_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="card-img-top" alt="${movie.title}" />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`}
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${movie.genres.map((genre) =>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> $${movie.runtime}</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) =>`${company.name}`).join(', ')}</div>
        </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
}

async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
    const show = await fetchData(`tv/${showId}`);
    console.log(show);
    displayBackgroundImage('show', show.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
          <div>
            ${show.backdrop_path ? `<img src="https://image.tmdb.org/t/p/w500${show.backdrop_path}" class="card-img-top" alt="Show Name" />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Show Name"
            />`}
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${show.genres.map(genre=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.air_date}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) =>`${company.name}`).join(', ')}</div>
        </div>
    `;

    document.querySelector('#show-details').appendChild(div);
}

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100%';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
    if (type === 'movie') {   
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

async function displaySlider(){
    const {results} = await fetchData('movie/now_playing');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />` : `<img src="./images/no-image.jpg" alt="${movie.title}" />`}
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
    });
    initSwiper();
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

//fetch data from TMDB API
async function fetchData(endpoint) {
    const API_KEY = '59b88aab59946920bc6e556c6edf593a';
    const API_URL = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

function init () {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            console.log('home');
            break;
        case '/search.html':
            console.log('search');
            break;
        case '/movie-details.html':
            displayMovieDetails();
            console.log('one movie details');
            break;
        case '/tv-details.html':
            displayShowDetails();
            console.log('one show details');
            break;
        case '/shows.html':
            displayPopularShows();
            console.log('all the shows');
            break;
    }
    highlightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);