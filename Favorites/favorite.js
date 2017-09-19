const Favorite = {
  data: [],
  _itemAlreadyAdded: function(obj) {            
    return ((this.data).filter(o => o.id === obj.id )).length != 0 ? true : false;
  },
  addItem: function(obj) {
    return new Promise((resolve, reject) => {
      let output = {};
      if (this._itemAlreadyAdded(obj)) {          
        output.type = "error";
        output.message = "ERROR: The item is already in the favorite list.";   
      } else {           
        let data = this.data;
        this.data = [...data, obj];             
        sessionStorage.setItem("Favorite", JSON.stringify(this.data));   //save to sessionStorage
        output.type= "success";
        output.message = "The product was added to favorite list.";
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
          output.message = "TRIGGER: Product was removed from favorite list";
          output.payload = this.data;          
          sessionStorage.setItem("Favorite", JSON.stringify(this.data));   //save to sessionStorage
          resolve(output);        
      } else {
        output.message = "ERROR: The selected product is not in the favorite list";
        output.payload = this.data;       
        reject(output);
      }      
    });      
  },
  _loadSessionStorageData: function() {  
      let data = [];  
      if (sessionStorage.getItem("Favorite") !== null) {
        this.data = data.concat(JSON.parse(sessionStorage.getItem("Favorite")));
      }      
  },
  _loadDataFromAjaxCall: function(link){
    return new Promise((resolve,reject) => {
      this._loadSessionStorageData();
      let payload = this.data;  
      resolve(payload);    
    }); 
  },
  init: function() {
    // sessionStorage.clear();
    return new Promise((resolve,reject) => {
      this._loadSessionStorageData();
      let payload = this.data;  
      resolve(payload);    
    });      
  },    
  initWithAjax: function() {
    // sessionStorage.clear();
    return new Promise((resolve,reject) => {
      this._loadSessionStorageData();
      let payload = this.data;  
      resolve(payload);    
    });      
  },    
}