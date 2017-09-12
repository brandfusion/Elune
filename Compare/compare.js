const Compare = {
    data: [],
    type: "list",
    _itemAlreadyAdded: function(id) {            
      return ((this.data).filter(val => val === id )).length != 0 ? true : false;
    },
    addItem: function(id) {
      return new Promise((resolve, reject) => {
        let output = {};
        if ((this.data).length >= 3) {
          output.type = "error";
          output.message = "ERROR: The compare list is full.";         
        } else if (this._itemAlreadyAdded(id)) {          
          output.type = "error";
          output.message = "ERROR: The is already in the compare list.";   
        } else {           
          let data = this.data;
          this.data = [...data, id];             
          sessionStorage.setItem("Compare", JSON.stringify(this.data));   //save to sessionStorage
          output.type= "success";
          output.message = "The product was added to compare list.";
        }  
        output.payload = this.data;
        if(output.type === "success") {
          resolve(output);
        } else {
          reject(output);
        }
      });
    },
    removeItem: function(id) {    
      return new Promise((resolve,reject) => {
        let arr = this.data;  
        let output = {};    
        if((this.data).filter(val => val === id).length > 0) {
          this.data = arr.filter(v => v !== id);         
          output.message = "TRIGGER: Product was removed from compare list";
          output.payload = this.data;
          resolve(output);
          sessionStorage.setItem("Compare", JSON.stringify(this.data));   //save to sessionStorage
        } else {
          output.message = "ERROR: The selected product is not in the compare list";
          output.payload = this.data;
          reject(output);
        }
        
      });      
    },
    renderCompareList: function(){
      return new Promise((resolve, reject) => {               
        if((this.data).length === 0) {
          reject("ERROR: There are no items in the compare list.");
        } else {
          resolve(this.data);
          // console.log("RENDER:"+this.data); 
        }        
      });
        
    },
    _loadSessionStorageData: function() {  
      let data = [];  
      if (sessionStorage.getItem("Compare") !== null) {
        this.data = data.concat(JSON.parse(sessionStorage.getItem("Compare")));
      }      
    },
    init: function() {
      // sessionStorage.clear();
      return new Promise((resolve,reject) => {
        this._loadSessionStorageData();
        resolve(this.data);
        // console.log("RENDER:"+this.data);
      });
      
    }
}