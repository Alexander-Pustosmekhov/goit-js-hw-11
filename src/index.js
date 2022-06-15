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

export { page, ourLightbox, nameImage };

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
    ourLightbox = new SimpleLightbox('.gallery a');
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 1) {
    page += 1;
    onClickMoreImg();
  }
});
