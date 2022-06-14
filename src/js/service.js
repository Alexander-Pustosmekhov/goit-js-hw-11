import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetch-image';
import { renderCardsMarkup } from './render-markup';
import { nameImage, page, ourLightbox } from '../index';

export async function onClickMoreImg() {
  try {
    if (page !== null) {
      //   page += 1;
      const user = await fetchImages(nameImage);
      renderCardsMarkup(user);
      ourLightbox.refresh();
      if (user.data.hits.length === 0) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
