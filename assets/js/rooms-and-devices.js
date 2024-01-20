let info = {};
let roomsTitle = [];
let rooms;
let i = 0;

/*  ROOMS HTML REFERENCE  */
const roomsDropdown = document.querySelectorAll('.dropdown-content > a');


fetch('../other/devices.json')
    .then((response) => response.json())
    .then((json) => {
        info = json;
        rooms = info.rooms;
        manageData(rooms);
        manageDevices(rooms);
    })
    .catch((error) => {
        console.error('Errore durante il recupero dei dati:', error);
    });

function manageData(rooms) {
    for (const roomKey in rooms){
        if (rooms.hasOwnProperty(roomKey)){ roomsTitle.push(roomKey); }
    }

    roomsTitle.forEach((title, index) => {
        if (roomsDropdown[index]) {
            roomsDropdown[index].textContent = title;
        } else {
            const newRoom = document.createElement('a');
            newRoom.href = '#';
            newRoom.textContent = title;
            dropdownContent.appendChild(newRoom);
        }
    });
}



/*     MANAGE CARD DEVICE     */

function manageDevices(rooms){
    for (const [roomName, roomItems] of Object.entries(rooms)) {
        for (const item of roomItems) {
            console.log(item.title);

            const elementoCard = creaElementoCard(item.title, item.state);
        }
    }
}



/*------------------------------------------------------*/
/*                  CREATE CARD DEVICE                  */
/*------------------------------------------------------*/

function creaElementoCard(titolo, statoPredefinitoAttivo){
    const card = document.createElement('div');
    card.classList.add('card', 'align-row');
  
    const titoloElement = document.createElement('h3');
    titoloElement.textContent = titolo;
    card.appendChild(titoloElement);
  
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.checked = statoPredefinitoAttivo;
  
    const sliderSpan = document.createElement('span');
    sliderSpan.classList.add('slider', 'round');
  
    const toggleLabel = document.createElement('label');
    toggleLabel.classList.add('switch');
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(sliderSpan);

    document.querySelector('#cards-section').appendChild(card);
    card.appendChild(toggleLabel)
  
    return card;
}