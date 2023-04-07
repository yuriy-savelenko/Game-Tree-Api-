const upcommingGroup = document.getElementById('upcomming-group');
const popularGroup = document.getElementById('popular-group');
const newGroup = document.getElementById('new-group');
const searchGroup = document.getElementById('search-group');
const container = document.getElementById('container');
const input = document.getElementById('input');
const form = document.getElementById('form');
const infoMainContainer = document.getElementById('info_main_container');
const infoContainer = document.getElementById('info_container');
const infoScreenshotsContainer = document.getElementById('info_screenshots_container');
const infoName = document.getElementById('info_name');
const infoRating = document.getElementById('info_rating');
const infoImg = document.getElementById('info_img');
const apiResponseDataArray = [];

const makeContainerWithCards = (result, cardsContainer, element) => {
  apiResponseDataArray.push(result);
  const box = document.createElement('div');
  const link = document.createElement('a');
  let gameName = document.createElement('p');
  let gameDate = document.createElement('p');
  let gameImg = document.createElement('img');
  box.classList.add('box');
  link.classList.add('link');
  link.dataset.id = result.id;
  gameImg.classList.add('title-img');
  gameDate.classList.add('date');
  gameName.classList.add('name');
  gameName.textContent = result.name;
  gameDate.textContent = result.released;
  gameImg.src = result.background_image;
  box.append(link, gameName, gameDate, gameImg);
  cardsContainer.append(box);
  element.after(cardsContainer);
}

form.onsubmit = (event) => {
  event.preventDefault();
  element = searchGroup;
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards__container');
  if (input.value === '') {
    return;
  } fetch(`https://api.rawg.io/api/games?key=617e338437104212aac41ca5875ec598&page_size=6&search=${input.value}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((result) => makeContainerWithCards(result, cardsContainer, element),
      searchGroup.classList.remove('hide')))
    .catch((e) => {
      if (e.status === 404) {
        console.log(e);
      }
    })
};

function getDataFromApi(search, element) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards__container');
  fetch(`https://api.rawg.io/api/games?${search}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((result) => { makeContainerWithCards(result, cardsContainer, element) }))
    .catch((e) => {
      if (e.status === 404) {
        console.log(e)
      }
    })
};

getDataFromApi('dates=2023-03-28%2C2024&key=617e338437104212aac41ca5875ec598&ordering=-added&page=2&page_size=10', upcommingGroup);
getDataFromApi('dates=2022%2C2023-03-28&key=617e338437104212aac41ca5875ec598&ordering=-popularity&page=2&page_size=10', popularGroup);
getDataFromApi('dates=2022%2C2023-03-28&key=617e338437104212aac41ca5875ec598&ordering=-released&page=2&page_size=100', newGroup);

function getData(search, element) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards__container');
  fetch(`https://api.rawg.io/api/games?${search}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((result) => { makeContainerWithCards(result, cardsContainer, element) }))
    .catch((e) => {
      if (e.status === 404) {
        console.log(e)
      }
    })
};

container.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('link')) {
    infoMainContainer.classList.remove('hide');
    apiResponseDataArray.forEach((element) => {
      if (+target.dataset.id === element.id) {
        infoContainer.scrollIntoView();
        document.body.style.overflow = 'hidden';
        infoName.textContent = element.name;
        infoRating.textContent = `Rating ${element.rating}`;
        infoRating.classList.add('info_rating');
        infoImg.src = element.short_screenshots[0].image;
        infoImg.alt = element.name;
        for (let i = 1; i < element.short_screenshots.length; i++) {
          const infoImgLink = document.createElement('a');
          const infoScreenshot = document.createElement('img');
          infoScreenshot.classList.add('info_img');
          infoScreenshot.alt = element.name;
          infoScreenshot.src = element.short_screenshots[i].image;
          infoImgLink.href = element.short_screenshots[i].image;
          infoImgLink.append(infoScreenshot);
          infoScreenshotsContainer.append(infoImgLink);
        }
      }
    })
  };
  if (target === infoMainContainer) {
    infoScreenshotsContainer.replaceChildren();
    infoMainContainer.classList.add('hide');
    document.body.style.overflow = 'auto';
  }
});

