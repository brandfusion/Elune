//events
const buttonsAdd = document.getElementsByClassName('add');
const buttonsRemove = document.getElementsByClassName('remove');
let lengthAdd = buttonsAdd.length;
let lengthRemove = buttonsRemove.length;
for (i=0; i < lengthAdd; i++) {
    buttonsAdd[i].addEventListener("click", function(e) {
        e.preventDefault();
        let id = e.target.attributes["data-id"].value;
      
        (Compare.addItem(id)).then((data) => {          
            alert(data.message);            
            document.getElementById("output").innerHTML = data.payload;
        }).catch((error) => { 
            alert(error.message);
            // console.log(new Error(error.message))
        }); 

    });
    
};
for (i=0; i < lengthRemove; i++) {   
    buttonsRemove[i].addEventListener("click", function(e) {
        e.preventDefault();
        let id = e.target.attributes["data-id"].value;
      
        (Compare.removeItem(id))
            .then((data) => { 
                alert(data.message); 
                document.getElementById("output").innerHTML = data.payload;
            })            
            .catch((error) => {
                alert(error.message);
                // console.log(new Error(error))
            });        
      
    });
    
};


//init
(Compare.init()).then((data) => {
    // console.log(data);
    // alert("Trigger: RENDER");
    document.getElementById("output").innerHTML = data;
    })
    .catch((error)=>{
        console.log(error);
    });