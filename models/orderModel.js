const Dataabase = require('../db/database');
const connect = new Dataabase();

class OrderModel {

    #orderId; #orderDate; #userId;

    get orderId() {return this.#orderId} set orderId(orderId) {this.#orderId = orderId}
    get orderDate() {return this.#orderDate} set orderDate(orderDate) {this.#orderDate = orderDate}
    get userId() {return this.#userId} set userId(userId) {this.userId = userId}

    constructor(orderId, orderDate, userId) {
        this.#orderId = orderId;
        this.#orderDate = orderDate;
        this.#userId = userId;
    }

    async save(userId) {
        
        var sql = 'INSERT INTO tb_order (ord_date, user_id) values(curdate(), ?)';
        var values = [userId]
        var orderId = await connect.LastInsertedCommand(sql, values);

        this.#orderId = orderId;
    }

}

module.exports = OrderModel;
