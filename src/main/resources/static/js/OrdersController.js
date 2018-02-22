orders = undefined;

function addOrder(){
	var insert = {2:{"orderAmountsMap":{"TOMATE":5,"LECHUGA":3,"POKER":15},"tableNumber":2}};
	axios.post('/orders', insert)
		.then(function(){                			
                        $("#tabla").append("<p id='tag"+2+"'>Order 2</p>");                        
			$("#tabla").append("<table id='Order"+2+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
			for(map in insert[2].orderAmountsMap){				
				$("#Order"+2).append("<tbody> <tr> <td>"+map+"</td> <td>"+insert[2].orderAmountsMap[map]+"</td> </tr> </tbody>");
			}
			
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}

function removeOrderById(id){
	axios.delete('/orders/'+id)
		.then(function(){                        
                        document.getElementById("tag"+id).remove();
			document.getElementById("Order"+id).remove();
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}

 function loadOrdersList(){
	orders = [];
	axios.get('/orders')
		.then(function(result){
			orders = result.data;
			$("#tabla").empty();
			for(key in orders){
				//Render the tables
                                $("#tabla").append("<p id='tag"+key+"'>Order "+key+ "</p>");                                
				$("#tabla").append("<table id='Order"+key+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
				for(map in orders[key].orderAmountsMap){
					//Render the rows
					$("#Order"+key).append("<tbody> <tr> <td>"+map+"</td> <td>"+orders[key].orderAmountsMap[map]+"</td> </tr> </tbody>");
				}
			}						
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}


function errorMessage(){
	alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
}

