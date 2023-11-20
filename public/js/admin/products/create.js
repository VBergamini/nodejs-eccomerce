document.addEventListener("DOMContentLoaded", function() {

    var btnCreate = document.getElementById("btnCreate");
    btnCreate.addEventListener("click", createProduct);

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
    
    function createProduct() {
    
        var inputCode = document.getElementById("inputCode").value.trim();
        var inputName = document.getElementById("inputName").value.trim();
        var inputQtty = document.getElementById("inputQtty").value.trim();
        var selBrand = document.getElementById("selBrand").value.trim();
        var selCategory = document.getElementById("selCategory").value.trim();
        var inputPrice = document.getElementById('inputPrice').value.trim();
        var inputImage = document.getElementById('inputImage');
    
        if (inputCode != "" && inputName != "" && inputQtty != "" && inputQtty != '0' && selBrand != '0' && selCategory != '0' && inputPrice > 0) {
    
            let formData = new FormData();
            formData.append('code', inputCode);
            formData.append('name', inputName);
            formData.append('quantity', inputQtty);
            formData.append('price', inputPrice);
            formData.append('brand', selBrand);
            formData.append('category', selCategory);
            formData.append('inputImage', inputImage.files[0]);
    
            if(confirm('Are You Sure?')) {
    
                fetch('/products/create', {
    
                    method: "POST",
                    body: formData
        
                })
                .then(r => {
        
                    return r.json();
        
                })
                .then(r => {
        
                    if (r.ok) {
                        
                        document.querySelector('.productCreateMsg').innerHTML = `<span class="alert alert-success m-2">${r.msg}</span>`;
                        document.getElementById("inputCode").value = '';
                        document.getElementById("inputName").value = '';
                        document.getElementById("inputQtty").value = '';
                        document.getElementById("selBrand").value = '';
                        document.getElementById("selCategory").value = '';
                        document.getElementById('inputPrice').value = '';
                        document.getElementById('inputImage').value = '';
                        document.querySelector('#imagePreview').style['display'] = 'none';

                        setTimeout(function(){

                            document.querySelector('.productCreateMsg').innerHTML = '';

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

});
