 function initCompareModule(){


    // ------------------------------ Global Variables ------------------------------

    var compareLinkClean = "/Default.aspx?ID=52&compare=";
    var sessionCompareList = sessionStorage.getItem('compareList');
    var parsedSessionCompareList = null;


    if(sessionCompareList == null || sessionCompareList.length == 0 || sessionCompareList == undefined) {
        parsedSessionCompareList = null;
    } else {
        parsedSessionCompareList = JSON.parse(sessionCompareList); 
    }


    var list = parsedSessionCompareList == null  || parsedSessionCompareList == undefined ? [] : parsedSessionCompareList; 


    // -------------------------- END Global Variables ------------------------------

    // init
    addCompareWrapper();
    renderCompareItems(list);
    renderCompareLink(list);
    markCompareFromSession(list);
    checkIfProductAdded(list)


    // ------------------------------ Render Functions ------------------------------

    function addCompareWrapper() {
        var wrapper = "";

        wrapper += "<div class='row compareWrapper hidden'>";

        wrapper += "<div class='compareHeader'>Compare products"; 
        wrapper += "<button id='collapseCompareWrapper' class='btn btn-default'><i class='fa fa-exchange'></i></button>";
        wrapper += "</div>"; // end compareHeader

        wrapper += "<div class='compareList'></div>"; // end compareList
        wrapper += "<div class='compareButton'><a class='btn btn-default' id='jCompareProducts' href='/Default.aspx?ID=52&compare='>Compare</a></div>"; // end compareButton

        wrapper += "</div>"; // end compareWrapper

        document.querySelector('body').insertAdjacentHTML('beforeend', wrapper)

    }


    function markCompareFromSession(list) {
        
    
        if(list.length == 0) {
            return; // no data , no need to mark
        } else {
   
            list.map(function(obj){
                document.querySelectorAll("a.addToCompare").forEach(function(elem){      
                    if(elem.getAttribute("data-id") == obj.productId) {
                        
                        elem.classList.add("added");                      
                        // elem.querySelector("i").classList.remove("far")
                        // elem.querySelector("i").classList.add("fas");
                    }
                });
            })
        }

        

    }

    function renderCompareItems(payload) {
        if(payload.length > 0) {
            document.querySelector('.compareWrapper').classList.remove('hidden');
        } else {
            document.querySelector('.compareWrapper').classList.add('hidden');
            document.querySelector('.compareList').innerHTML = "";
            return; // no data , no need to render
        }

        var wrapper = "";

        payload.map(function(obj){

            wrapper += "<div class='compareItem'>";
            wrapper += "<p>" + obj.productName + "</p>";
            wrapper += "<img class='img-responsive' style='height: 75px' src='" + obj.productImage + "'/>"
            wrapper += "<button class='removeFromCompare' data-id='" + obj.productId + "'>x</button>";
            wrapper += "</div>";
        });

        document.querySelector('.compareList').innerHTML = "";
        document.querySelector('.compareList').insertAdjacentHTML('beforeend', wrapper);

        registerCompareEvents();
    }

    function renderCompareLink(data) {
        // get only the attributes that helps construct the compare link -- i.e productName or productId
        var temp = data.reduce(function(result , value , key){

            // if(value.productVariantId !== "") {
            //     result.push(value.productId + "$LANG1$" + value.productVariantId); // compare for list
            // } else {
            //     result.push(value.productId + "$LANG1$"); // compare for tile
            // }


            if(value.productVariantId !== "") {
                result.push(value.productId + "." + value.productVariantId); // compare for list
            } else {
                result.push(value.productId); // compare for tile
            }

            
            return result;
        },[]);


        var updateCompareLink = null;

        if(temp.length == 1) {
            updateCompareLink = compareLinkClean + temp;
            // disable compare button if there is only one product in comparison
            // $("#jCompareProducts").prop("disabled" , true);
        } else {
            updateCompareLink = compareLinkClean + temp.join(",");
            // $("#jCompareProducts").prop("disabled" , false);
        }

        document.querySelector('#jCompareProducts').setAttribute('href', updateCompareLink)

    }

    function checkIfProductAdded(data) {
        document.querySelectorAll('a.addToCompare').forEach(function(elem) {
            data.map(function(o) {
                if(elem.getAttribute('data-id') == o.productId) {
                    if(elem.classList != "added") {
                        elem.classList.add('added')
                    }                    
                }
            })
        })
    }



    // -------------------------- END Render Functions ------------------------------





    // ------------------------------ Event Listeners -------------------------------

    function registerCompareEvents() {
        if(document.getElementsByClassName("removeFromCompare").length) {
            document.querySelectorAll('.removeFromCompare').forEach(function(elem) {
                
                elem.addEventListener('click', function(e) {
                    var id = this.getAttribute("data-id");
        
            
                     // change sign in product list
                     if(document.querySelector("a[data-id='" + id + "']") != null) {
                        document.querySelector("a[data-id='" + id + "']").classList.remove('added');
                     }
                     
                    //  document.querySelector("a[data-id='" + id + "'] i ").classList.remove("fas");
                    //  document.querySelector("a[data-id='" + id + "'] i ").classList.add("far");
            
                     // remove from compare list
                    list = list.reduce(function(result , value , key){
                        if(value.productId !== id) {
                            result.push(value);
                        } else {
                            result = result;
                        }
            
                        return result;
                    },[]);
            
                 
                    sessionStorage.setItem('compareList', JSON.stringify(list))

            
                    // update compare view area based on new dataset
                    renderCompareItems(list);
                    renderCompareLink(list);
                })
             
            })
            
        }
        
    }

    document.querySelector('body #jCompareProducts').addEventListener('click', function(e) {
        sessionStorage.setItem('compareList', '');
    });


    document.querySelector('body #collapseCompareWrapper').addEventListener('click', function(e) {
        var amount = document.querySelector('.compareWrapper').offsetWidth;
        if(this.classList.contains("open")) {
                      
            this.classList.remove("open");

            document.querySelector('.compareWrapper').style.transform = 'translateX(0)';
            document.querySelector('.compareWrapper').style.transition = '.4s ease-in-out all';
        } else {
            this.classList.add("open");

            document.querySelector('.compareWrapper').style.transform = 'translateX(-' + amount + 'px)';
            document.querySelector('.compareWrapper').style.transition = '.4s ease-in-out all';
  
        }
    })


    document.querySelectorAll('.addToCompare').forEach(function(elem) {
        elem.addEventListener('click', function(e) {
            e.preventDefault();

        var productId = this.getAttribute("data-id");
        var productName = this.getAttribute("data-name");
        var productImage = this.getAttribute("data-img");
        var productVariantId = this.getAttribute("data-variant-id");

        var obj = {};
        obj.productId = productId;
        obj.productName = productName;
        obj.productImage = productImage;
        obj.productVariantId = productVariantId.length ? productVariantId : "";
        obj.productWithVariantId = obj.productVariantId.length ? productId + "." + productVariantId : "";

        var inArray = list.filter(function(x) {
            return x.productId === obj.productId;
        }).length;


        // item not found , add to list
        if(inArray == 0) {
            // max items allowed
            if(list.length < 3) {
                list.push(obj);
            } else {
                alert("Compare list is full");
                return;
            }
        } else {
            list = list.reduce(function(result , value , key){
                if(value.productId !== obj.productId) {
                    result.push(value);
                } else {
                    result = result;
                }

                return result;
            },[]);
            
        }

        
        // if you add or remove products from compare list , show compare list
        document.querySelector('.compareWrapper').style.transform = 'translateX(0)';
        document.querySelector('.compareWrapper').style.transition = '.4s ease-in-out all';
        document.querySelector('#collapseCompareWrapper').classList.remove("open");
        

        sessionStorage.setItem('compareList', JSON.stringify(list));


        // update compare view area based on new dataset
        renderCompareItems(list);
        renderCompareLink(list);

        if(!this.classList.contains('added')) {
            this.classList.add('added');
            // this.querySelector('i').classList.remove('far');
            // this.querySelector('i').classList.add('fas');

            if(document.querySelector("a[data-id='" + productId + "']").length > 1) {
                document.querySelector("a[data-id='" + productId + "']").classList.add('added');
                // document.querySelector("a[data-id='" + productId + "'] i").classList.remove('far');
                // document.querySelector("a[data-id='" + productId + "']").classList.add("fas");
            }
        } else {
            this.classList.remove('added');
            // this.querySelector('i').classList.remove('fas');
            // this.querySelector('i').classList.add('far');

            if(document.querySelector("a[data-id='" + productId + "']").length > 1) {
                document.querySelector("a[data-id='" + productId + "']").classList.remove('added');
                // document.querySelector("a[data-id='" + productId + "'] i").classList.remove('fas');
                // document.querySelector("a[data-id='" + productId + "']").classList.add("far");
            }
        }

        })
    })
   
    // -------------------------- END Event Listeners -------------------------------
}