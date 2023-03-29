const upcommingGroup = document.getElementById('upcomming-group');
const popularGroup = document.getElementById('popular-group');
const newGroup = document.getElementById('new-group');
const container = document.getElementById('container');
const input = document.getElementById('input');
const inputValue = input.getAttribute('value');

// let regExp = `${}`

// function compareInputValue(value) {
//   if (inputValue.match === gameName) {
//     console.log('ищем')
//   }
// }

function getDataFromApi(search, element) {
  const cards__container = document.createElement('div');
  cards__container.classList.add('cards__container');
  fetch(`https://api.rawg.io/api/games?${search}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((result => {
      const box = document.createElement('div');
      let gameName = document.createElement('p');
      let gameDate = document.createElement('p');
      let gameImg = document.createElement('img');
      element.after(cards__container);
      cards__container.append(box);
      box.append(gameName);
      box.append(gameDate);
      box.append(gameImg);
      gameImg.classList.add('title-img');
      box.classList.add('box');
      gameDate.classList.add('date');
      gameName.classList.add('name');
      gameName.textContent = result.name;
      gameDate.textContent = result.released;
      gameImg.src = result.background_image
    })))
    .catch((e) => {
      if (e.status === 404) {
        console.log(e)
      }
    })

}
getDataFromApi('dates=2023-03-28%2C2024&key=617e338437104212aac41ca5875ec598&ordering=-added&page=2&page_size=10', upcommingGroup);
getDataFromApi('dates=2022%2C2023-03-28&key=617e338437104212aac41ca5875ec598&ordering=-popularity&page=2&page_size=10', popularGroup);
getDataFromApi('dates=2022%2C2023-03-28&key=617e338437104212aac41ca5875ec598&ordering=-released&page=2&page_size=100', newGroup);
