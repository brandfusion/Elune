const Compare = {
    data: [],  
    type: "list",  
    _itemAlreadyAdded: function(obj) {            
      return ((this.data).filter(o => o.id === obj.id )).length != 0 ? true : false;
    },
    addItem: function(obj) {
      return new Promise((resolve, reject) => {
        let output = {};
        if ((this.data).length >= 3) {
          output.type = "error";
          output.message = "ERROR: The compare list is full.";         
        } else if (this._itemAlreadyAdded(obj)) {          
          output.type = "error";
          output.message = "ERROR: The is already in the compare list.";   
        } else {           
          let data = this.data;
          this.data = [...data, obj];             
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
    removeItem: function(obj) {    
      return new Promise((resolve,reject) => {
        let arr = this.data;  
        let output = {};    
        if((this.data).filter(o => o.id === obj.id).length > 0) {
          this.data = arr.filter(o => o.id !== obj.id);         
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
    outputList: function(){
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
    },    
    initWithProduct: function(obj) {
      sessionStorage.clear();
      return new Promise((resolve,reject) => {
        (this.addItem(obj)).then(data => {
          this._loadSessionStorageData();
          resolve(this.data);
        });
        
        // console.log("RENDER:"+this.data);
      });      
    }
}