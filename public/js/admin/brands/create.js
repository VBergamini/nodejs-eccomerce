document.addEventListener('DOMContentLoaded', function() {

    var btnCreate = document.querySelector('#btnCreate');
    btnCreate.addEventListener('click', createBrand);

    var inputImage = document.querySelector('#inputImage');
    inputImage.addEventListener('change', imagePreview);

    function imagePreview() {

        var file = document.getElementById('inputImage').files[0];
    
        if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
    
            let link = URL.createObjectURL(file);
            let imagePreview = document.querySelector('#imagePreview');
            imagePreview.src = link;
            imagePreview.style['display'] = 'block';
    
        }
        else {
    
            alert('Not supported file!');
            inputImage.files = null;
    
        }
    
    }
    
    function createBrand() {
    
        var inputName = document.querySelector('#inputName').value.trim();
        var inputImage = document.querySelector('#inputImage');
    
        if(inputName != null && inputName != '') {
    
            let formData = new FormData();
            formData.append('name', inputName);
            formData.append('inputImage', inputImage.files[0]);
    
            if(confirm('Are You Sure?')) {

                fetch('/brands/create', {
    
                    method: 'POST',
                    body: formData
        
                })
                .then(r => {
        
                    return r.json();
        
                })
                .then(r => {
        
                    if(r.ok) {
        
                        document.querySelector('.brandCreateMsg').innerHTML = `<span class="alert alert-success">${r.msg}</span>`;
                        document.querySelector('#inputName').value = '';
                        document.getElementById('inputImage').value = '';
                        document.querySelector('#imagePreview').style['display'] = 'none';
        
                        setTimeout(function() {
        
                            document.querySelector('.brandCreateMsg').innerHTML = '';
        
                        }, 3000);
        
                    }
                    else {
        
                        alert(r.msg);
        
                    }
        
                })
                .catch( e => {
        
                    console.log(e);
        
                })

            }
    
        }
        else {
    
            alert("Fill in all fields correctly!");
    
            return;
    
        }
    
    }

})
