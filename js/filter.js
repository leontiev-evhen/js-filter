$(document).ready(function(){

	var aData = {};
    var products = [
    	{
    		id: 1,
    		name: 'GearBest T-shirt Cotton Round Neck Regular Fit',
    		category: 'Round Neck',
    		img: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2016/08/11/gridclothes/20160811112630_48295.JPG',
    		size: ['L'],
    		price: '200',
    		color: ['black']
    	},
    	{
    		id: 2,
    		name: 'Men Crew Neck Light Coffee T Shirt',
    		category: 'Crew Neck',
    		img: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2017/05/26/gridclothes/20170526112105_95919.jpg',
    		size: ['M'],
    		price: '100',
    		color: ['grey']
    	},
    	{
    		id: 3,
    		name: 'Men V Neck White T Shirt',
    		category: 'Collarless',
    		img: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2017/05/26/gridclothes/20170526112421_92808.jpg',
    		size: ['XL'],
    		price: '150',
    		color: ['white']
    	},
    	{
    		id: 4,
    		name: 'Color Spliced Stripes Print Round',
    		category: 'Collarless',
    		img: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Clothing/2016/03/30/gridclothes/20160330122204_57648.jpg',
    		size: ['XL'],
    		price: '250',
    		color: ['black']
    	},
		{
    		id: 5,
    		name: 'Color Spliced Stripes Print Round',
    		category: 'Collarless',
    		img: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Clothing/2016/03/30/gridclothes/20160330122204_57648.jpg',
    		size: ['XL'],
    		price: '350',
    		color: ['black']
    	},

    ];

	/* show to block of products */
    var showProducts = function (obj) {
    	$('#content').html();
    	var productHtml = '';
        for (key in obj) {

        	productHtml += '<div class="col-md-4">';
        	productHtml += '<div class="product-img"><img src="'+ obj[key].img + '"></div>';
        	productHtml += '<div class="product-name"><a href="product.html">'+ obj[key].name + '</a><b>' + obj[key].price + '$</b></div>';
        	productHtml += '</div>';
        }

        return productHtml;
    };

	/* sort products */
	var sort = function (data) {
		var sortData = [];
		console.log(data)
		for (key in data) {
			switch (key) {
				case 'category':
				
					if (sortData.length == 0) {

						products.filter(function(obj) {

							if (obj.category == data[key]) {
								sortData.push(obj);
							} 
				
						});
					} else {

						var sortData = $.map(sortData, function(value, index) {
							if (sortData[index].category == data[key]) {
								return [value];
							} 
						});
					}
					break;
				case 'color':
					if (sortData.length == 0) {
						products.filter(function(obj) {

							for (var i = 0; i <= obj.color.length; i++) {
							
								if (obj.color[i] == data[key]) {
									sortData.push(obj);
								} 
							}
					
						});
					} else {	
						var sortData = $.map(sortData, function(value, index) {
							
								if (sortData[index].color == data[key]) {
									return [value];
								} 
						});
					}
				break;
				
				case 'size':
					if (sortData.length == 0) {
						products.filter(function(obj) {

							for (var i = 0; i <= obj.size.length; i++) {
								if (obj.size[i] == data[key]) {
									sortData.push(obj);
								} 
							}
					
						});
					} else {	
						var sortData = $.map(sortData, function(value, index) {
							
							if (sortData[index].size == data[key]) {
								return [value];
							} 
							
						});
					}
				break;
				
				case 'price':
					if (data[key] === 'high') {
						sortData = sortData.sort(function (a, b) {
							return b.price.localeCompare( a.price );
						});
					} else {
						sortData = sortData.sort(function (a, b) {
							return a.price.localeCompare(b.price);
						});
					}
				break;
					
			}
		}
		if (jQuery.isEmptyObject(sortData)) {
			$("#content").html('nothing found'); 
		} else {
			$("#content").html(showProducts(sortData)); 
		}
		
	};
	
	/* start form of block of products */
	(function () {
		$("#content").html(showProducts(products));
		
		if (!$.isEmptyObject(localStorage)) {
			for (key in localStorage) {
				aData[key] = localStorage[key];
			}
			sort(aData);
		}
	}());



	/* filter category */
    $('#filter_category').change(function(e) {
       
        var $input = $(this),
        inputContent = $input.val();

        if (inputContent != 0) {
 		
			localStorage['category'] = inputContent;
			aData['category'] = inputContent;
			sort(aData);
			
        } else {
		   delete aData['category'];
		   sort(aData);
	   }
        
    });  


	/* filter color */
    $('#filter_color').change(function(e) {
       
        var input = $(this),
        inputContent = input.val();

        if (inputContent != 0) {
			
            if (localStorage['data']) {

				dataFilter = JSON.parse(localStorage['data']);
            } 
			
			localStorage['color'] = inputContent;
			aData['color'] = inputContent;
			sort(aData);
			
       } else {
		   delete aData['color'];
		   sort(aData);
	   }
    }); 

    /* filter size */
    $('#filter_size').change(function(e) {
       
        var input = $(this),
        inputContent = input.val();

        if (inputContent != 0) {
            
            localStorage['size'] = inputContent;
			aData['size'] = inputContent;
			sort(aData);
			
		} else {
		   delete aData['size'];
		   sort(aData);
		}
    
    }); 

    /* filter price */
   	$('#filter_price').change(function(e) {
       
        var input = $(this),
        inputContent = input.val();
		
		if (inputContent != 0) {
            
            localStorage['price'] = inputContent;
			aData['price'] = inputContent;
			sort(aData);
			
		} else {
		   delete aData['price'];
		   sort(aData);
		}
    });
	
	/* clear filter  */
   	$('#filter_clear').click(function(e) {
        localStorage.clear();
        location.reload();
    });
	

});  
