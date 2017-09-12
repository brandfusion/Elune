const buttonsAdd = document.getElementsByClassName('add');
const buttonsRemove = document.getElementsByClassName('remove');
let lengthAdd = buttonsAdd.length;
let lengthRemove = buttonsRemove.length;
for (i=0; i < lengthAdd; i++) {
    buttonsAdd[i].addEventListener("click", function(e) {
        e.preventDefault();
        let id = e.target.attributes["data-id"].value;
      
        (Compare.addItem(id)).then((output) => {          
            alert(output.message);
        }).catch((error) => { 
            alert(error.message);
            console.log(new Error(error.message))
        });        
    });
    
};
for (i=0; i < lengthRemove; i++) {   
    buttonsRemove[i].addEventListener("click", function(e) {
        e.preventDefault();
        let id = e.target.attributes["data-id"].value;
      
        (Compare.removeItem(id))
            .then((message) => { alert(message); })            
            .catch((error) => {
                alert(error);
                console.log(new Error(error))
            });        
        (Compare.renderCompareList())
            .then((data) => {console.log(data)});
    });
    
};