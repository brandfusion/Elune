const Compare = {
    data: [],
    type: "list",
    itemAlreadyAdded: function(id) {            
      return ((this.data).filter(val => val === id )).length != 0 ? true : false;
    },
    addItem: function(id) {
      return new Promise((resolve, reject) => {
        let output = {};
        if ((this.data).length >= 3) {
          output.type = "error";
          output.message = "ERROR: The compare list is full.";         
        } else if (this.itemAlreadyAdded(id)) {          
          output.type = "error";
          output.message = "ERROR: The is already in the compare list.";   
        } else {           
          let data = this.data;
          this.data = [...data, id];   
          output.type= "success";
          output.message = "The product was added to compare list.";
        }  
        if(output.type === "success") {
          resolve(output);
        } else {
          reject(output);
        }
      });
    },
    removeItem: function(id) {    
      return new Promise((resolve,reject) => {
        let data = this.data;
        this.data = data.filter(v => v !== id); 
        if((this.data).filter(val => val === id).length > 0) {
          resolve("TRIGGER: Product was removed from compare list");
        } else {
          reject("ERROR: The selected product is not in the compare list");
        }
        
      }); 
     
    },
    renderCompareList: function(){
      return new Promise((resolve, reject) => {        
        if((this.data).length === 0) {
          reject("ERROR: There are no items in the compare list.");
        } else {
          resolve(this.data);
        }        
      });
        
    }
}