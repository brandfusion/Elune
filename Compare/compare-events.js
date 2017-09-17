function __crudeRender(arr){
    let varX = 4;
    let output = `<div id="test">`;
    arr.map(o => {
        output += `<div class="item">
          <div class="name">${o.name}</div>
          <button class="close">X</button>
          <div class="image"><img src="${o.img}" title="${o.name}" width="75" height="75" /></div>
         
                  
        </div>`
    })

    output += '</div>'
    return output;
}


//events
const buttonsAdd = document.getElementsByClassName('add');
const buttonsRemove = document.getElementsByClassName('remove');
let lengthRemove = buttonsRemove.length;
let lengthAdd =  buttonsAdd.length;

for (i=0; i < lengthAdd; i++) {
    buttonsAdd[i].addEventListener("click", function(e) {
        e.preventDefault();       
        id = e.target.attributes["data-id"].value;
        name = e.target.attributes["data-name"].value;
        url = e.target.attributes["data-url"].value;
        code = e.target.attributes["data-code"].value;
        img = e.target.attributes["data-img"].value;

        let obj = {name,id,code,img,url};

        (Compare.addItem(obj)).then((data) => {          
            // alert(data.message);            
            document.getElementById("output").innerHTML = __crudeRender(data.payload);
        }).catch((error) => { 
            alert(error.message);
            // console.log(new Error(error.message))
        }); 

    });
    
};
for (i=0; i < lengthRemove; i++) {   
    buttonsRemove[i].addEventListener("click", function(e) {
        e.preventDefault();
        let obj = {}
        obj.id = e.target.attributes["data-id"].value;
        obj.name = e.target.attributes["data-name"].value;
        obj.url = e.target.attributes["data-url"].value;
        obj.code = e.target.attributes["data-code"].value;
        obj.img = e.target.attributes["data-img"].value;
      
        (Compare.removeItem(obj))
            .then((data) => { 
                // alert(data.message); 
                document.getElementById("output").innerHTML = __crudeRender(data.payload);
            })            
            .catch((error) => {
                alert(error.message);
                // console.log(new Error(error))
            });        
      
    });
    
};


//init
(Compare.init()).then((data) => {   
        document.getElementById("output").innerHTML =  __crudeRender(data);
    })
    .catch((error)=>{
        console.log(error);
    });