import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPhoto } from './API';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const searchQuery = searchForm.querySelector('input');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

let searchPhotos = '';
let photoSet = '';
let pageNum = 1;
let photoHits = '';

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

const list = document.createElement('ul');
list.classList.add('photo-list');
galleryContainer.append(list);

function onSubmit(event) {
  event.preventDefault();
  let search = searchQuery.value.trim();
  // console.log(searchQuery.value);

  if (search !== searchPhotos) {
    searchPhotos = search;
    list.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    giveNumOfPhotos();
    getPhotos(search, pageNum);
  }
}

async function giveNumOfPhotos() {
  const photos = await fetchPhoto(search);
  photoHits = photos.totalHits;
  if (photoHits > 0 && search !== '') {
    Notiflix.Notify.success(`Hooray! We found ${photoHits} images.`);
  }
}

function onLoadMore() {
  pageNum += 1;
  getPhotos(searchPhotos, pageNum);
}

const getPhotos = async (search, page) => {
  const photos = await fetchPhoto(search, page);
  photoSet = photos.hits;
  photoHits = photos.totalHits;
  renderPhoto(photoSet);
};

function renderPhoto(photoSet) {
  if (photoSet.length === 0 || search === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const markup = photoSet
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="photo-item"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="270" height="180" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div></li>`;
      }
    )
    .join('');

  list.insertAdjacentHTML('beforeend', markup);

  loadMoreBtn.style.display = 'block';

  finalPage = Math.ceil(Number(photoHits / 40));
  if (pageNum === finalPage) {
    onFinalPage();
  }
}

function onFinalPage() {
  loadMoreBtn.style.display = 'none';
  Notiflix.Notify.warning(
    "We're sorry, but you've reached the end of search results."
  );
}
