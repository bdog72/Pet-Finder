import fetchJsonp from 'fetch-jsonp';
import { log } from 'util';

import { isValidZip, showAlert } from './validate';

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

// Fetch Animals from Api

function fetchAnimals(e) {
  e.preventDefault();

  // get user input
  const animal = document.querySelector('#animal').value;
  const zip = document.querySelector('#zip').value;

  // Validate zip
  if (!isValidZip(zip)) {
    showAlert('Please enter a valid zip', 'danger');
    return;
  }

  // fetch pets
  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=6074af0e5d053573ad0427f70fccb5dc&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: 'callback'
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .then(err => console.log(err));
}

// JSONP Callback
function callback(data) {
  console.log(data);
}

function showAnimals(pets) {
  const results = document.querySelector('#results');
  // Clear First
  results.innerHTML = '';
  // Loope through Pets
  pets.forEach(pet => {
    console.log(pet);

    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class='row'>
      
        <div class='col-sm-6'>
          <h4>${pet.name.$t} (${pet.age.$t})</h4>
          <p class='text-secondary'>${pet.breeds.breed.$t}</p>
          <p>${pet.contact.address1.$t} ${pet.contact.city.$t} 
          ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
          <ul class='list-group'>
            <li class='list-group-item'>Phone: ${pet.contact.phone.$t}</li>
            ${
              pet.contact.email.$t
                ? `<li class='list-group-item'>Email: ${
                    pet.contact.email.$t
                  }</li>`
                : ``
            }
                  <li class='list-group-item'>Shelter ID: ${
                    pet.shelterId.$t
                  }</li>
            </ul>
            </div>
            
            <div class='col-sm-6 text-center'>
              <img class='img-fluid rounded-circle mt-2' src='${
                pet.media.photos.photo[3].$t
              }'>
            </div>
            
            </div>
            `;

    results.appendChild(div);
  });
}
