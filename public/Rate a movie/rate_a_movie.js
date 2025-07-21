let movies = [];
let ratings = {};  // Track ratings per movieId
let selectedMovie = null;

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("movieInput");
  const suggestionsDiv = document.getElementById("suggestions");
  const ratingSection = document.getElementById("ratingSection");
  const ratingInput = document.getElementById("rating");
  const submitBtn = document.getElementById("submitRating");
  const thankYou = document.getElementById("thankYou");

  // Load movies
  fetch("../data/movie.csv")
    .then((res) => res.text())
    .then((data) => {
      const lines = data.trim().split("\n").slice(1);
      movies = lines.map((line) => {
        const [id, title] = line.split(",", 2);
        return { id: id.trim(), title: title.trim() };
      });
    });

  // Load existing ratings
  fetch("../data/rating_generated.csv")
    .then((res) => res.text())
    .then((data) => {
      const lines = data.trim().split("\n").slice(1);
      for (const line of lines) {
        const [userId, movieId, rating] = line.split(",");
        const id = movieId.trim();
        const r = parseFloat(rating);
        if (!ratings[id]) ratings[id] = [];
        ratings[id].push(r);
      }
    });

  // Handle movie search input
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    suggestionsDiv.innerHTML = "";
    selectedMovie = null;
    ratingSection.style.display = "none";
    thankYou.style.display = "none";

    if (query.length === 0) return;

    const matches = movies
      .filter((m) => m.title.toLowerCase().includes(query))
      .slice(0, 5);

    matches.forEach((movie) => {
      const option = document.createElement("div");
      option.textContent = movie.title;
      option.className = "suggestion";
      option.onclick = () => {
        input.value = movie.title;
        selectedMovie = movie;
        suggestionsDiv.innerHTML = "";
        ratingSection.style.display = "block";
      };
      suggestionsDiv.appendChild(option);
    });
  });

  // Handle rating submission
  submitBtn.addEventListener("click", () => {
    const rating = parseFloat(ratingInput.value);
    if (!selectedMovie) return alert("Select a movie first!");
    if (isNaN(rating) || rating < 0.5 || rating > 5)
      return alert("Enter a rating between 0.5 and 5");

    const id = selectedMovie.id;
    if (!ratings[id]) ratings[id] = [];
    ratings[id].push(rating);

    // Calculate and log average
    const avg =
      ratings[id].reduce((sum, r) => sum + r, 0) / ratings[id].length;
    console.log(`⭐ New average for "${selectedMovie.title}": ${avg.toFixed(2)}`);

    // Send rating to server to save in CSV
    fetch("/add-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ movieId: id, rating })
    })
    .then((res) => {
      if (!res.ok) throw new Error("Server error");
      thankYou.textContent = `✅ Thank you for rating "${selectedMovie.title}" ⭐ ${rating}`;
      thankYou.style.display = "block";

      input.value = "";
      ratingInput.value = "";
      selectedMovie = null;
      ratingSection.style.display = "none";
    })
    .catch((err) => {
      console.error("❌ Error saving rating:", err);
      alert("Failed to save rating to server.");
    });
  });
});
