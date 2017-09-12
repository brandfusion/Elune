function __crudeRender(arr){
    let output = "";
    arr.map(o => {
        output += o.name + "/"
    })
    return output;
}


//events
const buttonsAdd = document.getElementsByClassName('add');
const buttonsRemove = document.getElementsByClassName('remove');
let lengthAdd = buttonsAdd.length;
let lengthRemove = buttonsRemove.length;
for (i=0; i < lengthAdd; i++) {
    buttonsAdd[i].addEventListener("click", function(e) {
        e.preventDefault();
        let obj = {};
        obj.id = e.target.attributes["data-id"].value;
        obj.name = e.target.attributes["data-name"].value;
        obj.url = e.target.attributes["data-url"].value;
        obj.code = e.target.attributes["data-code"].value;
        obj.img = e.target.attributes["data-img"].value;
      
        (Compare.addItem(obj)).then((data) => {          
            alert(data.message);            
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
                alert(data.message); 
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