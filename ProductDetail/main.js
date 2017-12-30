let siblings = n => [...n.parentElement.children].filter(c=>c!=n);

function RegisterThumbnailEvents(scope) {
  scope.querySelectorAll('[data-scope="thumbnail-image"]').forEach((thumbnail) => {
    thumbnail.addEventListener("click", (e) =>{
      let imgSrc = e.currentTarget.querySelector("img").attributes.src.value;     
      scope.querySelector('[data-scope="product-image"]').attributes.src.value = imgSrc;    
      siblings(e.currentTarget).map(el => {
        el.querySelector("img").classList.remove("border-dark");
      });
      e.currentTarget.querySelector("img").classList.add("border-dark");
    });
  });
}

//Product page: click thumbnail -> change image
// [data-scope="product-image-wrapper"] < - script scrope
// [data-scope="thumbnail-image"] <- element of a list that contains the thumbnail image
// [data-scope="product-image"] <- element of main image to be replaced
document.querySelectorAll('[data-scope="product-image-wrapper"]').forEach( (el) => {    
  RegisterThumbnailEvents(el);
});

//Set the thumbnails wrapper height to be the same as the main image container for mobile overflow scroll
function verticalResponsiveThumbs() {
  let productImageNode = document.querySelector("#product-image-vertical--vertical img");
  let width = window.innerWidth;  
  if (width < 992) {    
    let productImageNodeHeight = productImageNode.height;
    document.getElementById("thumbnails-vertical--vertical").style.height = productImageNodeHeight + "px";  
  } else {
    document.getElementById("thumbnails-vertical--vertical").style.height = "auto";
  }
  document.querySelector("#product-image-vertical--vertical img").addEventListener("load", (e)=>{   
    if (document.getElementById("thumbnails-vertical--vertical").style.height === "0px") {      
      if (width < 992) {    
        let productImageNodeHeight = productImageNode.height;
        document.getElementById("thumbnails-vertical--vertical").style.height = productImageNodeHeight + "px";       
      } else {
        document.getElementById("thumbnails-vertical--vertical").style.height = "auto";       
      }
    }    
  });

  window.addEventListener("resize", () => {
    // console.log(productImageNode.height);
    let width = window.innerWidth;  
    // console.log(width < 992);
    if (width < 992) {    
      let productImageNodeHeight = productImageNode.height;
      document.getElementById("thumbnails-vertical--vertical").style.height = productImageNodeHeight + "px";
    } else {
      document.getElementById("thumbnails-vertical--vertical").style.height = "auto";
    }
  });
}
// vertical thumnbails wrapper init
verticalResponsiveThumbs();

//Set the thumbnails wrapper height to be the same as the main image container for mobile overflow scroll for initial horizontal thumbnails (nowrap -- modifier)
function verticalResponsiveThumbs__horizontal() {
  let productImageNode = document.querySelector("#product-image-horizontal--vertical img");
  let width = window.innerWidth;  
  if (width < 992) {    
    let productImageNodeHeight = productImageNode.height;
    document.getElementById("thumbnails-horizontal--vertical").style.height = productImageNodeHeight + "px";
    document.querySelector("#thumbnails-horizontal--vertical .row").classList.remove("flex-nowrap");
  } else {
    document.getElementById("thumbnails-horizontal--vertical").style.height = "auto";
    document.querySelector("#thumbnails-horizontal--vertical .row").classList.add("flex-nowrap");
  }
 
  //if image was not loaded and height is 0px
  document.querySelector("#product-image-horizontal--vertical img").addEventListener("load", (e)=>{   
    if (document.getElementById("thumbnails-horizontal--vertical").style.height === "0px") {      
      if (width < 992) {    
        let productImageNodeHeight = productImageNode.height;
        document.getElementById("thumbnails-horizontal--vertical").style.height = productImageNodeHeight + "px";
        document.querySelector("#thumbnails-horizontal--vertical .row").classList.remove("flex-nowrap");
      } else {
        document.getElementById("thumbnails-horizontal--vertical").style.height = "auto";
        document.querySelector("#thumbnails-horizontal--vertical .row").classList.add("flex-nowrap");
      }
    }    
  });
  window.addEventListener("resize", () => {
    let width = window.innerWidth;  
    if (width < 992) {    
      let productImageNodeHeight = productImageNode.height;
      document.getElementById("thumbnails-horizontal--vertical").style.height = productImageNodeHeight + "px";
      document.querySelector("#thumbnails-horizontal--vertical .row").classList.remove("flex-nowrap");
    } else {
      document.getElementById("thumbnails-horizontal--vertical").style.height = "auto";
      document.querySelector("#thumbnails-horizontal--vertical .row").classList.add("flex-nowrap");
    }
  });
}

// horizontal thumnbails wrapper init
verticalResponsiveThumbs__horizontal();