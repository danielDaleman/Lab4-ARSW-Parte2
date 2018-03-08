var OrdersControllerModule = (function () {
	
  var currentOrder;
  
  var showOrdersByTable = function () {
	RestControllerModule.getOrders(
	{onSuccess : function(orders){				
			$("#tabla").empty();
			for(i in orders){				
				$("#tabla").append("<h3 id='tag"+i+"'>Table "+i+ "</h3>");                                
				$("#tabla").append("<table id='Order"+i+"' class='table table-sm table-inverse'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
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
    selected = index.options[index.selectedIndex].value;	  	
	RestControllerModule.showOrder( 
		selected,
		{
		onSuccess : function(order){
			currentOrder = order;
			$("#tableOrderSelected").empty();
			$("#tableOrderSelected").append("<thead> <tr> <th scope='col'>Item</th> <th scope='col'>Quantity</th> <th scope='col'> </th> <th scope='col'> </th> </tr> </thead>");
			var id=0;
			for(i in order[selected].orderAmountsMap){				
				$("#tableOrderSelected").append("<tbody> <tr> <td> <input id='item"+id+"' type='text' value='"+i+"'></td> <td> <input id='quan"+id+"' type='text' value='"+order[selected].orderAmountsMap[i]+"'></td>  <td> <td><button id='b"+id+"' type='button' style='background:red' class='btn'>Delete</button> </td> <td> <button type='button' style='background:blue' class='btn' onclick='OrdersControllerModule.updateOrder()'>Update</button> </td>");
				document.getElementById("b"+id).setAttribute("onClick", "OrdersControllerModule.deleteOrderItem('"+$('#item'+id).val()+"');");	
				id+=1;
			}														
		},
		onFailed : function(error){			
			console.log(error);
			console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");						
		}					
	});		  
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
    var length = Object.keys(currentOrder[selected].orderAmountsMap).length;
        currentOrder[selected].orderAmountsMap = {};
        for(var i = 0; i < length; i++){
            if(Object.keys(currentOrder[selected].orderAmountsMap).includes($('#item'+i).val())){
                currentOrder[selected].orderAmountsMap[$('#item'+i).val()]+= parseInt($('#quan'+i).val());
            } else{
                currentOrder[selected].orderAmountsMap[$('#item'+i).val()] = parseInt($('#quan'+i).val());
            }
        }	
	RestControllerModule.updateOrder(
		currentOrder[selected],
		{	
		   onSuccess : function(){
			   selectOrder();
			   alert("SUCCESSFUL ORDER MODIFICATION");
		   },
		   onFailed: function(error){
			   console.log(error);
			   console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");									   
		   }		
			
			
		});
};

  var deleteOrderItem = function(id) {
    delete currentOrder[selected].orderAmountsMap[id];	
    RestControllerModule.createOrder(
	currentOrder[selected],{
		onSuccess: function(){
			selectOrder();
		},
		onFailed: function(error){
			console.log(error);
			console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");						
		}
	
	});
		
  };
  
  
	
  var addItemToOrder = function (orderId, item) { 
	var newItem = item[0];	
	var quantity = item[1];	
	if(Object.keys(currentOrder[orderId].orderAmountsMap).includes(newItem)){
		currentOrder[orderId].orderAmountsMap[newItem]+= parseInt(quantity);
	} else{
		currentOrder[orderId].orderAmountsMap[item[0]] = parseInt(item[1]);
	}   
		
	RestControllerModule.createOrder(
	   currentOrder[orderId],
	   {
			onSuccess: function(){				
				selectOrder();
		},
			onFailed: function(error){				
				console.log(error);
				console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");						
			}		   		   		   
	   });
  
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
	
  };

})();
