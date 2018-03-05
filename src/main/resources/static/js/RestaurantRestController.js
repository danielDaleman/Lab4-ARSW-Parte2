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

  var deleteOrder = function (orderId, callback) {
    // todo implement
  };

  var createOrder = function (order, callback) {
    // todo implement
  };    

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();