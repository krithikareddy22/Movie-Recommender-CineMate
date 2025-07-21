const genreSelect = document.getElementById("genreSelect");
const movieList = document.getElementById("movieList");

let movieData = {};
let ratingData = {};

// Load movies first
fetch("../data/movie.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split("\n").slice(1);
    lines.forEach(line => {
      const [id, title, genres] = line.split(",");
      movieData[id] = {
        title: title.replace(/"/g, "").trim(),
        genres: genres.toLowerCase().split("|").map(g => g.trim())
      };
    });
    // Then load ratings
    return fetch("../data/rating_generated.csv");
  })
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split("\n").slice(1);
    lines.forEach(line => {
      const [userId, movieId, rating] = line.split(",");
      if (!ratingData[movieId]) {
        ratingData[movieId] = [];
      }
      ratingData[movieId].push(parseFloat(rating));
    });
  });

genreSelect.addEventListener("change", () => {
  const selectedGenre = genreSelect.value.toLowerCase();
  const results = [];

  for (const movieId in movieData) {
    const movie = movieData[movieId];
    const ratings = ratingData[movieId] || [];

    if (movie.genres.includes(selectedGenre) && ratings.length > 0) {
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      results.push({ title: movie.title, avgRating: avg });
    }
  }

  results.sort((a, b) => b.avgRating - a.avgRating);

  movieList.innerHTML = "";

  if (results.length === 0) {
    movieList.innerHTML = "No movies found.";
    return;
  }

  results.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `<strong>${movie.title}</strong><br>Rating: ${movie.avgRating.toFixed(1)}`;
    movieList.appendChild(div);
  });
});
