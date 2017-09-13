$(document).ready(function(){

	var dataFilter;
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
    		price: '150',
    		color: ['black']
    	},

    ];


    var showProducts = function (obj) {
    	$('#content').html();
    	var productHtml = '';
        for (key in obj) {

        	productHtml += '<div class="col-md-4">';
        	productHtml += '<div class="product-img"><img src="'+ obj[key].img + '"></div>';
        	productHtml += '<div class="product-img">'+ obj[key].name + ' <b>' + obj[key].price + '$</b></div>';
        	productHtml += '</div>';
        }

        return productHtml;
    };


    var checkLocalStorage = function () {
  
    	if (localStorage['data']) {

			dataFilter = JSON.parse(localStorage['data']);
		} 
console.log(dataFilter)
		if (dataFilter != 0 && typeof dataFilter != "undefined" && dataFilter.length != 0) {
			
			return dataFilter;
		} 

		return dataFilter = products;
    }();



    var checkInputValue = function (input) {

    	if (input != 0) {
    		 return true;
    	}
   
    	$("#content").html(showProducts(dataFilter));
    }


$("#content").html(showProducts(dataFilter));

	/* filter category */
    $('#filter_category').change(function(e) {
       
        var $input = $(this),
        inputContent = $input.val();

        if (checkInputValue(inputContent)) {
 		
			var data = [];
			dataFilter.filter(function(obj) {

				if (obj.category == inputContent) {
			    	data.push(obj);
				} 
		
			});

			localStorage['data'] = JSON.stringify(data);
			localStorage['category'] = inputContent;

       		$("#content").html(showProducts(data)); 
        }
        
    });  


	/* filter color */
    $('#filter_color').change(function(e) {
       
        var input = $(this),
        inputContent = input.val();

        if (checkInputValue(inputContent)) {


            if (localStorage['data']) {

            dataFilter = JSON.parse(localStorage['data']);
            } 


			var data = [];
			dataFilter.filter(function(obj) {

				for (var i = 0; i <= obj.color.length; i++) {

					if (obj.color[i] == inputContent) {
				    	data.push(obj);
					} 
				}
				
			});
            if (data.length == 0) {
                $("#content").html('not find'); 
            } else {
                localStorage['data'] = JSON.stringify(data);
                localStorage['color'] = inputContent;

                $("#content").html(showProducts(data)); 
            }
			
       }
    }); 

    /* filter size */
    $('#filter_size').change(function(e) {
       
        var input = $(this),
        inputContent = input.val();

        if (checkInputValue(inputContent)) {

               if (localStorage['data']) {

            dataFilter = JSON.parse(localStorage['data']);
            } 
    		var data = [];
    		dataFilter.filter(function(obj) {

    			for (var i = 0; i <= obj.color.length; i++) {

    				if (obj.size[i] == inputContent) {
    			    	data.push(obj);
    				} 
    			}
    			
    		});
            
            if (data.length == 0) {
                $("#content").html('not find'); 
            } else {
                localStorage['data'] = JSON.stringify(data);
                localStorage['size'] = inputContent;

                $("#content").html(showProducts(data));
            }
        }
    }); 


    /* filter price */
   	$('#filter_price').change(function(e) {
       
        var input = $(this),
        inputContent = input.val();

        if (checkInputValue(inputContent)) {
    		var data = [];

    		if (inputContent === 'high') {
    			data = products.sort(function (a, b) {
    		    	return b.price.localeCompare( a.price );
    			});
    		} else {
    			data = products.sort(function (a, b) {
    		    	return a.price.localeCompare(b.price);
    			});
    		}
            localStorage['data'] = JSON.stringify(data);
            localStorage['price'] = inputContent;
      		
           	$("#content").html(showProducts(data)); 
       }
    });
	
	/* clear filter  */
   	$('#filter_clear').click(function(e) {
        localStorage.clear();
        location.reload();
    });
    
  
});  
