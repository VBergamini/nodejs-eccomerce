document.addEventListener('DOMContentLoaded', function() {

    var buttons = document.querySelectorAll('.btnDelete');

    for (let i=0; i<buttons.length; i++) {

        buttons[i].addEventListener('click', deleteCategory);

    }

    function deleteCategory() {

        var id = this.dataset.id;

        if (confirm ('Are you sure?')) {

            if (id != null && id != '') {

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

                        this.parentNode.parentNode.previousElementSibling.innerHTML = `<span class="alert alert-success">${r.msg}</span>`;
                        let that = this;

                        setTimeout(function(){

                            that.parentNode.parentNode.parentNode.remove();

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
    }
})