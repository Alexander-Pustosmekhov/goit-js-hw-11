// Imports
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from './js/refs';
import { renderCardsMarkup } from './js/render-markup';
import { fetchImages } from './js/fetch-image';
import { onClickMoreImg } from './js/service';

// Variables
const { formEl, galleryEl } = getRefs();
let page = null;
let ourLightbox = null;
let nameImage = '';

// Event listeners
formEl.addEventListener('submit', getUserValue);
// btnEl.addEventListener('click', onClickMoreImg);

// Functions
async function getUserValue(e) {
  e.preventDefault();
  nameImage = e.target.elements.searchQuery.value.trim();
  if (!nameImage) return;
  page = 1;

  try {
    const userValue = await fetchImages(nameImage);
    const userData = userValue.data;
    if (!userData.total) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    galleryEl.innerHTML = '';
    Notify.success(`Hooray! We found ${userData.totalHits} images.`);
    renderCardsMarkup(userValue);
    ourLightbox = new SimpleLightbox('.gallery a', {
      captionSelector: 'img',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
      animationSpeed: 250,
      preloading: false,
      docClose: false,
      widthRatio: 1,
      doubleTapZoom: 1.5,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export { page, ourLightbox, nameImage };

// -------------------------------------------
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  console.log('bottom', documentRect.bottom);
  if (documentRect.bottom < document.documentElement.clientHeight + 1) {
    page += 1;
    onClickMoreImg();
  }
});
