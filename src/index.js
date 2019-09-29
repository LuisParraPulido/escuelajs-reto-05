const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
localStorage.clear();

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem('next_fetch', response.info.next);
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData () {
  let next_fetch = localStorage.getItem('next_fetch')

  try {
    if (next_fetch === null) {
      getData(API);
    } else {
        if (next_fetch) {
          getData(next_fetch);
        } else {
          alert('Ya no hay personajes...')
          intersectionObserver.unobserve($observe)          
        }    
    }
  } catch (error) {
    console.error(error)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);