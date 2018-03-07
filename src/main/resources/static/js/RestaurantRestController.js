var RestControllerModule = (function () {

  var getOrders = function(callback){
    axios.get('/orders')
	.then(function(orders){
		return callback.onSuccess(orders.data);
	})		
	.catch(function(error){
		callback.onFailed(error);
	});		
  };

  var updateOrder = function (order, callback) {
    // todo implement
  };

  var deleteOrder = function (orderId, callback){    			
  };

  var createOrder = function (order, callback) {
    // todo implement
  };    
   
  var showOrder = function(orderId, callback){		
	axios.get('/orders/'+orderId)
		.then(function(order){
			callback.onSuccess(order.data);
		})
		.catch(function(error){
			callback.onFailed(error);
		});			  
};

	

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder,
	showOrder : showOrder
  };

})();