function __crudeRender(data){ 
    let arr = data.payload; 
    let output = `<div id="test">`; 
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
        
    output += '</div>';
    document.getElementById("output").innerHTML = output;

    __crudeRenderEvents();
    return output;
}
function __crudeRenderEvents(){
    let buttonsClose = document.querySelectorAll("button.close");  
    buttonsClose.forEach(el => {
      el.addEventListener("click", function(e){
        removeCompareItem(e);
      });
    });

}
function addCompareItem(e) {
  e.preventDefault(); 
  id = e.target.attributes["data-id"].value;
  name = e.target.attributes["data-name"].value;
  url = e.target.attributes["data-url"].value;
  code = e.target.attributes["data-code"].value;
  img = e.target.attributes["data-img"].value;

  let obj = {name,id,code,img,url};        

  (Compare.addItem(obj)).then((data) => {          
      // alert(data.message);      
      __crudeRender(data);
  }).catch((error) => { 
      alert(error.message);
      // console.log(new Error(error.message))
  }); 
}


function removeCompareItem(e) {
  e.preventDefault(); 
  id = e.target.attributes["data-id"].value;
  // name = e.target.attributes["data-name"].value;
  // url = e.target.attributes["data-url"].value;
  // code = e.target.attributes["data-code"].value;
  // img = e.target.attributes["data-img"].value;
  
  let obj = {id};

  (Compare.removeItem(obj))
  .then((data) => { 
      // alert(data.message); 
      __crudeRender(data);
  })            
  .catch((error) => {
      alert(error.message);
      // console.log(new Error(error))
  });  
}

//events on init
let buttonsAdd = document.querySelectorAll('button.add');
let buttonsRemove = document.querySelectorAll('button.remove');

buttonsAdd.forEach(el => {
  el.addEventListener("click", function(e) {         
    addCompareItem(e);
  });
});

buttonsRemove.forEach(el => {
  el.addEventListener("click", function(e) {   
    removeCompareItem(e);
  });
});
    

//init

let buttonProduct = document.getElementById("product");
let buttonList = document.getElementById("list");

buttonProduct.addEventListener("click", function(){
  let currentProduct = {name: "Item 2", id: "PROD2", code: "code 2", img: "http://via.placeholder.com/300x300", url: "/#2"};
  (Compare.initWithProduct(currentProduct)).then((data) => {    
    __crudeRender(data);
    })
    .catch((error)=>{
      console.log(error);
    });

  document.getElementById("options").setAttribute("style", "display: none;");
  document.getElementById("wrapper").removeAttribute("style");
});

buttonList.addEventListener("click", function(){
  (Compare.init()).then((data) => {   
      __crudeRender(data);
      })
      .catch((error)=>{
        console.log(error);
      });

  document.getElementById("options").setAttribute("style", "display: none;");
  document.getElementById("wrapper").removeAttribute("style");
});



    