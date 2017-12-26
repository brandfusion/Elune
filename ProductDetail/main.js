let siblings = n => [...n.parentElement.children].filter(c=>c!=n);

//Case 1 -- vertical responsive thumbnails / original: vertical / responsive: vertical
let thumbsVertical_vertical = document.querySelectorAll("#thumbnails-vertical--vertical .item");
const productImageNode_1 = document.querySelector("#product-image-vertical--vertical img");
thumbsVertical_vertical.forEach(el => {
  el.addEventListener("click", (e) => {
    let imgSrc = e.currentTarget.querySelector("img").attributes.src.value;
    productImageNode_1.attributes.src.value = imgSrc;    
    siblings(e.currentTarget).map(el => {
      el.querySelector("img").classList.remove("border-dark");
    });
    e.currentTarget.querySelector("img").classList.add("border-dark");
  });
});

function verticalResponsiveThumbs() {
  let productImageNode = document.querySelector("#product-image-vertical--vertical img");
  let width = window.innerWidth;  
  if (width < 992) {    
    let productImageNodeHeight = productImageNode.height;
    document.getElementById("thumbnails-vertical--vertical").style.height = productImageNodeHeight + "px";  
  } else {
    document.getElementById("thumbnails-vertical--vertical").style.height = "auto";
  }

  window.addEventListener("resize", () => {
    console.log(productImageNode.height);
    let width = window.innerWidth;  
    console.log(width < 992);
    if (width < 992) {    
      let productImageNodeHeight = productImageNode.height;
      document.getElementById("thumbnails-vertical--vertical").style.height = productImageNodeHeight + "px";
    } else {
      document.getElementById("thumbnails-vertical--vertical").style.height = "auto";
    }
  });
}

verticalResponsiveThumbs();


//Case 2 -- horizontal responsive thumbnails / original: vertical / responsive: horizontal
let thumbsHorizontal = document.querySelectorAll("#thumbnails-vertical--horizontal .item");
const productImageNode_2 = document.querySelector("#product-image-vertical--horizontal img");
thumbsHorizontal.forEach(el => {
  el.addEventListener("click", (e) => {
    let imgSrc = e.currentTarget.querySelector("img").attributes.src.value;
    productImageNode_2.attributes.src.value = imgSrc;    
    siblings(e.currentTarget).map(el => {
      el.querySelector("img").classList.remove("border-dark");
    });
    e.currentTarget.querySelector("img").classList.add("border-dark");
  });
});

//Case 3 -- horizontal responsive thumbnails / original: hotizontal / responsive: horizontal
let thumbsHorizontal_horizontal = document.querySelectorAll("#thumbnails-horizontal--horizontal .item");
const productImageNode_3 = document.querySelector("#product-image-horizontal--horizontal img");
thumbsHorizontal_horizontal.forEach(el => {
  el.addEventListener("click", (e) => {
    let imgSrc = e.currentTarget.querySelector("img").attributes.src.value;
    productImageNode_3.attributes.src.value = imgSrc;    
    siblings(e.currentTarget).map(el => {
      el.querySelector("img").classList.remove("border-dark");
    });
    e.currentTarget.querySelector("img").classList.add("border-dark");
  });
});

//Case 4 -- horizontal responsive thumbnails / original: hotizontal / responsive: vertical
let thumbsHorizontal_vertical = document.querySelectorAll("#thumbnails-horizontal--vertical .item");
const productImageNode_4 = document.querySelector("#product-image-horizontal--vertical img");
thumbsHorizontal_vertical.forEach(el => {
  el.addEventListener("click", (e) => {
    let imgSrc = e.currentTarget.querySelector("img").attributes.src.value;
    productImageNode_4.attributes.src.value = imgSrc;    
    siblings(e.currentTarget).map(el => {
      el.querySelector("img").classList.remove("border-dark");
    });
    e.currentTarget.querySelector("img").classList.add("border-dark");
  });
});

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

verticalResponsiveThumbs__horizontal();