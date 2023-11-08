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

    function decrement() {

        var id = this.dataset.id;
        var qtty = parseInt(document.querySelector('#prdQtty-'+id).value);
        qtty--;
        document.querySelector('#prdQtty-'+id).value = qtty;
        
    }

    function increment() {

        var id = this.dataset.id;
        var qtty = parseInt(document.querySelector('#prdQtty-'+id).value);
        qtty++;
        document.querySelector('#prdQtty-'+id).value = qtty;

    }

    function createCart() {

        if(productsList.length > 0) {

            let html = `
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
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
                            <td>US$${product.price}</td>
                            <td>
                                <div style="display:flex">
                                    <button data-id="${product.id}" class="btn btn-default decrement"><i class="fas fa-minus"></i></button>
                                    <input id="prdQtty-${product.id}" class="form-control" style="width: 75px" value="${product.quantity}" type="number" />
                                    <button data-id="${product.id}" class="btn btn-default increment"><i class="fas fa-plus"></i></button>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-outline-danger fas fa-trash"></button>
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

                }
                else {

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