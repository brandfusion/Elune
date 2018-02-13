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


let variantId = [null,null,null];
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
let variantsUpdated = [...new Set(flatten(getAvailableCombinations(variants, variantId)).sort())];


const renderCurrentSelection = (selectedVariant, index) => {
  let indexOfVariant = getSelectIntervalIndex(selectedVariant);
  // console.log(indexOfVariant);
  // console.log(index);
  // console.log(variantId);
  // let tempVariants = variantsUpdated.filter(x=>getIndex(x)<=indexOfVariant);
  let tempVariants = variantId.filter(x=>x!==null).reduce((r,v,k)=>{return [...r,variants.filter(y=>y.id.includes(v)).reduce((r2,v2,k2)=>{return [...r2,v2.id.split(".")]},[])]},[]).reduce((r3,v3,k3)=>{return [...r3,v3.reduce((r4,v4,k4)=>{return [...r4,...v4]},[])]},[]).filter((el, i, a) => i === a.indexOf(el)).sort();
  // let t2= new Set(tempVariants);
  console.log(tempVariants);
}

const getIndex = (option) => {  
  return option !== "" ? variants.filter(x=>x.id.split(".").includes(option))[0].id.split(".").indexOf(option) : null;
}

renderCurrentSelection(variantId);


document.querySelectorAll("select").forEach(element => {
  element.addEventListener("change",(e)=>{
    let index = e.currentTarget.attributes["data-index"].value;   
    let value = e.currentTarget.value !== "" ? e.currentTarget.value : null;
    variantId = [...variantId.slice(0, index), e.currentTarget.value, ...variantId.slice(index+1)];
    renderCurrentSelection(variantId, index)
    
  });
});

console.log(variantsUpdated);







  //  Array.from(new Set(variants.map(item => item.id.split(".")).reduce((result , value) => result.concat(value)).sort()));


  //  .reduce((r,v,k)=>{ r=[...r,v.id] return r})