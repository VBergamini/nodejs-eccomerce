const Database = require('../db/database');
const connect = new Database();

class OrderItemModel {

    #orderItemId;
    #orderId;
    #productId;
    #productItemQuantity;
    #productItemPrice;

    get orderItemId() {return this.#orderItemId} set orderItemId(orderItemId) {this.#orderItemId = orderItemId}
    get orderId() {return this.#orderId} set orderId(orderId) {this.#orderId = orderId}
    get productId() {return this.#productId} set productId(productId) {this.#productId = productId}
    get productItemQuantity() {return this.#productItemQuantity} set productItemQuantity(productItemQuantity) {this.#productItemQuantity = productItemQuantity}
    get productItemPrice() {return this.#productItemPrice} set productItemPrice(productItemPrice) {this.#productItemPrice = productItemPrice}

    constructor(orderItemId, orderId, productId, productItemQuantity, productItemPrice) {
        this.#orderItemId = orderItemId;
        this.#orderId = orderId;
        this.#productId = productId;
        this.#productItemQuantity = productItemQuantity;
        this.#productItemPrice = productItemPrice;
    }

    async save() {

        var sql = 'ISERT INTO tb_orderItems (ord_id, prd_id, oit_quantity, oit_price) VALUES (?,?,?,?)';
        var values = [this.#orderId, this.#productId, this.#productItemQuantity, this.#productItemPrice];

        var result = await connect.NonQueryCommand(sql, values);

        return values;
    }

}

module.exports = OrderItemModel;