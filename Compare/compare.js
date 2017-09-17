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
        output.context = this.type;
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
          let itemToBeRemovedFromDataById = (this.data).filter(o => o.id === obj.id)[0];
          if((this.data).indexOf(itemToBeRemovedFromDataById) === 0 && this.type === "product") { // if in product mode and its the first item in the array
            // console.log(itemToBeRemoved);
            output.message = "Error: Product can't be removed from list.";
            output.payload = this.data;
            output.context = this.type;
            sessionStorage.setItem("Compare", JSON.stringify(this.data));   //save to sessionStorage  
            reject(output);
          } else {
            this.data = arr.filter(o => o.id !== obj.id);         
            output.message = "TRIGGER: Product was removed from compare list";
            output.payload = this.data;
            output.context = this.type;  
            sessionStorage.setItem("Compare", JSON.stringify(this.data));   //save to sessionStorage
            resolve(output);
          }
        } else {
          output.message = "ERROR: The selected product is not in the compare list";
          output.payload = this.data;
          output.context = this.type;
          reject(output);
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
        let payload = this.data;
        let context = this.type;
        let output = {payload,context};
        
        resolve(output);
        // console.log("RENDER:"+this.data);
      });      
    },    
    initWithProduct: function(obj) {
      sessionStorage.clear();
      this.type = "product";
      return new Promise((resolve,reject) => {
        (this.addItem(obj)).then(data => {
          this._loadSessionStorageData();
          let payload = this.data;
          let context = this.type;
          let output = {payload,context};
          resolve(output);
        });
        
        // console.log("RENDER:"+this.data);
      });      
    }
}