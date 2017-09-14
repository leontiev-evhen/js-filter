"use strict";
(function( $ ) {

	var aData = {};
    var valuta = " EUR";
 
	/* show to block of products */
    var showProducts = function (obj) {
    	$('#content').html();
    	var productHtml = '';
        for (var key in obj) {

        	productHtml += '<div class="col-md-4 item">';
        	productHtml += '<div class="group list-group-image"><img src="'+ obj[key].img + '"></div>';
        	productHtml += '<div class="product-name"><a href="product.html?id='+ obj[key].id +'">'+ obj[key].name + '</a> <b> - ' + obj[key].price + valuta + '</b></div>';
        	productHtml += '</div>';
        }

        return productHtml;
    };

	/* sort products */
	var sort = function (data) {
		var sortData = [];
		
		for (var key in data) {
			switch (key) {
                /* sort for category*/
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
                /* sort for color*/
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
						
                            for (var i = 0; i <= sortData[index].color.length; i++) {
                                if (sortData[index].color[i] == data[key]) {
                                    return [value];
                                } 
                            }

						});
					}
				break;
				/* sort for size*/
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

							for (var i = 0; i <= sortData[index].size.length; i++) {
                                if (sortData[index].size[i] == data[key]) {
                                    return [value];
                                } 
                            }

						});
					}
				break;
				/* sort for price*/
				case 'price':
                    if (sortData.length == 0) {
                        if (data[key] == 'high') {

                            sortData = products.sort(function (a, b) {
                                return b.price.toString().localeCompare( a.price );
                            });

                        } else {

                            sortData = products.sort(function (a, b) {
                                return a.price.toString().localeCompare(b.price);
                            });

                        }
                    } else {
                        if (data[key] == 'high') {

                            sortData = sortData.sort(function (a, b) {
                                return b.price.toString().localeCompare( a.price );
                            });

                        } else {

                            sortData = sortData.sort(function (a, b) {
                                return a.price.toString().localeCompare(b.price);
                            });

                        }
                    }
					
				break;
					
			}
		}


		if ($.isEmptyObject(sortData) && !$.isEmptyObject(data)) {
			$("#content").html('nothing found'); 
        } else if ($.isEmptyObject(data)) {
            $("#content").html(showProducts(products)); 
            localStorage.clear();
		} else {
			$("#content").html(showProducts(sortData)); 
		}
		
	};
	
	/* start form of block of products */
	(function () {
		$("#content").html(showProducts(products));
		
		if (!$.isEmptyObject(localStorage)) {
			for (var key in localStorage) {
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

 })(jQuery);