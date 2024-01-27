let url = window.location.href;
let deviceFile = "other/devices.json";
nDir = "";

urlSplitted = url.split("/");
parentDir = urlSplitted[urlSplitted.length - 2];
actualFile = urlSplitted[urlSplitted.length - 1];
projectUrl = url.slice(url.indexOf(localStorage.getItem("parentDir")))
onlyPageName = actualFile.split(".")[0]
// to set also a precedent file variable

if(actualFile == "main.html"){ localStorage.setItem("parentDir", parentDir); }
if(url.startsWith("file:///")){
    console.log("Applicazione avviata senza live server...");
    console.log("Avvia il progetto con un server per le http requests");
}

for(let i = 0; i < (projectUrl.split("/").length - 2); i++){ nDir += "../"; console.log(nDir); }

let info = {};
let roomsTitle = [];
let roomsJson;
let i = 0;

/*  ROOMS HTML REFERENCE  */
const roomsDropdown = document.querySelectorAll('.dropdown-content > a');
let pageTitle = document.querySelector('.page-title');

actualFile == "room.html" ? pageTitle.innerHTML = localStorage.getItem("redirectToPage").split("-").join(" ") : pageTitle.innerHTML = "dispositivi"


fetch(nDir + deviceFile)
    .then((response) => response.json())
    .then((json) => {
        rooms = json.rooms;
        manageData(rooms);
        if(actualFile == "room.html") manageRooms(json); // momentaneous solution
        else{ // execute to retrieve all data about all devices
            manageDevices(rooms);
        }
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
            // newRoom.href = "http://" + localStorage.getItem("parentDir") + "/pages/rooms/room.html";
            newRoom.onclick = () => { redirectToCorrectPage(title) }
            newRoom.textContent = title;
            dropdownContent.appendChild(newRoom);
        }
    });
}



/*     MANAGE CARD DEVICE     */

function manageDevices(rooms){
    for(const [roomName, roomItems] of Object.entries(rooms)){
        for(const item of roomItems){
            // console.log(item.title);
            const elementoCard = creaElementoCard(item.id, item.title, item.state);
        }
    }
}



/*------------------------------------------------------*/
/*                  CREATE CARD DEVICE                  */
/*------------------------------------------------------*/

function creaElementoCard(id, titolo, statoPredefinitoAttivo){
    const card = document.createElement('div');
    card.classList.add('card', 'align-row');
  
    const titoloElement = document.createElement('h3');
    titoloElement.textContent = titolo;
    card.appendChild(titoloElement);
  
    const toggleInput = document.createElement('input');
    toggleInput.classList.add('DeviceToggleState');
    toggleInput.onclick = () => { gotToggled(id, statoPredefinitoAttivo) }
    toggleInput.id = id
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

function insertObjectWithoutRoomProperty(obj, json){
    /* const index = json.findIndex(item => item.room === obj.room);
    if(index !== -1) json.splice(index, 1);

    json.push({ ...obj, room: undefined });
    return json; */
    localStorage.setItem("newDevice", obj)
}




/*  ADD DEVICE POPUP AND FUNCTIONS */
function toggleAddDevidePopup(){
    let popupContainer = document.querySelector(".popup-add-device");

    if(toggleP){ popupContainer.style.display = "none"; toggleP = false; }
    else{ popupContainer.style.display = "grid"; toggleP = true; }
}

document.forms.addDevice.addEventListener('submit', function(event) {
    event.preventDefault();
    toggleAddDevidePopup();
    let newDevice = {};

    newDevice['title'] = document.forms.addDevice.elements.title.value;
    newDevice['model'] = document.forms.addDevice.elements.info.value;
    newDevice['state'] = document.forms.addDevice.elements.state.checked ? true : false;
    newDevice['room'] = document.forms.addDevice.elements.room.value;
    newDevice['info'] = document.forms.addDevice.elements.info.value;
    document.forms.addDevice.reset();

    localStorage.setItem("newDevice", newDevice);
    console.log(newDevice);
    //insertObjectWithoutRoomProperty(localStorage.getItem("newDevice"), jsonFunc());
    insertObjectWithoutRoomProperty(localStorage.getItem("newDevice"));
    // console.log(jsonFunc());
});





/*  DA SCRIVERE  */

function manageRooms(file){
    let roomDevices = file.rooms[localStorage.getItem("redirectToPage")];
    console.log(file);
    console.log(file.rooms[localStorage.getItem("redirectToPage")]);
    /* for(const roomName of Object.entries(file)){
        console.log(file.rooms[onlyPageName]);
        console.log(roomName);

        if(file.hasOwnProperty(roomKey)){ roomsTitle.push(roomKey); console.log(roomKey) }
    } */
    for(const item of roomDevices){
        const elementoCard = creaElementoCard(item.id, item.title, item.state);
    }
}

function redirectToCorrectPage(title){
    localStorage.setItem("redirectToPage", title)
    window.location.href = "http://" + localStorage.getItem("parentDir") + "/pages/rooms/room.html"
}



/* for (const [roomName, roomItems] of Object.entries(rooms)) {
    for (const item of roomItems) {
        // console.log(item.title);
        const elementoCard = creaElementoCard(item.id, item.title, item.state);
    }
} */