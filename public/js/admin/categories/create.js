document.addEventListener("DOMContentLoaded", function() {

    var btnCreate = document.getElementById("btnCreate");
    btnCreate.addEventListener("click", createCategory);

    var inputImage = document.getElementById('inputImage');
    inputImage.addEventListener('change', ImagePreview);

})

function ImagePreview() {

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

function createCategory() {

    var inputName = document.getElementById("inputName");
    var inputImage = document.getElementById('inputImage');

    if (inputName.value != "") {

        let formData = new FormData();
        formData.append('name', inputName.value);
        formData.append('inputImage', inputImage.files[0]);

        fetch('/categories/create', {

            method: "POST",
            body: formData

        })
        .then(r => {

            return r.json();

        })
        .then(r => {

            if (r.ok) {

                alert(r.msg);
                inputName.value = '';
                inputImage.value = '';
                document.querySelector('#imagePreview').style['display'] = 'none';

            }
            else {

                alert("Error on create category");

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