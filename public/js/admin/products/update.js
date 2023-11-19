document.addEventListener("DOMContentLoaded", function() {

    var btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.addEventListener("click", updateProduct);

    var inputImage = document.getElementById('inputImage');
    inputImage.addEventListener('change', imagePreview);

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
    
    function updateProduct() {
    
        var inputId = document.getElementById("inputId").value;
        var inputCode = document.getElementById("inputCode").value.trim();
        var inputName = document.getElementById("inputName").value.trim();
        var inputQtty = document.getElementById("inputQtty").value;
        var selBrand = document.getElementById("selBrand").value;
        var selCategory = document.getElementById("selCategory").value;
        var inputPrice = document.getElementById("inputPrice").value;
        var inputImage = document.getElementById('inputImage');
        
        if (confirm('Are you sure?')) {
    
            if (inputCode != '' && inputName != '' && inputQtty != '' && inputQtty != '0' && selBrand != '0' && selCategory != '0' && inputPrice > 0) {
    
                let formData = new FormData();
                formData.append('id', inputId);
                formData.append('code', inputCode);
                formData.append('name', inputName);
                formData.append('quantity', inputQtty);
                formData.append('price', inputPrice);
                formData.append('brand', selBrand);
                formData.append('category', selCategory);
                if(inputImage.files.length > 0)
                    formData.append('inputImage', inputImage.files[0]);
            
                fetch('/products/update', {
                    
                    method: "PUT",
                    body: formData
    
                })
                .then(r => {
    
                    return r.json();
    
                })
                .then(r => {
                     
                    if (r.ok) {
    
                        document.querySelector('.prdUpdateMsg').innerHTML = `<span class="alert alert-success">${r.msg}</span>`;

                        setTimeout(function(){

                            document.querySelector('.prdUpdateMsg').innerHTML = '';
                            window.location.href = '/products';

                        }, 3000);
    
                    }
                    else {
    
                        alert(r.msg);
    
                    }
                })
                .catch(e => {
    
                    console.log(e);
    
                });
    
            }
    
        }
        else {
    
            alert("Fill in all fields correctly!");
    
            return;
    
        }
        
    }

})