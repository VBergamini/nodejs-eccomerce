document.addEventListener('DOMContentLoaded', function() {

    var productsList = [];

    if(localStorage.getItem('cart') != null) {

        productsList = JSON.parse(localStorage.getItem('cart'));
        document.querySelector('#countProducts').innerHTML = productsList.length;
        
    }

    var btnModal = document.querySelector('#btnModal');

    btnModal.addEventListener('click', function() {

    })

    var myModalEl = document.querySelector('#cartModal');

    myModalEl.addEventListener('show.bs.modal', function (event) {
        
        createCart();

    })

    var buttons = document.querySelectorAll('.addToCart');
    
    buttons.forEach(function(value, index) {

        value.onclick = addToCart;

    })

    function onChangeInput() {

        var value = this.value;
        if(value != '' && isNaN(value) == false) {

            let id = this.dataset.id;

            if(value > 999) {
                
                value = 999

            }
            else {

                if(value < 1) {

                    value = 1

                }
            }

            valueUpdate(id, value, this);

        }
    }

    function valueUpdate(id, quantity, btn) {

        var product = productsList.find(x => x.id == id);
        if(product != null) {

            product.quantity = quantity;
            product.value = (product.price * product.quantity).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(productsList));
            btn.parentElement.parentElement.previousElementSibling.innerHTML = "$" + product.value;
  
        }

        document.querySelector('#prdQtty-' + id).value = quantity;

    }

    function removeProduct() {

        var id = this.dataset.id;
        productsList = productsList.filter(x => x.id != id);
        localStorage.setItem('cart', JSON.stringify(productsList));
        this.parentElement.parentElement.remove();
        document.querySelector('#countProducts').innerHTML = productsList.length;

    }

    function decrement() {

        var id = this.dataset.id;
        var qtty = parseInt(document.querySelector('#prdQtty-'+id).value);

        if(qtty > 1) {
            qtty--;
        }

        valueUpdate(id, qtty, this);
        
    }

    function increment() {

        var id = this.dataset.id;
        var qtty = parseInt(document.querySelector('#prdQtty-'+id).value);
        
        if(qtty < 999) {
            qtty++;
        }

        valueUpdate(id, qtty, this);

    }

    function createCart() {

        if(productsList.length > 0) {

            let html = `
                        <table class='table align-middle'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                       `
            for(let i=0; i < productsList.length; i++) {

                let product = productsList[i];

                html += `
                        <tr>
                            <td><img src="${product.image}" width="100"</td>
                            <td>${product.name}</td>
                            <td>$${product.price}</td>
                            <td>$${product.value}</td>
                            <td>
                                <div class="input-group" style="display:flex">
                                    <button data-id="${product.id}" class="btn btn-default decrement"><i class="fas fa-minus"></i></button>
                                    <input id="prdQtty-${product.id}"data-id="${product.id}" class="form-control mt-2 mb-2 prdQtty" style="max-width: 100px" value="${product.quantity}" type="number" />
                                    <button data-id="${product.id}" class="btn btn-default increment"><i class="fas fa-plus"></i></button>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-outline-danger fas fa-trash btnRemove" data-id="${product.id}" style="height: 40px"></button>
                            </td>
                        </tr>
                        `
            }

            html += `</tbody>
                </table>
                `
            document.querySelector('#cartBody').innerHTML = html;

            let btnDecrement = document.querySelectorAll('.decrement');
            btnDecrement.forEach(function(value, index) {

                value.onclick = decrement;

            })

            let btnIncrement = document.querySelectorAll('.increment');
            btnIncrement.forEach(function(value, index) {

                value.onclick = increment;

            })

            let btnRemove = document.querySelectorAll('.btnRemove');
            btnRemove.forEach(function(value, index) {

                value.onclick = removeProduct;

            })

            let inputQtty = document.querySelectorAll('.prdQtty');
            inputQtty.forEach(function(value, index) {

                value.onchange = onChangeInput;

            })

        }
        else {

            document.querySelector('#cartBody').innerHTML = "<span class='alert alert-info'>Nenhum produto adicionado ao carrinho!</span>";

        }

    }

    function addToCart() {

        var id = this.dataset.id;

        fetch('/store/cart/add/' + id)
        .then(r => {

            return r.json();

        })
        .then(r => {

            console.log(r);

            if(r.ok) {

                let product = productsList.find(x => x.id == r.product.id);

                if(product != null) {

                    product.quantity++;
                    product.value = (product.price * product.quantity).toFixed(2);

                }
                else {

                    r.product.value = r.product.price;
                    productsList.push(r.product);

                }

                localStorage.setItem('cart', JSON.stringify(productsList));
                document.querySelector('#countProducts').innerHTML = productsList.length;

            }
            else {

                alert('Error on add to cart!');

            }

        })
    }

})