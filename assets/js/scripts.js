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



function gotToggled(id, initialState){
    let deviceToggleState = document.getElementById(id);
    deviceToggleState.checked ? console.log("button: " + id + ": STATO ATTIVATO") : console.log("button: " + id + ": STATO DISATTIVATO");
}