let buttonsFavorite = document.querySelectorAll('button.favorite-trigger');

buttonsFavorite.forEach(el => {
  el.addEventListener("click", function(e) { 
    e.stopPropagation();          
    triggerFavoriteAction(e);    
  });
});
sessionStorage.clear();
function triggerFavoriteAction(el) { 
  el.stopPropagation();   
  let action= "";
  let message= "";
  let type ="";
  // console.log(((el.target.className).split(" ").filter(val => val === "active")).length);
  if(((el.target.className).split(" ").filter(val => val === "active")).length === 0) {
    action = el.target.attributes["data-addfavorite"].value;
    message = el.target.attributes["data-addtext"].value;
    type = "add";
  } else {
    action =  el.target.attributes["data-removefavorite"].value;
    message = el.target.attributes["data-removetext"].value;
    type = "remove";
  }  
  
  let id = el.target.attributes["data-id"].value;
  let name = el.target.attributes["data-name"].value;
  let url = el.target.attributes["data-url"].value;
  let code = el.target.attributes["data-code"].value;
  let img = el.target.attributes["data-img"].value;
  let item = {id,name,url,code,img}
  obj = {action, message, type, item }
  
  fakePostObject(obj).then(function(data){
    let message = data.message;  

    if(data.type === "add") {
      (Favorite.addItem(data.item)).then((data) => { 
          // __crudeRender(data);           
          __markAdded(el);
          __updateCount((data.payload).length);  
          alert(message);        
      }).catch((error) => { 
          alert(error.message);
          // console.log(new Error(error.message))
      }); 

    } else if(data.type="remove") {
      (Favorite.removeItem(data.item)).then((data) => {          
          // __crudeRender(data); 
          __markRemoved(el);         
          __updateCount((data.payload).length);           
          alert(message);           
      }).catch((error) => { 
          alert(error.message);
          // console.log(new Error(error.message))
      }); 
    }

  });
  
}

function fakePostObject(obj){  
  return new Promise(function(resolve){
      setTimeout(function(){
          resolve(obj);
      }, 1000);
  });
}

function __markAdded(el) {
  el.target.className = [...(el.target.className).split(" "), "active"].join(" ");
  el.target.innerHTML = "Remove";
}
function __markRemoved(el) {
  el.target.className = (el.target.className).split(" ").filter(val => val !== "active").join(" ");
  el.target.innerHTML = "Add";
}
function __updateCount(val) {  
  document.getElementById("favorite-counter").innerHTML = val;
}

function __crudeRender(data){ 
  let arr = data.payload; 
  let output = `<div id="test">`;  
    arr.map(o => {
      output += `<div class="item">
        <div class="name">${o.name}</div>
        <button class="close" data-id="${o.id}">X</button>
        <div class="image"><img src="${o.img}" title="${o.name}" width="75" height="75" /></div>
      </div>`
    });
  
      
  output += '</div>';
  document.getElementById("result").innerHTML = output;

  __crudeRenderEvents();
  return output;
}

function __crudeRenderEvents(){
  let buttonsClose = document.querySelectorAll("button.close");  
  buttonsClose.forEach(el => {
    el.addEventListener("click", function(e){
      removeFavoriteItem(e);
    });
  });
}

function removeFavoriteItem(e) {
  e.preventDefault(); 
  id = e.target.attributes["data-id"].value;
  // name = e.target.attributes["data-name"].value;
  // url = e.target.attributes["data-url"].value;
  // code = e.target.attributes["data-code"].value;
  // img = e.target.attributes["data-img"].value;
  
  let obj = {id};
  (Favorite.removeItem(obj))
  .then((data) => { 
    __crudeRender(data);
    __updateCount((data.payload).length);     
  })            
  .catch((error) => {
      alert(error.message);
      // console.log(new Error(error))
  });  
}

