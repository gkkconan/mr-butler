/*   GENERAL VARIABLES   */
let deviceFile = "other/devices.json";
let nDir = "";
let roomsTitle = [];


/*   URL INFO SECTION   */
let url = window.location.href;
urlSplitted = url.split("/");
parentDir = urlSplitted[urlSplitted.length - 2];
actualFile = urlSplitted[urlSplitted.length - 1];
projectUrl = url.slice(url.indexOf(localStorage.getItem("parentDir")))
onlyPageName = actualFile.split(".")[0]


/*  ROOMS HTML REFERENCE  */
const roomsDropdown = document.querySelectorAll('.dropdown-content > a');
let pageTitle = document.querySelector('.page-title');


if(actualFile == "main.html"){
    localStorage.setItem("parentDir", parentDir);
    pageTitle.innerHTML = "Dispositivi";
}
else if(actualFile == "rooms.html"){ pageTitle.innerHTML = actualFile.split(".")[0] }
else if(actualFile == "room.html"){ pageTitle.innerHTML = localStorage.getItem("redirectToPage").split("-").join(" ") }
url.startsWith("file:///") ? alert("Applicazione avviata senza live server... \n Avviare il progetto con un server per accedere alle informazioni sui dispositivi") : undefined;
for(let i = 0; i < (projectUrl.split("/").length - 2); i++){ nDir += "../"; }





/*-------------------------------------------------*/

fetch(nDir + deviceFile)
.then((response) => response.json())
.then((json) => {
    menuRoomDisplaying(json.rooms);
    actualFile == "room.html" ? roomDevices(json) : allDevices(json.rooms);
});





/*   GETTING ROOM INFO   */

function menuRoomDisplaying(rooms){
    roomsTitle = Object.keys(rooms);

    roomsTitle.map((title, index) => {
        let room = roomsDropdown[index];
        if(room) room.textContent = title;
        else{
            const newRoom = document.createElement('a');
            newRoom.onclick = () => { redirectToRoom(title) }
            newRoom.textContent = title;
            dropdownContent.appendChild(newRoom);
        }
    })
}



function roomDevices(file){
    let roomDevices = file.rooms[localStorage.getItem("redirectToPage")];
    for(const item of roomDevices){
        createCard(item.id, item.title, item.state);
    }
}


function allDevices(rooms){
    for(const roomItems of Object.values(rooms)){
        for(const item of roomItems){ createCard(item.id, item.title, item.state, rooms) }
    }
}


function redirectToRoom(title){
    localStorage.setItem("redirectToPage", title)
    window.location.href = "http://" + localStorage.getItem("parentDir") + "/pages/rooms/room.html"
}





/*   CREATE HTML ELEMENTS   */

function createTitle(titolo) {
    const titoloElement = document.createElement('h3');
    titoloElement.textContent = titolo;
    return titoloElement;
}

function createToggle(id, statoPredefinitoAttivo, file) {
    const toggleInput = document.createElement('input');
    const sliderSpan = document.createElement('span');
    const toggleLabel = document.createElement('label');

    toggleInput.classList.add('DeviceToggleState');
    toggleInput.onclick = () => { gotToggled(id, file) }
    toggleInput.id = id
    toggleInput.type = 'checkbox';
    toggleInput.checked = statoPredefinitoAttivo;
    sliderSpan.classList.add('slider', 'round');
    toggleLabel.classList.add('switch');
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(sliderSpan);
    return toggleLabel;
}

function createCard(id, titolo, statoPredefinitoAttivo, file){
    const card = document.createElement('div');
    const titoloElement = createTitle(titolo);
    const toggleLabel = createToggle(id, statoPredefinitoAttivo, file);
    
    card.classList.add('card', 'align-row');
    card.appendChild(titoloElement);
    card.appendChild(toggleLabel);

    document.querySelector('#cards-section').appendChild(card);
    return card;
}





/*   INTERNAL FUNCTIONS   */

function gotToggled(id, file){
    let deviceToggleState = document.getElementById(id);
    deviceToggleState.checked ? console.log("button: " + id + ": STATO ATTIVATO") : console.log("button: " + id + ": STATO DISATTIVATO");
}