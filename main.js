import fetchJsonp from 'fetch-jsonp';
import { zipcodeValidate, showAlert } from './validate';

const fromPet = document
  .getElementById('form-pet')
  .addEventListener('submit', SearchPet);

///////////////////////////////////////
function SearchPet(e) {
  e.preventDefault();
  ///////////// Get user input
  // const animal = document.querySelector('#animal').value;
  const animal = document.getElementById('animal').value;
  const zip = document.getElementById('zip').value;

  ///// Validate Zip code
  if (!zipcodeValidate(zip)) {
    showAlert('Please Enter A Valid Zipcode', 'danger');
    return;
  }
  ///////////// Fetch Animal
  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=533c66260f6bd1086799ca12d6ac4278&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: 'callback'
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err));
}

//////// Show Animals
function showAnimals(pets) {
  const results = document.getElementById('result');
  //// clear the old data
  results.innerHTML = '';
  //// loop for animals
  pets.forEach(pet => {
    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `<div class="row">
    <div class="col-sm-6">
      <h4 class="display-2">${pet.name.$t} (${pet.age.$t})</h4>
      <p class="text-secondary">${pet.breeds.breed.$t}</p>
      <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${
      pet.contact.state.$t
    } ${pet.contact.zip.$t}</p>
      <ul class="list-group">
        <li class="list-group-item">Phone: ${pet.contact.phone.$t}</li>
        ${
          pet.contact.email.$t
            ? `<li class="list-group-item">Email: ${pet.contact.email.$t}</li>`
            : ``
        }
        <li class="list-group-item">Shelter ID: ${pet.shelterId.$t}</li>
      </ul>
    </div>
    <div class="col-sm-6 text-center">
      <img class="img-fluid rounded-circle mt-2" src="${
        pet.media.photos.photo[3].$t
      }">
    </div>
  </div>`;
    results.appendChild(div);
  });
}
