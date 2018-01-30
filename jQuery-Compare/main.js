$(function(){
	// ------------------------------ Global Variables ------------------------------

	var list = []; // list in which products to be compared are stored
	var compareLinkClean = $("#compareProducts").attr("href");

	// -------------------------- END Global Variables ------------------------------






	// ------------------------------ Render Functions ------------------------------

	function renderCompareItems(payload) {
		if(payload.length > 0) {
			$(".compareWrapper").removeClass("hidden");
		} else {
			$(".compareWrapper").addClass("hidden");
		}

		var wrapper = "";

		payload.map(function(obj){
			wrapper += "<div class='compareItem'>";
			wrapper += "<p>" + obj.productId + "</p>";
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
			result.push(value.productName);
			return result;
		},[]);

		var updateCompareLink = null;

		if(temp.length == 1) {
			updateCompareLink = compareLinkClean + temp;
			// disable compare button if there is only one product in comparison
			$("a#compareProducts").attr("disabled" , true);
		} else {
			updateCompareLink = compareLinkClean + temp.join(",");
			$("a#compareProducts").attr("disabled" , false);
		}

		$("#compareProducts").attr("href" , updateCompareLink);

	}

	// -------------------------- END Render Functions ------------------------------





	// ------------------------------ Event Listeners ------------------------------=

	$("body").on("click" , ".removeFromCompare" , function(event) {
		var id = $(this).attr("data-id");

		// change sign in product list
		$("a[data-id='" + id + "']").parent().removeClass("added");

		// remove from compare list
		list = list.reduce(function(result , value , key){
			if(value.productId !== id) {
				result.push(value);
			} else {
				result = result;
			}

			return result;
		},[]);

		// update compare view area based on new dataset
		renderCompareItems(list);
		renderCompareLink(list);
	});


	$("body").on("click" , ".addToCompare" , function(event) {
		event.preventDefault();
		var productId = $(this).attr("data-id");
		var productName = $(this).attr("data-title");
		var productImage = $(this).attr("data-image");
		var productWeight = $(this).attr("data-weight");
		var productProcessor = $(this).attr("data-processor");
		var productPrice = $(this).attr("data-price");
		var productBattery = $(this).attr("data-battery");

		var obj = {};
		obj.productId = productId;
		obj.productName = productName;
		obj.productImage = productImage;
		obj.productWeight = productWeight;
		obj.productProcessor = productProcessor;
		obj.productPrice = productPrice;
		obj.productBattery = productBattery;

		var inArray = list.filter(function(x) {
			return x.productId === obj.productId;
		}).length;


		// item not found , add to list
		if(inArray == 0) {
			// max items allowed
			if(list.length < 3) {
				list.push(obj);
			} else {
				alert("Max items reached");
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

		// update compare view area based on new dataset
		renderCompareItems(list);
		renderCompareLink(list);


		if(!$(this).parent().hasClass("added")) {
			$(this).parent().addClass("added");
		} else {
			$(this).parent().removeClass("added");
		}
	});

	// -------------------------- END Event Listeners -------------------------------
});