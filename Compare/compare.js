const Compare = {
    data: [],
    type: "list",
    itemAlreadyAdded: function(obj) {            
      return ((this.data).filter(o => o.id === obj.id )).length != 0 ? true : false;
    },
    addItem: function(obj) {
        if ((this.data).length >= 3) {
          alert("The compare list is full.");     // ALERTS MOVED OUTSIDE
        } else if (this.itemAlreadyAdded(obj)) {
          alert("Item already exists");          
        } else {           
          const data = this.data;
          this.data = [...data, obj];        
        }              
    },
    deleteItem: function(obj) {     
      const data = this.data;
      this.data = data.filter(o => o.id !== obj.id); 
    },
    renderCompareList: function(){
      const data = this.data;      
    }
}