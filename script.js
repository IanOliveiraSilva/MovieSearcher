document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#search-form');
    const input = document.querySelector('#search-input');
    const resultsList = document.querySelector('#results');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      const apiKey = '41459cb7';
      const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.Search && data.Search.length > 0) {
          resultsList.innerHTML = '';
          data.Search.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.Title;
            li.addEventListener('click', async () => {
              const detailsUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
              const detailsResponse = await fetch(detailsUrl);
              const detailsData = await detailsResponse.json();
              const details = document.createElement('div');
              details.innerHTML = `
                <h2>${detailsData.Title} (${detailsData.Year})</h2>
                <img src="${detailsData.Poster}" alt="${detailsData.Title} poster">
                <p>${detailsData.Plot}</p>
                <ul>
                  <li><strong>Director:</strong> ${detailsData.Director}</li>
                  <li><strong>Released:</strong> ${detailsData.Released}</li>
                  <li><strong>Writer:</strong> ${detailsData.Writer}</li>
                  <li><strong>Country:</strong> ${detailsData.Country}</li>
                  <li><strong>Box Office:</strong> ${detailsData.BoxOffice}</li>
                  <li><strong>Awards:</strong> ${detailsData.Awards}</li>
                  <li><strong>Actors:</strong> ${detailsData.Actors}</li>
                  <li><strong>Genre:</strong> ${detailsData.Genre}</li>
                  <li><strong>Runtime:</strong> ${detailsData.Runtime}</li>
                  <li><strong>Rated:</strong> ${detailsData.Rated}</li>
                  <li><strong>IMDb Rating:</strong> ${detailsData.imdbRating}</li>
                  <li><strong>Metascore Rating:</strong> ${detailsData.Metascore}</li>
                </ul>
                <a href="" class="btn-back">Voltar</a>
              `;
              resultsList.innerHTML = '';
              resultsList.appendChild(details);
            });
            resultsList.appendChild(li);
          });
        } else {
          resultsList.innerHTML = 'No results found.';
        }
  
      } catch (error) {
        console.log(error);
      }
    });
  });
  
const backButton = document.querySelector('.btn-back');
backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});