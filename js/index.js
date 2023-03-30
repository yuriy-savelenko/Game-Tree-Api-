const upcommingGroup = document.getElementById('upcomming-group');
const popularGroup = document.getElementById('popular-group');
const newGroup = document.getElementById('new-group');
const searchGroup = document.getElementById('search-group');
const container = document.getElementById('container');
const input = document.getElementById('input');
const form = document.getElementById('form');


const makeContainerWithCards = (result, cards__container, element) => {
  const box = document.createElement('div');
  const link = document.createElement('a');
  let gameName = document.createElement('p');
  let gameDate = document.createElement('p');
  let gameImg = document.createElement('img');
  box.append(link, gameName, gameDate, gameImg);
  box.classList.add('box');
  link.classList.add('link');
  gameImg.classList.add('title-img');
  gameDate.classList.add('date');
  gameName.classList.add('name');
  gameName.textContent = result.name;
  gameDate.textContent = result.released;
  gameImg.src = result.background_image;
  cards__container.append(box);
  element.after(cards__container);
}



form.onsubmit = (event) => {
  event.preventDefault();
  element = searchGroup;
  if (container.children[1] !== upcommingGroup) {
    container.children[1].remove()
  }
  // console.log(container.children)
  const cards__container = document.createElement('div');
  cards__container.classList.add('cards__container');
  if (input.value === '') {
    return;
  } fetch(`https://api.rawg.io/api/games?key=617e338437104212aac41ca5875ec598&page_size=6&search=${input.value}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((result) => makeContainerWithCards(result, cards__container, element),
      searchGroup.classList.remove('hide')))
    .catch((e) => {
      if (e.status === 404) {
        console.log(e)
      }
    })
}

function getDataFromApi(search, element) {
  const cards__container = document.createElement('div');
  cards__container.classList.add('cards__container');
  fetch(`https://api.rawg.io/api/games?${search}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((result) => makeContainerWithCards(result, cards__container, element))
      .catch((e) => {
        if (e.status === 404) {
          console.log(e)
        }
      })

    )
}
getDataFromApi('dates=2023-03-28%2C2024&key=617e338437104212aac41ca5875ec598&ordering=-added&page=2&page_size=10', upcommingGroup);
getDataFromApi('dates=2022%2C2023-03-28&key=617e338437104212aac41ca5875ec598&ordering=-popularity&page=2&page_size=10', popularGroup);
getDataFromApi('dates=2022%2C2023-03-28&key=617e338437104212aac41ca5875ec598&ordering=-released&page=2&page_size=100', newGroup);



// container.addEventListener('click', (event) => {
//   const target = event.target;
//   if (target.classList.contains('link')) {
//     const info_container = document.createElement('div');
//     let info_name = document.createElement('h3');
//     let info_rate = document.createElement('p');
//   } else {
//     console.log('Мимо')
//   }
// })