document.addEventListener("DOMContentLoaded", function() {

    var btnCreate = document.getElementById("btnCreate");
    btnCreate.addEventListener("click", createProduct);

    var inputImage = document.getElementById('inputImage');
    inputImage.addEventListener('change', imagePreview);

});

function imagePreview() {

    var file = document.getElementById('inputImage').files[0];

    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {

        let link = URL.createObjectURL(file);
        let imagePreview = document.getElementById('imagePreview');
        imagePreview.src = link;
        imagePreview.style['display'] = 'block';

    }
    else {

        alert('Not suported file');
        document.getElementById('inputImage').files = null;

    }

}

function createProduct() {

    var inputCode = document.getElementById("inputCode");
    var inputName = document.getElementById("inputName");
    var inputQtty = document.getElementById("inputQtty");
    var selBrand = document.getElementById("selBrand");
    var selCategory = document.getElementById("selCategory");
    var inputPrice = document.getElementById('inputPrice');
    var inputImage = document.getElementById('inputImage');

    if (inputCode.value != "" && inputName.value != "" && inputQtty.value != "" && inputQtty.value != '0' && selBrand.value != '0' && selCategory.value != '0' && inputPrice.value > 0) {

        let formData = new FormData();
        formData.append('code', inputCode.value);
        formData.append('name', inputName.value);
        formData.append('quantity', inputQtty.value);
        formData.append('price', inputPrice.value);
        formData.append('brand', selBrand.value);
        formData.append('category', selCategory.value);
        formData.append('inputImage', inputImage.files[0]);

        fetch('/products/create', {

            method: "POST",
            body: formData

        })
        .then(r => {

            return r.json();

        })
        .then(r => {

            if (r.ok) {

                alert(r.msg);
                inputCode.value = '';
                inputName.value = '';
                inputQtty.value = '';
                inputPrice.value = '';
                selBrand.value = '0';
                selCategory.value = '0';
                inputImage.value = '';
                document.querySelector('#imagePreview').style['display'] = 'none';

            }
            else {

                alert("Error on create product");

            }
        })
        .catch(e => {

            console.log(e);

        });

    }
    else {

        alert("Fill in all fields correctly!");

        return;

    }
    
}