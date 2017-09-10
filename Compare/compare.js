const Compare = {
    data: ["1","2"],
    type: "list",
    itemAlreadyAdded: function(id) {            
      return ((this.data).filter(val => val === id )).length != 0 ? true : false;
    },
    addItem: function(id) {
        if ((this.data).length >= 3) {
          alert("The compare list is full.")
        } else if (this.itemAlreadyAdded(id)) {
          alert("Item already exists");
        } else {           
          const data = this.data;
          this.data = [...data, id];                     
        }              
    },
    deleteItem: function(id) {     
      const data = this.data;
      this.data = data.filter(val => val !== id); 
    },
    renderCompareList: function(){
      const data = this.data;      
    }
}