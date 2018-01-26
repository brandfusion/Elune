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


const variantId = [null,null,null];
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

console.log(variantsUpdated);







  //  Array.from(new Set(variants.map(item => item.id.split(".")).reduce((result , value) => result.concat(value)).sort()));


  //  .reduce((r,v,k)=>{ r=[...r,v.id] return r})