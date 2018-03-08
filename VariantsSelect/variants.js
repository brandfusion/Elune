const options = [{
    "label": "Color",
    "values": [{
        "label": "Blue",
        "value": "A01"
      },
      {
        "label": "Green",
        "value": "A02"
      },
      {
        "label": "Magenta",
        "value": "A03"
      }
    ]
  },
  {
    "label": "Size",
    "values": [{
        "label": "S",
        "value": "B01"
      },
      {
        "label": "M",
        "value": "B02"
      },
      {
        "label": "L",
        "value": "B03"
      }
    ]
  },
  {
    "label": "Configuration",
    "values": [{
        "label": "Maple with Blue & Red",
        "value": "C01"
      },
      {
        "label": "Cherry with Brown & Black",
        "value": "C02"
      },
      {
        "label": "Maple with Brown & Black",
        "value": "C03"
      }
    ]
  }
]
const variants = [{
    "id": "A02.B01.C01",
    "name": "SCREEN DOOR SHADE GREEN SMALL -- MAPLE WITH BLUE & RED",
    "price": 210.00,
    "currency": "$",
    "stock": 15
  },
  {
    "id": "A02.B02.C01",
    "name": "SCREEN DOOR SHADE GREEN MEDIUM -- MAPLE WITH BLUE & RED",
    "price": 230.00,
    "currency": "$",
    "stock": 25
  },
  {
    "id": "A03.B03.C03",
    "name": "SCREEN DOOR SHADE MAGENTA LARGE -- MAPLE WITH BROWN & BLACK",
    "price": 250.00,
    "currency": "$",
    "stock": 30
  }
]


const getIndex = (option) => {  
  return option !== "" ? variants.filter(x=>x.id.split(".").includes(option))[0].id.split(".").indexOf(option) : null;
}


let variantId = ["A03","B03","C03"];
const flatten = (arr) => {
  return arr.reduce((r,v) => {
    v.split(".").map(v2=> { r = [...r,v2]});    
    return r;
  },[]);
}
const getSelectIntervalIndex = (arg) => { return arg.filter(x=> x !== null).length};
const getAvailableCombinations = (variantsArray,arg) => {  
  return getSelectIntervalIndex(arg) !== 0 ? [...variantsArray.filter(o=>(o.id).includes(arg.filter(x => x!==null).join("."))).reduce((r,v,k)=>{ r=[...r,v.id]; return r},[])] : [...variantsArray.reduce((r,v,k)=>{ r=[...r,v.id]; return r},[])];
}


let filteredOptionArray = ([...new Set(flatten([...variants.reduce((r,v,k)=>{ r=[...r,v.id]; return r},[])]).sort())]).filter(x=>getIndex(x) === 0);

const getFilteredOptions = (variants,variantId) => {

  return variantId.filter(x=>x!==null).reduce((r,v,k)=>{ return [...r,variantId.slice(0,k+1).join(".")]  },[]).reduce((r,v,k)=>{return [...r,variants.filter(y=>y.id.includes(v)).reduce((r2,v2,k2)=>{return [...r2,v2.id.split(".")]},[])]},[]).reduce((r3,v3,k3)=>{return [...r3,v3.reduce((r4,v4,k4)=>{return [...r4,...v4]},[])]},[]).map((a,i)=> {return (([...new Set(a)]).sort()).filter(f=>{return getIndex(f) == i+1})});

}

document.querySelectorAll("select").forEach(element => {
  element.addEventListener("change",(e)=>{
    let index = parseFloat(e.currentTarget.attributes["data-index"].value);   
    let value = e.currentTarget.value !== "" ? e.currentTarget.value : null;

    // variantId = variantId.reduce((r,v,k)=>{
    //   if(k < index) {
    //     r= [...r,v];
    //   } else if (k===index) {        
    //     r=[...r,value];
    //   } else {
    //     r= [...r,null];
    //   }
    //   return r;
    // },[]);

    variantId = [...variantId].pop();

   //available combinations: A1.B1.C1.D1.E1, A1.B1.C1.D1.E2, A1.B2.C1.D1.E1
   //selected: A1.B2.C1.D1.E1
   //ex: changed B, index = 1
   //[...variantId] must be the first available combination that has A1.B1 => A1.B1.C1.D1.E1 .pop() => [A1,B1,C1,D1]  => renderedSource = what needs to be rendered

    

    // console.log("variantID",variantId);
    
    variantId.map((v,i)=>{
      if (v === null) {       
        document.querySelector('[data-index="'+i+'"]').selectedIndex = 0;
      }
    });

    let renderSource = [[...filteredOptionArray], ...getFilteredOptions(variants,variantId)];
    let tempIncludesVerification = renderSource.reduce((r,v,k)=>{return [...r,...v]},[]);
    
    document.querySelectorAll('[data-index] option').forEach(el => {
      el.classList.remove("hidden");    
    })
    
    renderSource.map((arr,i) =>{      
      document.querySelectorAll('[data-index="'+i+'"] option').forEach(el => {        
        if (arr.filter(x=>x === el.value).length === 0) {
          el.classList.add("hidden");
        }
      })
    });

    document.querySelectorAll('[data-index]').forEach((el,i) => {  
      if (i > index) {
       el.children[0].classList.remove("hidden");
      }    
    })
    
  });
});



//init
// let selectedVariantId = [...variantId].pop();
let renderSource = [[...filteredOptionArray], ...getFilteredOptions(variants,variantId)];
let tempIncludesVerification = renderSource.reduce((r,v,k)=>{return [...r,...v]},[]);
console.log("tempIncludesVerification",  tempIncludesVerification);
console.log("options", options);

let filteredOptionsTemp = options.reduce((r,v,k)=>{return [...r,{...v, values: v.values.filter(o => tempIncludesVerification.includes(o.value))}]},[]);
console.log(filteredOptionsTemp);




  //  Array.from(new Set(variants.map(item => item.id.split(".")).reduce((result , value) => result.concat(value)).sort()));


  //  .reduce((r,v,k)=>{ r=[...r,v.id] return r})