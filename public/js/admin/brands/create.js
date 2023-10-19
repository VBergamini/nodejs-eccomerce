document.addEventListener('DOMContentLoaded', function() {

    var btnCreate = document.querySelector('#btnCreate');
    btnCreate.addEventListener('click', createBrand);

    var inputImage = document.querySelector('#inputImage');
    inputImage.addEventListener('change', imagePreview);

})

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

    var inputName = document.querySelector('#inputName');
    var inputImage = document.querySelector('#inputImage');

    if(inputName.value != '') {

        let formData = new FormData();
        formData.append('name', inputName.value);
        formData.append('inputImage', inputImage.files[0]);

        fetch('/brands/create', {

            method: 'POST',
            body: formData

        })
        .then(r => {

            return r.json();

        })
        .then(r => {

            if(r.ok) {

                alert(r.msg);
                inputName.value = '';
                inputImage.value = '';
                document.querySelector('#imagePreview').style['display'] = 'none';

            }
            else {

                alert("Error on create brand");

            }

        })
        .catch( e => {

            console.log(e);

        })

    }
    else {

        alert("Fill in all fields correctly!");

        return;

    }

}
