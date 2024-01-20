let toggleS = false;
let toggleP = false;

let menu = document.querySelector('nav > ul');
let dropdown = document.querySelector(".dropdown");
let dropdownContent = document.querySelector(".dropdown-content");


function toggleSidebar(){
    if(toggleS){ menu.style.transform = "translateY(-350px)"; menu.classList.remove("mobile-menu"); toggleS = false; }
    else{ menu.style.transform = "translateY(0)"; menu.classList.add("mobile-menu"); toggleS = true; }
}

window.addEventListener('resize', function(){
    if(window.innerWidth > 670){ menu.classList.remove("mobile-menu"); menu.style.transform = "translateY(0)"; }
    if(window.innerWidth < 670){menu.classList.add("mobile-menu"); menu.style.transform = "translateY(-350px)"; }
});


function toggleAddDevidePopup(){
    let popupContainer = document.querySelector(".popup-add-device");

    if(toggleP){ popupContainer.style.display = "none"; toggleP = false; }
    else{ popupContainer.style.display = "grid"; toggleP = true; }
}


/*   DROPDOWN SCRIPTS   */
dropdown.addEventListener('mouseover', () => {  dropdownContent.style.display = 'flex';  });
dropdown.addEventListener('mouseout', () => {  dropdownTime = setTimeout(function(){dropdownContent.style.display = 'none';}, 1000);  });
dropdownContent.addEventListener('mouseover', () => {  clearTimeout(dropdownTime); dropdownContent.style.display = 'flex';  });
dropdownContent.addEventListener('mouseout', () => {  dropdownContent.style.display = 'none';  });