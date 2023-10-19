document.addEventListener('DOMContentLoaded', function() {

    var btnUpdate = document.querySelector('#btnUpdate');
    btnUpdate.addEventListener('click', updateBrand);

    var inputImage = document.querySelector('#inputImage');
    inputImage.addEventListener('change', imagePreview);
    
})

function imagePreview() {

    var file = document.querySelector('#inputImage').files[0];

    if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {

        let link = URL.createObjectURL(file);
        let imagePreview = document.querySelector('#imagePreview');
        imagePreview.src = link;
        imagePreview.style['display'] = 'block';

    }
    else {

        alert('Not supported file');
        document.querySelector('#inputFile').files = null;

    }

}

function updateBrand() {

    var inputId = document.querySelector('#inputId');
    var inputName = document.querySelector('#inputName');
    var inputImage = document.querySelector('#inputImage');

    if(confirm('Are you sure?')) {

        if(inputName.value != '') {

            let formData = new FormData();
            formData.append('id', inputId.value);
            formData.append('name', inputName.value);

            if(inputImage.files.length > 0) {

                formData.append('inputImage', inputImage.files[0]);

            }

            fetch('/brands/update', {

                method: 'PUT',
                body: formData

            })
            .then(r => {

                return r.json();

            })
            .then(r => {

                if(r.ok) {

                    alert(r.msg);
                    window.location.href = '/brands';

                }
                else {

                    alert("Error on update brand");

                }

            })
            .catch(e => {

                console.log(e);

            })

        }

    }
    else {

        alert("Fill in all fields correctly!");

        return;

    }

}