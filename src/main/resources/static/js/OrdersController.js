var OrdersControllerModule = (function () {
	
  var currentOrder;
  
  var showOrdersByTable = function () {
	RestControllerModule.getOrders(
	{onSuccess : function(orders){				
			$("#tabla").empty();
			for(i in orders){				
				$("#tabla").append("<p id='tag"+i+"'>Table "+i+ "</p>");                                
				$("#tabla").append("<table id='Order"+i+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
				for(j in orders[i].orderAmountsMap){					
					$("#Order"+i).append("<tbody> <tr> <td>"+j+"</td> <td>"+orders[i].orderAmountsMap[j]+"</td> </tr> </tbody>");
				}	
			}	
		},	
		onFailed : function(error){
			console.log(error);
			console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");				
		}							
	});															
  };

  var selectOrder = function (){
	
	var index = document.getElementById("orders");
    var selected = index.options[index.selectedIndex].value;	  	
	RestControllerModule.showOrder( 
		selected,
		{
		onSuccess : function(order){
			currentOrder = order;
			$("#tableOrderSelected").empty();
			$("#tableOrderSelected").append("<thead> <tr> <th scope='col'>Item</th> <th scope='col'>Quantity</th> <th scope='col'> </th> <th scope='col'> </th> </tr> </thead>");
			for(i in order[selected].orderAmountsMap){
				$("#tableOrderSelected").append("<tbody> <tr> <td> <input id='item' type='text' value='"+i+"'></td> <td> <input id='item' type='text' value='"+order[selected].orderAmountsMap[i]+"'></td>  <td> <a class='nav-link' href='#' onClick=''>Delete</a> </td> <td> <a class='nav-link' href='#' onClick=''>Update</a> </td>");
			}		
		},
		onFailed : function(error){
			console.log(error);
			console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");						
		}					
	});		  
  };
  
  var newOrder = function(){	
	  console.log("ENTRO");
  };
  
  var loadSelectOrders = function(){
	RestControllerModule.getOrders(
	{
		onSuccess : function(orders){
			$('#orders').empty();
			for(i in orders){
				$('#orders').append("<option value='"+i+"'>Table "+i);
			}			
		}					
	}); 
	  
  };
   
  
  var updateOrder = function () {
    // todo implement
  };

  var deleteOrderItem = function (id) {
    						                      
  };
	
  var addItemToOrder = function (orderId, item) {    
  };
  
  
  
  function errorMessage(){
	alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
  }
  

  return {
    showOrdersByTable: showOrdersByTable,
    updateOrder: updateOrder,
    deleteOrderItem: deleteOrderItem,
    addItemToOrder: addItemToOrder,
	selectOrder: selectOrder,
	loadSelectOrders: loadSelectOrders,
	newOrder : newOrder
  };

})();
