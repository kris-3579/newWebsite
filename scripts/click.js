
// Global indexes to track the current slide in each category
var slideIndexAlbums = 0;
var slideIndexMovies = 0;
var slideIndexBooks = 0;
var slideshowPaused = false;

// Function for albums
function albumShow(n) {
    var albums = document.getElementsByClassName("albums");
    var dots = document.getElementsByClassName("dot1");

    for (var i = 0; i < albums.length; i++) {
        albums[i].style.display = "none";
        dots[i].style.backgroundColor = "#bbb";
    }

    albums[n].style.display = "block";
    dots[n].style.backgroundColor = "#717171";

    slideIndexAlbums = n + 1;
    if (slideIndexAlbums >= albums.length) { slideIndexAlbums = 0; }

    setTimeout(() => albumShow(slideIndexAlbums), 10000);
}

// Function for movies
function movieShow(n) {

    if (slideshowPaused) return;
    var movies = document.getElementsByClassName("movies");
    var dots = document.getElementsByClassName("dot2");

    for (var i = 0; i < movies.length; i++) {
        movies[i].style.display = "none";
        dots[i].style.backgroundColor = "#bbb";
    }

    movies[n].style.display = "block";
    dots[n].style.backgroundColor = "#717171";

    slideIndexMovies = n + 1;
    if (slideIndexMovies >= movies.length) { slideIndexMovies = 0; }

    setTimeout(() => movieShow(slideIndexMovies), 10000);
}

// Function for books
function bookShow(n) {
    var books = document.getElementsByClassName("books");
    var dots = document.getElementsByClassName("dot3");

    for (var i = 0; i < books.length; i++) {
        books[i].style.display = "none";
        dots[i].style.backgroundColor = "#bbb";
    }

    books[n].style.display = "block";
    dots[n].style.backgroundColor = "#717171";

    slideIndexBooks = n + 1;
    if (slideIndexBooks >= books.length) { slideIndexBooks = 0; }

    setTimeout(() => bookShow(slideIndexBooks), 10000);
}

document.addEventListener("DOMContentLoaded", function () {
    var dotsAlbums = document.getElementsByClassName("dot1");
    var dotsMovies = document.getElementsByClassName("dot2");
    var dotsBooks = document.getElementsByClassName("dot3");

    // Event listeners for album dots
    for (let i = 0; i < dotsAlbums.length; i++) {
        dotsAlbums[i].addEventListener("click", function () {
            albumShow(i);
        });
    }

    // Event listeners for movie dots
    for (let i = 0; i < dotsMovies.length; i++) {
        dotsMovies[i].addEventListener("click", function () {
            movieShow(i);
            slideshowPaused = false;
        });
    }

    // Event listeners for book dots
    for (let i = 0; i < dotsBooks.length; i++) {
        dotsBooks[i].addEventListener("click", function () {
            bookShow(i);
        });
    }

});

// Start all slideshows
albumShow(0);
movieShow(0);
bookShow(0);
  


