const Database = require('../db/database');
const connect = new Database();

class OrderItemsModel {

    #orderItemId; #orderId; #productId; #productName; #productItemQuantity; #productItemPrice; #userId;

    get orderItemId() {return this.#orderItemId} set orderItemId(orderItemId) {this.#orderItemId = orderItemId}
    get orderId() {return this.#orderId} set orderId(orderId) {this.#orderId = orderId}
    get productId() {return this.#productId} set productId(productId) {this.#productId = productId}
    get productItemQuantity() {return this.#productItemQuantity} set productItemQuantity(productItemQuantity) {this.#productItemQuantity = productItemQuantity}
    get productItemPrice() {return this.#productItemPrice} set productItemPrice(productItemPrice) {this.#productItemPrice = productItemPrice}
    get productName() {return this.#productName} set productName(productName) {this.#productName = productName}
    get userId() {return this.#userId} set userId(userId) {this.#userId = userId}

    constructor(orderItemId, orderId, productId, productItemQuantity, productItemPrice, productName, userId) {
        this.#orderItemId = orderItemId;
        this.#orderId = orderId;
        this.#productId = productId;
        this.#productItemQuantity = productItemQuantity;
        this.#productItemPrice = productItemPrice;
        this.#productName = productName;
        this.#userId = userId;
    }

    async list() {

        var sql = `SELECT o.ord_id, u.user_name, p.prd_name, i.oit_quantity, i.oit_price
        FROM tb_order o
        INNER JOIN tb_users u ON o.user_id = u.user_id
        INNER JOIN tb_orderItems i ON o.ord_id = i.ord_id
        LEFT JOIN tb_products p ON i.prd_id = p.prd_id
        ORDER BY o.ord_id`;

        var rows = await connect.QueryCommand(sql);
        var list = [];

        for(let i = 0; i < rows.length; i++) {

            let item = rows[i];
            
            if(item['prd_name'] == null)
                item['prd_name'] = 'Not Found';
            
            let orderItem = new OrderItemsModel(item['oit_id'], item['ord_id'], item['prd_id'], item['oit_quantity'], item['oit_price'], item['prd_name'], item['user_id']);
            orderItem.userName = item['user_name']

            list.push(orderItem);

        }

        return list;

    }

    async save() {

        var sql = 'INSERT INTO tb_orderItems (ord_id, prd_id, oit_quantity, oit_price, user_id) VALUES (?,?,?,?,?)';
        var values = [this.#orderId, this.#productId, this.#productItemQuantity, this.#productItemPrice, this.#userId];

        var result = await connect.NonQueryCommand(sql, values);

        return result;
    }

}

module.exports = OrderItemsModel;