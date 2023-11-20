const OrderItemsModel = require('../../models/orderItemsModel');

class OrdersController {

    async List(req, res) {

        var orderItem = new OrderItemsModel();
        var list = await orderItem.list();

        res.render('admin/orders/adminOrders', {layout: 'admin/layout/adminLayout', list: list});
    }

}

module.exports = OrdersController;
