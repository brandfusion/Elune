// Message for unavailable message
let errorCombinationNotAvailable = "This option is not available for the current combination";

// Function for registering thumbnail events (in case it isn`t loaded already)
// function RegisterThumbnailEvents(scope) {
//   scope.querySelectorAll('[data-scope="thumbnail-image"]').forEach((thumbnail) => {
//     thumbnail.addEventListener("click", (e) =>{
//       let imgSrc = e.currentTarget.querySelector("img").attributes.src.value;     
//       scope.querySelector('[data-scope="product-image"]').attributes.src.value = imgSrc;    
//       siblings(e.currentTarget).map(el => {
//         scope.querySelector("img").classList.remove("border-dark");
//       });
//       e.currentTarget.querySelector("img").classList.add("border-dark");
//     });
//   });
// }


function HandleVariants(data, errorCombinationNotAvailable){  
  // Requirements: 
  // Product scope: ex:  <div class="product-order" data-scope-product-id="PRODTEST2" >
  // Product variant ex:  <input type="text" class="VariantID" disabled value="" data-scope="VariantID"/>
  // Product variant option  ex:  <button type="button" data-id="A01" value="A01" data-scope="variant">Red</button>
  // data schema:  
  // { "productId": "PRODTEST1", 
  //   "variants": [
  //     {
  //       "title": "Chantilly Lace Long Line Bralette - White",
  //       "id":"A01.B01",
  //       "stock": 1,
  //       "isFavorite": false,
  //       "addToFavoritesLink": "/favorite-api&favorite=true",
  //       "removeFromFavoritesLink": "/favorite-api&favorite=false",
  //       "addToCartLink": "/cart?ProductID=PRODTEST1&VariantID=A01.B01&Quantity="
  //     }, ...etc
  //   ]
  // } 
  let activeOptions = data.variants;
  let unavailableCombinationText = errorCombinationNotAvailable;
  let dynamicVariantLength = activeOptions[0] !== undefined ? activeOptions[0].id.split(".").length : 0; 
  let scope = document.querySelector('[data-scope-product-id="'+ data.productId+'"]');
  let variantOptions = scope.querySelectorAll('[data-scope="variant"]');

  function markSelectedVariant() {
    let variantSelected = scope.querySelector('[data-scope="VariantID"]').value;
    if(variantSelected !== "") {
      let variantSelectedArray = variantSelected.split(".");
      variantSelectedArray.map(val=>{
        let option = scope.querySelector('[data-id="'+val+'"]');
        option.classList.add("active");
      });
      markAvailableOptions();
    }
  }

  function getVariantOptionIndex(arr,val){
    return arr
      .filter(el => {
        return (el.id).split(".").filter(x => {return x === val}).length > 0  
      })
      .map((el) => {return (el.id).split(".").indexOf(val)})[0];
  }

  function combinationIsAvailable(combination){ 
    if(combination === "") {
      return false;
    } else {
      return activeOptions.filter(el => {   
        return verifyCombination(el.id,combination) && el.stock > 0;
      }).length > 0 ? true : false;
    }
    
  }
  function markAvailableOptions() {  
    let valArray = scope.querySelector('[data-scope="VariantID"]').value;    
    let variantOptions = scope.querySelectorAll('[data-scope="variant"]');
    var inactiveOptionsArray = [];
    variantOptions.forEach(el => {
      el.classList.remove("disabled");    
    });
    variantOptions.forEach(el => {
      if (!el.classList.contains("active")) {
        let obj = {};
        obj.value = el.value;
        obj.index = getVariantOptionIndex(activeOptions, el.value) !== undefined ? getVariantOptionIndex(activeOptions, el.value) : null;
        obj.node = el;
        inactiveOptionsArray = [...inactiveOptionsArray, obj];       
      } 
      
    });   
  
    inactiveOptionsArray.map((obj) => {
      let valArray = scope.querySelector('[data-scope="VariantID"]').value.split("."); 
      if (obj.index !== null) {
        valArray[obj.index] = obj.value;      
      }  else {
        //index not found, make first value of variant null = > no combination will be found
        valArray[0] = "XXXXX";
        
      }  
      let variant = valArray.join(".");      
      if(combinationIsAvailable(variant) === false) {
        obj.node.classList.add("disabled");
      }  
    });   
  }

  let _siblings = n => [...n.parentElement.children].filter(c=>c!=n);

  function selectVariantOption(e){ 
    let sibllingsArray = _siblings(e.currentTarget); 
    let isActive = (e.currentTarget.classList.contains("active"));
    let currentValue = e.currentTarget.value;
    if (!isActive) {
      sibllingsArray.map((elem) => {  
        elem.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      scope.querySelector('[data-scope="VariantID"]').value = getVariantOption(e).join(".");
    } else {
      e.currentTarget.classList.remove("active");
      scope.querySelector('[data-scope="VariantID"]').value = removeVariantOption(e).join(".");
    }
    
  }
  function getVariantOption(e) {
    let val = e.currentTarget.value;
    let optionIndex = getVariantOptionIndex(activeOptions, val);  
    let variantValueArray = scope.querySelector('[data-scope="VariantID"]').value.split(".");    
    if (optionIndex !== undefined) {           
      if(variantValueArray.length < dynamicVariantLength) {     
        variantValueArray = createEmptyVariantId(dynamicVariantLength);      
      }   
      variantValueArray[optionIndex] = val;
      return variantValueArray;
    } else {
      return [];
    }
  } 
  function removeVariantOption(e){
    let val = e.currentTarget.value;    
    let variantValueArray = scope.querySelector('[data-scope="VariantID"]').value.split("."); 
    return variantValueArray.reduce((result, value, key) => {
      if(value === val) {
        result.push("");
      } else {
        result.push(value);
      }
      return result;
    },[]);
  }
  function createEmptyVariantId(arrayLength) {
    let arr = [];
    for (let i = 0; i < arrayLength; i++) {
      arr = [...arr,""];
    }
    return arr;
  }

  function verifyCombination(variant, combination){  
    let foundArray = combination.split(".").reduce((result, value, key) => {
      variantOption = variant.split(".")[key];  
      if (value == "") {
        result.push(true);
      } else {
        if(value == variantOption) {
          result.push(true);
        } else {
          result.push(false);
        }
      }
      return result;
    },[]);  
    let result = !foundArray.includes(false);
    return result;
  }

  function isFinalOption() {
    return scope.querySelector('[data-scope="VariantID"]').value.split(".").filter(x => x !== "").length >= dynamicVariantLength;
  }

  //init
  markAvailableOptions();
  markSelectedVariant();

  //register events
  variantOptions.forEach((el)=>{  
    el.addEventListener("click", (e) => {  
      e.stopPropagation();  
      if(combinationIsAvailable(getVariantOption(e).join("."))) {    
        selectVariantOption(e); 
        markAvailableOptions();
      } else {        
        alert (unavailableCombinationText);
      } 
    });
  });
}

function RegisterGlobalEventsProductDetail(data) { 
  // Register events for each product id found in data 
  // data schema:  
  // { "productId": "PRODTEST1", 
  //   "variants": [
  //     {
  //       "title": "Chantilly Lace Long Line Bralette - White",
  //       "id":"A01.B01",
  //       "stock": 1,
  //       "isFavorite": false,
  //       "addToFavoritesLink": "/favorite-api&favorite=true",
  //       "removeFromFavoritesLink": "/favorite-api&favorite=false",
  //       "addToCartLink": "/cart?ProductID=PRODTEST1&VariantID=A01.B01&Quantity="
  //     }, ...etc
  //   ]
  // } 
  let activeOptions = data !== undefined ? data.variants : [];
  let scope = document.querySelector('[data-scope-product-id="'+ data.productId+'"]');

  //order submit
  scope.querySelector('[data-scope="addToCart"]').addEventListener("click", function(e){
    e.preventDefault();
    let variantSelected = scope.querySelector('[data-scope="VariantID"]').value;
    let dynamicVariantLength = activeOptions[0] !== undefined ? activeOptions[0].id.split(".").length : 0;
    let variantIsValid = variantSelected !== "" && variantSelected.split(".").filter(x=>{ return x !== ""}).length === dynamicVariantLength;    
    let currentValue = scope.querySelector('[data-scope="quantity"]').value;   
    if(variantIsValid) {
      let variant = activeOptions.filter(x => { return x.id === variantSelected})[0];
      if (currentValue > variant.stock) {
        let confirmAlert = confirm("Quantity selected is unavaialable. The maximum stock is " + variant.stock + ". Do you want to order the maximum amount ?");
        if (confirmAlert === true) {          
          scope.querySelector('[data-scope="quantity"]').value = variant.stock;
          alert(variant.addToCartLink + variant.stock);
        } 
      } else {
        alert(variant.addToCartLink + currentValue);
      }
    } else {
      alert("Please select variant options");
    }
  });

  //add to favorites
  scope.querySelector(".addToFavorites").addEventListener("click", (e) => {
    let variantSelected = scope.querySelector('[data-scope="VariantID"]').value;  
    let filteredVariantSelected = activeOptions.filter(x => {return x.id === variantSelected})[0];
    let filteredVariantSelectedIndex = activeOptions.findIndex(x => x.id === variantSelected);
    let updatedFilteredVariantSelected = {...filteredVariantSelected};
    if (filteredVariantSelected.hasOwnProperty('isFavorite')) {
      updatedFilteredVariantSelected = {...filteredVariantSelected, "isFavorite": true};
    } else {
      throw new Error("isFavorite property does not exist");      
    }
    alert(filteredVariantSelected.addToFavoritesLink);  
    
    let updatedActiveOptions = [
      ...activeOptions.slice(0, filteredVariantSelectedIndex),
      updatedFilteredVariantSelected,
      ...activeOptions.slice(filteredVariantSelectedIndex + 1)
    ];    
    activeOptions = [...updatedActiveOptions];    
    scope.querySelector(".addToFavorites").classList.add("hidden");
    scope.querySelector(".removeFromFavorites").classList.remove("hidden");    
  });

  //remove from favorites 
  scope.querySelector(".removeFromFavorites").addEventListener("click", (e) => {
    let variantSelected = scope.querySelector('[data-scope="VariantID"]').value;  
    let filteredVariantSelected = activeOptions.filter(x => {return x.id === variantSelected})[0];
    let filteredVariantSelectedIndex = activeOptions.findIndex(x => x.id === variantSelected);
    let updatedFilteredVariantSelected = {...filteredVariantSelected};
    if (filteredVariantSelected.hasOwnProperty('isFavorite')) {
      updatedFilteredVariantSelected = {...filteredVariantSelected, "isFavorite": false};
    } else {
      throw new Error("isFavorite property does not exist");      
    }
    alert(filteredVariantSelected.removeFromFavoritesLink);  
    
    let updatedActiveOptions = [
      ...activeOptions.slice(0, filteredVariantSelectedIndex),
      updatedFilteredVariantSelected,
      ...activeOptions.slice(filteredVariantSelectedIndex + 1)
    ];
    activeOptions = [...updatedActiveOptions];
    scope.querySelector(".addToFavorites").classList.remove("hidden");
    scope.querySelector(".removeFromFavorites").classList.add("hidden");   
  });
  
  //favorite container display
  let variantOptions = scope.querySelectorAll('[data-scope="variant"]');
  variantOptions.forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      let variantSelected = scope.querySelector('[data-scope="VariantID"]').value;
      let dynamicVariantLength = activeOptions[0] !== undefined ? activeOptions[0].id.split(".").length : 0;
      let variantIsValid = variantSelected !== "" && variantSelected.split(".").filter(x=>{ return x !== ""}).length === dynamicVariantLength;  
      if(variantIsValid) {
        let filteredVariantSelected = activeOptions.filter(x => {return x.id === variantSelected})[0];
        let isFavorite = filteredVariantSelected.isFavorite;
        if(!isFavorite) {
          scope.querySelector(".addToFavorites").classList.remove("hidden");
          scope.querySelector(".removeFromFavorites").classList.add("hidden");
        } else {
          scope.querySelector(".addToFavorites").classList.add("hidden");
          scope.querySelector(".removeFromFavorites").classList.remove("hidden");
        }
        scope.querySelector(".favorite-container").classList.remove("hidden");
      } else {
        scope.querySelector(".favorite-container").classList.add("hidden");
      }
    });
  });

  //image variant replacement
  //Requirements:
  //Active options array 
  //Set scope to thumbnail wrapper:  data-scope="thumbnail-container"
  //Set scope to mani product image:   data-scope="product-image"
  let colorVariants = scope.querySelector(".color").querySelectorAll('[data-scope="variant"]');
  colorVariants.forEach(el => {
    el.addEventListener("click", (e) => {
     
      if (!e.currentTarget.classList.contains("disabled")) {
        let currentValue = e.currentTarget.value;        
        let filteredVariantSelected = activeOptions.filter(x => {return (x.id).includes(currentValue)})[0];
        let variantImageArray = filteredVariantSelected.images;
        if (variantImageArray.length > 0) {          
          scope.querySelector('[data-scope="product-image"]').attributes.src.value = variantImageArray[0];         
          RenderThumbnails(variantImageArray, scope);
          RegisterThumbnailEvents(scope);
        }

        
      }
    });
  });
}

function RenderThumbnails(arr, scope) {  
  let divClass = scope.querySelector('[data-scope="thumbnail-image"]').classList.value;  
  scope.querySelectorAll('[data-scope="thumbnail-image"]').forEach(el => {
    el.remove();
  });
  let htmlContent = arr.reduce((result,src,index) => {
    let imageClass = index === 0 ? "img-fluid img-thumbnail rounded-0 border-dark" : "img-fluid img-thumbnail rounded-0"; 
    let content = `<div data-scope="thumbnail-image" class="${divClass}"><img src="${src}" class="${imageClass}" alt="" /></div>`;
    result = result + content;
    return result;  
  },"");
  scope.querySelector('[data-scope="thumbnail-container"]').innerHTML = htmlContent;
}


//init
fetch("resources/dataset.json")
  .then((response) => {return response.json()})
  .catch((error) => {
    throw Error("Loading JSON failed !");
  })
  .then((data) => {  
    data.map(obj => {
    HandleVariants(obj, errorCombinationNotAvailable);
    RegisterGlobalEventsProductDetail(obj);
  })
});

