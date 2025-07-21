let movieData = {};
let ratingData = {};

async function loadData() {
  const movieText = await fetch('../data/movie.csv').then(res => res.text());
  const ratingText = await fetch('../data/rating_generated.csv').then(res => res.text());

  const movieLines = movieText.trim().split('\n').slice(1);
  movieLines.forEach(line => {
    const [id, title] = line.split(',', 2);
    const yearMatch = title.match(/\((\d{4})\)/);
    const year = yearMatch ? yearMatch[1] : 'N/A';
    movieData[id.trim()] = {
      id: id.trim(),
      title: title.trim(),
      year
    };
  });

  const ratingLines = ratingText.trim().split('\n').slice(1);
  ratingLines.forEach(line => {
    const [_, movieId, ratingStr] = line.split(',', 3);
    const rating = parseFloat(ratingStr);
    const id = movieId.trim();
    if (!ratingData[id]) ratingData[id] = [];
    ratingData[id].push(rating);
  });
}

function setupLiveSearch() {
  const input = document.getElementById('searchInput');
  const resultDiv = document.getElementById('searchResults');

  input.addEventListener('input', () => {
    const keyword = input.value.toLowerCase().trim();
    resultDiv.innerHTML = '';

    if (keyword.length === 0) return;

    const matches = [];

    for (const movieId in movieData) {
      const { title, year } = movieData[movieId];
      if (title.toLowerCase().includes(keyword)) {
        const ratings = ratingData[movieId] || [];
        const avgRating = ratings.length > 0
          ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
          : 'N/A';
        matches.push({ title, year, avgRating });
      }
    }

    if (matches.length === 0) {
      resultDiv.textContent = 'No matching movies found.';
      return;
    }

    matches.slice(0, 5).forEach(m => {
      const div = document.createElement('div');
      div.className = 'movie-card';
      div.innerHTML = `<strong>${m.title}</strong><br>Year: ${m.year}<br>Avg Rating: ⭐ ${m.avgRating}`;
      resultDiv.appendChild(div);
    });
  });
}

window.onload = async () => {
  await loadData();
  setupLiveSearch();
};
