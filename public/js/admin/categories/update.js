document.addEventListener("DOMContentLoaded", function() {

    var btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.addEventListener("click", updateCategory);

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

function updateCategory() {

    var inputId = document.getElementById("inputId");
    var inputName = document.getElementById("inputName");
    var inputImage = document.getElementById('inputImage');
    
    if (confirm('Are you sure?')) {

        if(inputName.value != '') {

            let formData = new FormData();
            formData.append('id', inputId.value);
            formData.append('name', inputName.value);

            if(inputImage.files.length > 0) {

                formData.append('inputImage', inputImage.files[0]);
            }
        
            fetch('/categories/update', {

                method: "PUT",
                body: formData

            })
            .then(r => {

                return r.json();

            })
            .then(r => {

                if(r.ok) {

                    alert(r.msg);
                    window.location.href = '/categories';

                }
                else {

                    alert("Error on update product");

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