const RenderMinicart = data => { 
  if(data.Summary.CartIsEmpty === "False") {
    document.querySelector('#minicart-detail .hasItems').classList.remove("d-none");
    document.querySelector('#minicart-detail .noItems').classList.add("d-none");    
    document.querySelector('#minicart-detail .noItems').classList.remove("d-flex");
    let content = (data.List).reduce((result,{ProductName,ProductId,ProductLink,VariantText,Quantity,Image,UnitPrice,TotalPriceWithDiscounts,UpdateQuantityLink,RemoveFromCart},index) => {
      return result + `<div class="item mb-3 border border-top-0 border-left-0 border-right-0 pb-3 pb-sm-0">                
                        <div class="row d-flex">
                          <div class="title px-3 order-2 order-sm-1">
                            <a href="${ProductLink}" class="d-flex text-dark h5 mb-2">${ProductName}</a>
                          </div>                  
                          <div class="description col-12 col-sm-6 order-3 order-sm-2">
                            <p class="code mb-0 d-flex align-items-center">
                              <span>${ProductId}</span>
                              <i class="fa fa-circle mx-2 text-muted"></i>
                              <span>${VariantText}</span>
                            </p>
                            <p class="price d-flex align-items-center">${Quantity} x ${UnitPrice}
                              <i class="fa fa-long-arrow-right text-muted mx-2"></i> ${TotalPriceWithDiscounts}</p>
                            <div class="quantity-input-wrapper-minicart d-inline-flex align-items-center justify-content-left">
                              <p class="mb-0 mr-2">Qty</p>
                              <input type="number" min="1" class="form-control rounded-0 quantity-input text-right w-50" value="${Quantity}">
                            </div>
                          </div>
                          <div class="image col-12 col-sm-6 order-1 order-sm-3 mb-2 mb-sm-0">
                            <img src="${Image}" class="img-fluid" alt="${ProductName}">
                          </div>
                        </div>
                        <div class="action d-flex pt-2">
                          <button type="button" class="w-50 mr-2 btn btn-outline-dark rounded-0 refresh" data-href="${UpdateQuantityLink}">
                            <i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
                          <button type="button" class="w-50 btn btn-outline-dark rounded-0 delete" data-href="${RemoveFromCart}">Delete</button>
                        </div>
                      </div>`;
    },"");
    document.querySelector("#minicart-detail .list").innerHTML = content;  
  } else {
    document.querySelector("#minicart-detail .list").innerHTML = "";
    document.querySelector('#minicart-detail .hasItems').classList.add("d-none");
    document.querySelector('#minicart-detail .noItems').classList.remove("d-none");
    document.querySelector('#minicart-detail .noItems').classList.add("d-flex");
  }
}

const RegisterMinicartEvents = () => {
  document.querySelectorAll("#minicart-detail .refresh").forEach(el =>{
    el.addEventListener("click", (e) => {
      e.preventDefault();
      let value = e.currentTarget.closest(".item").querySelector(".quantity-input").value;
      let link = e.currentTarget.attributes["data-href"].value + value;
      alert(link);    
    });
  });
  document.querySelectorAll("#minicart-detail .delete").forEach(el =>{
    el.addEventListener("click", (e) => {
      e.preventDefault();    
      let link = e.currentTarget.attributes["data-href"].value;
      alert(link);    
    });
  });
}

const Minicart = () => {
  fetch("resources/cart.json")
    .then((response) => { return response.json()})
    .catch((error) => { throw Error("There was an error loading the mincart !")})
    .then((data) => {    
      //forced delay to be removed
      setTimeout(() => {
        RenderMinicart(data);
        RegisterMinicartEvents();
      },2000)  
      
    })
}


//Register events show/hide minicart
document.querySelector(".mobile-menu-trigger").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("minicart-detail").classList.add("active");
  document.getElementById("minicart-header").classList.add("active");
});
document.querySelector(".close-minicart").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("minicart-detail").classList.remove("active");
  document.getElementById("minicart-header").classList.remove("active");
});


//init
Minicart();


