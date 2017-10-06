function __crudeRender(data){ 
    let arr = data.payload; 
    let output = `<div id="compare-output-content">`; 
    if(data.context === "list") {
      arr.map(o => {
        output += `<div class="item">
          <div class="name">${o.name}</div>
          <button class="close" data-id="${o.id}">X</button>
          <div class="image"><img src="${o.img}" title="${o.name}" width="75" height="75" /></div>
        </div>`
      });
    } else if(data.context === "product") {
      if(arr.length >= 2) {
        arr.map((o,i) => {         
          output += `<div class="item">
            <div class="name">${o.name}</div>`
            if(i !== 0) {
              output += `<button class="close" data-id="${o.id}">X</button>`
            }            
            output += `<div class="image"><img src="${o.img}" title="${o.name}" width="75" height="75" /></div>
          </div>`
        });
      }
    }   
    let stringCompareIds = (data.payload).reduce((result, value, key)=>{
      result = [...result, value.id];
      return result;
    },[]).join(",")
   
    if ((data.payload).length > 1) {
      output += `<div class="compare-output-action"><a href="/Default.aspx?ID=77&compare=${stringCompareIds}"><i class="fa fa-exchange"></i> Compare</a></div>`;    
    }
    
    output += '</div>';
         
    document.getElementById("compare-output").innerHTML = output;
    
    __crudeRenderEvents();
    return output;
}
function __markDOMCompareElement(el){
  el.attributes.class.value = [...(el.attributes.class.value).split(" "), "active"].join(" ");        
  if(el.children.length > 0) {
    let iconClassArray = el.children[0] !== undefined ? el.children[0].attributes.class.value.split(" ").filter(x => x !== "fa-square-o") : [];          
    el.children[0].attributes.class.value = [...iconClassArray, "fa-check-square-o"].join(" ");
  }
}
function __unmarkDOMCompareElement(el) {
  el.attributes.class.value = (el.attributes.class.value).split(" ").filter(x => x !== "active").join(" ");
  if(el.children.length > 0) {
    let iconClassArray = el.children[0] !== undefined ? el.children[0].attributes.class.value.split(" ").filter(x => x !== "fa-check-square-o") : [];          
    el.children[0].attributes.class.value = [...iconClassArray, "fa-square-o"].join(" ");
  }
}
function __crudeRenderEvents(){
    let buttonsClose = document.querySelectorAll("#compare-output .close");  
    buttonsClose.forEach(el => {
      el.addEventListener("click", e => {
        removeCompareItem(e);
      });
   
    });
}
function __uncheckDOMElements(id) {
  let buttons = document.querySelectorAll('.compare-trigger');
  buttons.forEach(el => {    
    if(el.attributes["data-id"].value === id) {      
      __unmarkDOMCompareElement(el);
    }
  });
}
function __checkDOMElements(id) {
  let buttons = document.querySelectorAll('.compare-trigger');
  buttons.forEach(el => {    
    if(el.attributes["data-id"].value === id) {      
      __markDOMCompareElement(el);
    }
  });
}
function __markAllItemsInCompareList(data) {
  (data.payload).map(o => {
    __checkDOMElements(o.id);
  });
}
function addCompareItem(e) {
  e.preventDefault(); 
  return new Promise((resolve,reject) => {   
    let id = e.currentTarget.attributes["data-id"].value;
    let name = e.currentTarget.attributes["data-name"].value;
    let url = e.currentTarget.attributes["data-url"].value;
    let code = e.currentTarget.attributes["data-code"].value;
    let img = e.currentTarget.attributes["data-img"].value;
    let obj = {name,id,code,img,url};     

    (Compare.addItem(obj)).then((data) => {  
        __crudeRender(data);
        resolve(true);
    }).catch((error) => { 
        // alert();
        reject(error.message);
    }); 

  });
}


function removeCompareItem(e) {
  e.preventDefault(); 
  return new Promise((resolve,reject) => {   
    let id = e.currentTarget.attributes["data-id"].value;   
    
    let obj = {id};
    __uncheckDOMElements(id);
    (Compare.removeItem(obj))
      .then((data) => {      
          __crudeRender(data);
          resolve(true);
      })            
      .catch((error) => {
        reject(error.message);     
      }); 
  });  
}

//events on init
let buttonsTrigger = document.querySelectorAll('.compare-trigger');
buttonsTrigger.forEach(el => {
  el.addEventListener("click", function(e) {   
    let classList = (e.currentTarget.attributes.class.value).split(" ");  
    let hasActive = classList.filter(x => x === "active").length > 0 ? true : false;   
    if(!hasActive) {
      addCompareItem(e).then(data => {
       //adds active class on button & class on <i> if exists
        __markDOMCompareElement(e.currentTarget);
        
      }).catch((error) => {         
        alert(error);
      });
    } else {
      removeCompareItem(e).then(data => {
        //remove active class on button & class on <i> if exists
        __unmarkDOMCompareElement(e.currentTarget);
        
      });
    }
    
  });
});

    

//init

let buttonProduct = document.getElementById("product");
let buttonList = document.getElementById("list");

buttonProduct.addEventListener("click", function(){
  let currentProduct = {name: "TEST", id: "PRODTEST", code: "code test", img: "http://via.placeholder.com/300x300", url: "/#test"};
  (Compare.initWithProduct(currentProduct)).then((data) => {    
    let outputDiv = document.createElement('div');
    outputDiv.id = "compare-output";
    document.body.appendChild(outputDiv);  
    __crudeRender(data);
    __markAllItemsInCompareList(data);
    })
    .catch((error)=>{
      console.log(error);
    });

  document.getElementById("options").setAttribute("style", "display: none;");
  document.getElementById("wrapper").removeAttribute("style");
});

buttonList.addEventListener("click", function(){
  (Compare.init()).then((data) => {   
      let outputDiv = document.createElement('div');
      outputDiv.id = "compare-output";
      document.body.appendChild(outputDiv);  
      __crudeRender(data);
      __markAllItemsInCompareList(data);    
      })
      .catch((error)=>{
        console.log(error);
      });

  document.getElementById("options").setAttribute("style", "display: none;");
  document.getElementById("wrapper").removeAttribute("style");
});



    