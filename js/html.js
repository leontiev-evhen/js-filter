var categories = {category: ['Round Neck', 'Crew Neck', 'Collarless']};
var sizes = {size: ['L', 'M', 'XL']};
var colors = {color: ['black', 'white', 'green', 'blue', 'grey']};
var prices = {price: ['low', 'high']};

var createOption = function (data) {
	var html = '';
	html += '<option value="0"></option>';
	for (value in data) {
		
		for (key in data[value]) {

			if (localStorage[value] == data[value][key]) {
				html += '<option value="'+ data[value][key] +'" selected>' + data[value][key] +'</option>';
			} else {
				html += '<option value="'+ data[value][key] +'">' + data[value][key] +'</option>';
			}
		}
		
	}
	return html;
};

$('#filter_category').append(createOption(categories));
$('#filter_size').append(createOption(sizes));
$('#filter_color').append(createOption(colors));
$('#filter_price').append(createOption(prices));