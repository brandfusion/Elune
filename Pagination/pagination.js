function renderPagination(arr) {
  $(".pagination").empty();
  var output = ""
  output += "<ul>";
  arr.map(function(o,i){
    
    if (o.IsNavigational === true && i === 0 ) {
      output += '<li><button type="button" data-page="'+o.PageNumber+'"><i class="fa fa-angle-left"></i></button></li>';
    } else if (o.IsNavigational === true && i !== 0 ) {
      output += '<li><button type="button" data-page="'+o.PageNumber+'"><i class="fa fa-angle-right"></i></button></li>';
    } else {
      if (o.IsCurrent === true) {
        output += '<li><button type="button" class="active" data-page="'+o.PageNumber+'">'+o.Label+'</button></li>';
      } else {
        output += '<li><button type="button" data-page="'+o.PageNumber+'">'+o.Label+'</button></li>';
      }      
    }
  });
  output += "</ul>"
  $(".pagination").html(output);
}


//init
axios.get("resources/dataset.json").then(function(r){
  renderPagination(r.data.Pagination.Pages);  
});

//events
$("body").on("click", ".pagination button", function(e){
  var page = e.currentTarget.attributes["data-page"].value;
  alert('make api call -> ' + page);
  axios.get("resources/dataset2.json").then(function(r){
    renderPagination(r.data.Pagination.Pages); 
  });
});