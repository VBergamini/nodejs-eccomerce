const Dataabase = require('../db/database');
const connect = new Dataabase();

class OrderModel {

    #orderId;
    #orderDate;

    get orderId() {return this.#orderId} set orderId(orderId) {this.#orderId = orderId}
    get orderDate() {return this.#orderDate} set orderDate(orderDate) {this.#orderDate = orderDate}

    constructor(orderId, orderDate) {
        this.#orderId = orderId;
        this.#orderDate = orderDate;
    }

    async save() {
        
        var sql = 'INSERT INTO tb_order (ord_date) values(curdate())';
        let orderId = await connect.LastInsertedCommand(sql);

        this.#orderId = orderId;
    }

}

module.exports = OrderModel;
