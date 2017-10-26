let variants = [
  {
    "id":"VO1.LO1",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO1.LO2",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO1.LO3",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO2.LO1",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO2.LO2",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO2.LO3",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO3.LO1",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO3.LO2",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  },
  {
    "id":"VO3.LO3",
    "isFavorite": false,
    "linkAddFavorite": "#add",
    "linkAddFavoriteText": "Add",
    "linkRemoveFavorite": "#remove",
    "linkRemoveFavoriteText": "Remove"
  }  
]

function validateVariant(){
  
  let variantCount = variants.length > 0 ? ((variants[0].id).split(".")).length : 0;
  let variantInputLength = (document.querySelector("#variantID").value).split(".").length;
  let isValid = variantCount === variantInputLength ? true : false;  
  return isValid;  
}

let siblings = n => [...n.parentElement.children].filter(c=>c!=n);

function selectVariantOption(e){  
  let sibllingsArray = siblings(e.target); 

  sibllingsArray.map((elem) => {  
    elem.classList.remove("active");
  });
  e.target.classList.add("active");
}

function updateVariantOption(val){    
  let optionIndex = variants
    .filter(el => {
      return (el.id).split(".").filter(x => {return x === val}).length > 0  
    })
    .map((el) => {return (el.id).split(".").indexOf(val)})[0];
  if (optionIndex !== undefined) {
    let variantInput = document.querySelector("#variantID");
    var variantValueArray = (variantInput.value).split(".");
    variantValueArray[optionIndex] = val;
    variantInput.value = variantValueArray.join(".");    
  }  
}
function registerEventsAfterFavoriteRender(){
  document.querySelector("#favorite a").addEventListener("click", e => {
    e.preventDefault();
    let isFavorite = e.target.attributes["data-favorite"].value === "true" ? true : false;   
    let variant = e.target.attributes.id.value;
  
    variants = variants.reduce((result, el, key) => {
      console.log((el.id.value, variant))
      if (el.id === variant && el.isFavorite === true) {
        el.isFavorite = false;
      } else if(el.id === variant && el.isFavorite === false) {
        el.isFavorite = true;
      }
      result = [...result, el];      
      return result
    },[]);

    renderAddToFavorite(variant);
    registerEventsAfterFavoriteRender();
    // console.log(variants);
    
  });
}
function renderAddToFavorite(variant){
  let variantObject = variants.filter(el => {return el.id == variant})[0];
  let isFavorite = variantObject.isFavorite;  
  let buttonProps = {}
  if(isFavorite === true) {    
    buttonProps = {"id": variantObject.id, "action":variantObject.linkRemoveFavorite,"value": isFavorite, "text":variantObject.linkRemoveFavoriteText}
  } else { 
    buttonProps = {"id": variantObject.id, "action":variantObject.linkAddFavorite,"value": isFavorite, "text":variantObject.linkAddFavoriteText}
    
  }
  document.querySelector("#favorite").innerHTML = `<a href="${buttonProps.action}" id="${buttonProps.id}" data-favorite="${buttonProps.value}">${buttonProps.text}</button>`;
  
}

//init


var variantButtons = document.querySelectorAll(".variant-group button");
variantButtons.forEach(el => {
  el.addEventListener("click", e => {
    selectVariantOption(e); 
    updateVariantOption(e.target.attributes["data-value"].value);
    validateVariant()
    if (validateVariant()) {
      renderAddToFavorite(document.querySelector("#variantID").value); 
      registerEventsAfterFavoriteRender(); 
    }
     
  });
});  

