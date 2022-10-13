const API_KEY = 'aa18879fa7935b87fd847eb05eafc989';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?api_key=aa18879fa7935b87fd847eb05eafc989&sort_by=popularity.desc&page=1';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?api_key=aa18879fa7935b87fd847eb05eafc989'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML= '';

    movies.forEach((movie)=>{
        const {title, poster_path, vote_average, release_date,overview} = movie;
        const moviesElement = document.createElement('div');
        moviesElement.classList.add('card');
        moviesElement.innerHTML= `
            <a href="#"><img src="${IMG_URL+poster_path}" class="card-img-top" alt="${title}"></a>
            <div class="card-body">
                <div class="keterangan d-flex">
                    <h3 class="card-text">
                        <a href="#">${title}</a>
                    </h3>
                    <span class="${getColor(vote_average)}"><p>${vote_average}</p></span>
                </div>
                <div class="release_date">
                    ${release_date}
                </div>
            </div>
            <div class="overview">
                ${overview}
            </div>
        `
        main.appendChild(moviesElement)
    })
}

function getColor(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const searchTerm =search.value;

    if(searchTerm){
        getMovies(SEARCH_URL+'&query='+searchTerm+'&page=1');
    }
    else{
        getMovies(API_URL
            )
    }
})