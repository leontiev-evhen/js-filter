"use strict";
(function( $ ) {

	var categories = {name: 'Categories', category: ['Round Neck', 'Crew Neck', 'Collarless']};
	var sizes = {name: 'Sizes', size: ['L', 'M', 'XL']};
	var colors = {name: 'Colors', color: ['black', 'white', 'green', 'blue', 'grey']};
	var prices = {name: 'Prices', price: ['low', 'high']};

	var createOption = function (data) {
		var html = '';
		html += '<option value="0">' + data.name +'</option>';
		delete data.name;
		for (var value in data) {
			
			for (var key in data[value]) {
				
				if (localStorage[value] == data[value][key]) {
					html += '<option value="'+ data[value][key] +'" selected>' + data[value][key] +'</option>';
				} else {
					html += '<option value="'+ data[value][key] +'" >' + data[value][key] +'</option>';
				}
			}
			
		}
		return html;
	};

	$('#filter_category').append(createOption(categories));
	$('#filter_size').append(createOption(sizes));
	$('#filter_color').append(createOption(colors));
	$('#filter_price').append(createOption(prices));


 })(jQuery);