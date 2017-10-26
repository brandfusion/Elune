import Popper from 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.5/esm/popper.min.js';
const referenceElements = document.querySelectorAll(".quantity");

let outputDiv = document.createElement('div');
outputDiv.id = "popper";
document.body.appendChild(outputDiv); 

referenceElements.forEach(function(element) {
  element.addEventListener("focusin", function(){
    let onPopper = document.querySelector("#popper");
    let message = element.attributes["data-outofstock-text"] !== undefined ? element.attributes["data-outofstock-text"].value : "Error: no out of stock text";   
    outputDiv.innerHTML = message;
    let popper = new Popper(element, onPopper, {
      placement: 'top-start'
    });
  });
});


