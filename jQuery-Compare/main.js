    $(function(){
        // ------------------------------ Global Variables ------------------------------

        var compareLinkClean = "/Default.aspx?ID=28&compare=";
        var sessionCompareList = $.session.get('compareList');
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


        // ------------------------------ Render Functions ------------------------------

        function addCompareWrapper() {
            var wrapper = "";

            wrapper += "<div class='row compareWrapper hidden'>";

            wrapper += "<div class='compareHeader'>Compare products"; 
            wrapper += "<button id='collapseCompareWrapper' class='btn btn-default'><i class='fa fa-exchange'></i></button>";
            wrapper += "</div>"; // end compareHeader

            wrapper += "<div class='compareList'></div>"; // end compareList
            wrapper += "<div class='compareButton'><a class='btn btn-default' id='jCompareProducts' href='/Default.aspx?ID=28&compare='>Compare</a></div>"; // end compareButton

            wrapper += "</div>"; // end compareWrapper

            $("body").append(wrapper);

        }


        function markCompareFromSession(list) {
        
            if(list.length == 0) return; // no data , no need to mark
        
            list.map(function(obj){
                $("a.addToCompare").each(function(index , el){      
                    if($(el).attr("data-id") == obj.productId) {
                        $(el).addClass("added");
                        $(el).find("i").removeClass("fa fa-square-o").addClass("fa-check-square-o fa");
                    }
                });
            })
            

        }

        function renderCompareItems(payload) {
            if(payload.length > 0) {
                $(".compareWrapper").removeClass("hidden");
            } else {
                $(".compareWrapper").addClass("hidden");
                $(".compareList").empty();
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

            $(".compareList").empty();
            $(".compareList").append(wrapper);

        }

        function renderCompareLink(data) {
            // get only the attributes that helps construct the compare link -- i.e productName or productId
            var temp = data.reduce(function(result , value , key){

                if(value.productVariantId !== "") {
                    result.push(value.productId + "$LANG1$" + value.productVariantId); // compare for list
                } else {
                    result.push(value.productId + "$LANG1$"); // compare for tile
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

            $("#jCompareProducts").attr("href" , updateCompareLink);

        }

        // -------------------------- END Render Functions ------------------------------





        // ------------------------------ Event Listeners -------------------------------

        $("body").on("click" , "#jCompareProducts" , function(event){
            $.session.set('compareList', ''); // set storeCompare to empty when clicking compare button
        });


        $("body").on("click" , "#collapseCompareWrapper" , function(event){
            var amount = $(".compareWrapper").outerWidth();

            if(!$(this).hasClass("open")) {
                $(this).addClass("open");

                $(".compareWrapper").css({
                    'transform': 'translateX(-' + amount + 'px)',
                    'transition': '.4s ease-in-out all'
                });
            } else {
                $(this).removeClass("open");
                $(".compareWrapper").css({
                    'transform': 'translateX(0)',
                    'transition': '.4s ease-in-out all'
                });
            }
        });


        $("body").on("click" , ".removeFromCompare" , function(event) {
            var id = $(this).attr("data-id");

            // change sign in product list
            $("a[data-id='" + id + "']").removeClass("added");
            $("a[data-id='" + id + "']").find("i").removeClass("fa-check-square-o fa").addClass("fa fa-square-o");

            // remove from compare list
            list = list.reduce(function(result , value , key){
                if(value.productId !== id) {
                    result.push(value);
                } else {
                    result = result;
                }

                return result;
            },[]);

            $.session.set('compareList', JSON.stringify(list));


            // console.log("LIST AFTER REMOVE: ", list);

            // update compare view area based on new dataset
            renderCompareItems(list);
            renderCompareLink(list);
        });


        $("body").on("click" , ".addToCompare" , function(event) {
            event.preventDefault();
            var productId = $(this).attr("data-id");
            var productName = $(this).attr("data-name");
            var productImage = $(this).attr("data-img");
            var productVariantId = $(this).attr("data-variant-id");


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
            $(".compareWrapper").css({
                'transform': 'translateX(0)',
                'transition': '.4s ease-in-out all'
            });
            $("#collapseCompareWrapper").removeClass("open");


            $.session.set('compareList', JSON.stringify(list));

            // console.log("LIST AFTER ADD" , list);

            // update compare view area based on new dataset
            renderCompareItems(list);
            renderCompareLink(list);


            if(!$(this).hasClass("added")) {

                $(this).addClass("added");
                $(this).find("i").removeClass("fa fa-square-o").addClass("fa-check-square-o fa");

                if($("a[data-id='" + productId + "']").length > 1) {
                    // add checked for main product related variant
                    $("a[data-id='" + productId + "']").addClass("added");
                    $("a[data-id='" + productId + "']").find("i").removeClass("fa fa-square-o").addClass("fa-check-square-o fa");
                }
                
            } else {

                $(this).removeClass("added");
                $(this).find("i").removeClass("fa-check-square-o fa").addClass("fa fa-square-o");

                if($("a[data-id='" + productId + "']").length > 1) {
                    // remove checked for main product related variant
                    $("a[data-id='" + productId + "']").removeClass("added");
                    $("a[data-id='" + productId + "']").find("i").removeClass("fa-check-square-o fa").addClass("fa fa-square-o");
                }

            }
        });

        // -------------------------- END Event Listeners -------------------------------
    });
