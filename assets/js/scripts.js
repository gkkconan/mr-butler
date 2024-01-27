let toggleS = false;
let toggleP = false;

let menu = document.querySelector("nav > ul");
let dropdown = document.querySelector(".dropdown");
let dropdownContent = document.querySelector(".dropdown-content");


function toggleSidebar(){
    if(toggleS){ menu.style.transform = "translateY(-350px)"; menu.classList.remove("mobile-menu"); toggleS = false; }
    else{ menu.style.transform = "translateY(0)"; menu.classList.add("mobile-menu"); toggleS = true; }
}

window.addEventListener('resize', () => {
    if(window.innerWidth > 670){ menu.classList.remove("mobile-menu"); menu.style.transform = "translateY(0)"; }
    if(window.innerWidth < 670){menu.classList.add("mobile-menu"); menu.style.transform = "translateY(-350px)"; }
});



/*   DROPDOWN SCRIPTS   */
dropdown.addEventListener('mouseover', () => {  dropdownContent.style.display = 'flex';  });
dropdown.addEventListener('mouseleave', () => {  dropdownTime = setTimeout(function(){dropdownContent.style.display = 'none';}, 150);  });
dropdownContent.addEventListener('mouseover', () => {  clearTimeout(dropdownTime); dropdownContent.style.display = 'flex';  });
dropdownContent.addEventListener('mouseleave', () => {  dropdownContent.style.display = 'none';  });




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
});



function toggleAddDevidePopup(){
    let popupContainer = document.querySelector(".popup-add-device");
    if(toggleP){ popupContainer.style.display = "none"; toggleP = false; }
    else{ popupContainer.style.display = "grid"; toggleP = true; }
}