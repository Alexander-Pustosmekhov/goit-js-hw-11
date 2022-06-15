import { getRefs } from './refs';
const { galleryEl } = getRefs();

export function renderCardsMarkup(resolve) {
  const markup = `<ul class="gallery-list">${resolve.data.hits
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
          <ul class="info">
            <li class="info-list">
              <p class="info-text">Likes :</p>
              <span>${likes}</span>
            </li>
            <li class="info-list">
              <p class="info-text">Views :</p>
              <span>${views}</span>
            </li>
            <li class="info-list">
              <p class="info-text">Comments :</p>
              <span>${comments}</span>
            </li>
            <li class="info-list">
              <p class="info-text">Downloads :</p>
              <span>${downloads}</span>
            </li>
          </ul></li>`;
      }
    )
    .join('')}</ul>`;
  drowMarkup(markup);
}

export function drowMarkup(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
