// Imports
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Variables
const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
let counter = null;

// Event listeners
formEl.addEventListener('submit', getUserValue);
btnEl.addEventListener('click', onClickMoreImg);

// Functions
function getUserValue(event) {
  event.preventDefault();
  const nameImg = event.target.elements.searchQuery.value.trim();
  if (!nameImg) {
    return;
  }
  counter = 1;
  fetchImages(nameImg)
    .then(resolve => {
      if (!resolve.total) {
        console.log(resolve);
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      galleryEl.innerHTML = '';
      Notify.success(`Hooray! We found ${resolve.totalHits} images.`);
      renderCardsMarkup(resolve);
    })
    .catch(er => console.log(er));
}

// function fetchImages(nameImg) {
//   const BASE_KEY = '28009365-b13229069e90e89edcbb86dcf';
//   const URL = 'https://pixabay.com';
//   const options = `?key=${BASE_KEY}&q=${nameImg}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${counter}`;
//   return fetch(`${URL}/api/${options}`).then(resolve => {
//     if (!resolve.ok) {
//       throw new Error(console.log(resolve.statusText));
//     }
//     return resolve.json();
//   });
// }

function renderCardsMarkup(resolve) {
  const markup = `<ul class="gallery-list">${resolve.hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `
        <li class="gallery-list__item"><div class="photo-card">
          <a href="${largeImageURL}">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div></li>`;
      }
    )
    .join('')}</ul>`;
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function onClickMoreImg() {
  const value = inputEl.value;
  if (counter !== null) {
    counter += 1;
    fetchImages(value)
      .then(result => {
        renderCardsMarkup(result);
      })
      .catch(err => console.log(err));
  }
}
