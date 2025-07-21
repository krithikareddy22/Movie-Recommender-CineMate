# 🎬 Movie Recommender – CineMate

A web application that allows users to:
- 🧠 Get movie recommendations based on genre
- 🔍 Search for movies and their ratings
- 📅 View top-rated movies by year
- ⭐ Submit ratings of a movie

Built using **HTML**, **CSS**, **JavaScript**, **Node.js**, and **CSV data**.

---
## 🚀 Live Demo

Visit the live app here:  
👉 [https://movie-recommender-cinemate.onrender.com/](https://movie-recommender-cinemate.onrender.com/)
---

## 📁 Project Structure

<pre><code>```Movie-Recommender-CineMate/
├── .vscode/
├── node_modules/
├── public/
│   └── assets/
├── css/
│   ├── styles.css
|   |── styles2.css
├── data/
│   ├── movie.csv
│   └── rating_generated.csv
├── genre/
│   ├── genre.html
│   └── genre.js
├── js/
│   └── scripts.js
├── Rate a movie/
│   ├── rate_a_movie.html
│   └── rate_a_movie.js
├── Searchmovie_rating/
│   ├── searchmovie.html
│   └── searchmovie.js
├── Top_rating/
│   ├── top_rating.html
│   ├── top_rating.js
│   └── get-recommendations.html
├── index.html
├── .gitignore
├── package-lock.json
├── server.js # Express backend server
├── package.json # Node.js dependencies
└── README.md # Project documentation ``` </code></pre>


---

## 🚀 Features

- 🔎 **Search Movies**: Type movie titles and get auto suggestions.
- ⭐ **Rate Movies**: Submit ratings from 0.5 to 5.
- 📊 **Dynamic Average**: View updated average rating immediately.
- 📅 **Top Movies by Year**: Explore highest-rated movies from a selected year.
- 🎬 **Genre Recommendations**: Get suggestions based on movie genre.
- 💾 **Persistent Ratings**: Ratings are saved in `rating_generated.csv`.

---

## 🧠 Technologies Used

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js + Express  
- **Storage**: CSV files (no database)  
- **Others**: DOM manipulation, Fetch API

---

## 📌 Future Improvements

- 🎭 Add user authentication  
- 📈 Use Chart.js or D3.js for rating trends  
- 💬 Implement user review system  
- 🧠 Recommend movies based on user history or favorites

---

## 🙋‍♀️ Author

Made with ❤️ by [Krithika Reddy](https://github.com/krithikareddy22)

---

## 🔧 Installation

Make sure **Node.js** is installed.

```bash
git clone https://github.com/krithikareddy22/Movie-Recommender-CineMate.git
cd Movie-Recommender-CineMate
npm install
