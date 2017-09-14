"use strict";
(function( $ ) {

	var data = {};
	var valuta = " EUR";

	var getProductId = function (variable)
	{
	    var query = window.location.search.substring(1);
	   	var pair = query.split("=");
	    if (pair[0] == variable)
	    {
	    	return pair[1];
	    }
	       
	    return false;
	};

	var getProductData = function () {
		for (var key in products) {
			if (getProductId("id") == products[key].id) {
				data['product'] = products[key];
			}
		}

		if ($.isEmptyObject(data)) {
			return false;
		}
		return data;
	};

	(function () {
		if (getProductData()) {

			var productHtml = '';
		    productHtml += '<h3>'+ data['product'].name +'</h3>';
		    productHtml += '<div class="product-price">'+ data['product'].price + valuta +'</div>';


		    var optionHtml = '';
		    optionHtml += '<option value="0">Choose size</option>';
		    for (var key in data['product'].size) {
		    	optionHtml += '<option value="'+ data['product'].size[key] +'" >' + data['product'].size[key] +'</option>';
		    }

		    var galleryHtml  = '<img src="' + data['product'].img + '">';


		    $("#size").html(optionHtml);
		    $(".gallery").html(galleryHtml);
		    $(".description").html(productHtml);
		} else {
			$(".container").html('page not found');
		}
		
	}());


	// $('#add_button').click(function(e) {
 //        addItemBag(data);
 //    });


 //    var addItemBag = function (data) {
	//     var aBag = [];
	// 	aBag = JSON.parse(localStorage['bag'] || '[]');

	// 	if (!$.isEmptyObject(aBag)) {

	// 		for (var key in aBag) {

	// 			if (aBag[key]['product'].id != data['product'].id) {
	// 				aBag.push(data);
	// 			} else {
	// 				console.log('product already add to bag');
	// 			}
				
	// 		}

	// 	} else {
	// 		aBag.push(data);
	// 	}
	
	//     localStorage['bag'] = JSON.stringify(aBag);
	// };


})(jQuery);