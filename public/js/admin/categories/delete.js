document.addEventListener('DOMContentLoaded', function() {

    var buttons = document.querySelectorAll('.btnDelete');

    for (let i=0; i<buttons.length; i++) {

        buttons[i].addEventListener('click', deleteCategory);

    }

    function deleteCategory() {

        var id = this.dataset.id;

        if (confirm ('Are you sure?')) {

            if (id != '') {

                let data = { id: id };

                fetch('categories/delete', {

                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(r => {

                    return r.json();

                })
                .then(r => {

                    if(r.ok) {

                        window.location.reload();

                    }
                    else {

                        alert('Error on delete category');

                    }
                })
                .catch(e => {

                    console.log(e);

                });
            }
        }
    }
})