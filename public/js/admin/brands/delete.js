document.addEventListener('DOMContentLoaded', function() {

    var btnDelete = document.querySelectorAll('.btnDelete');

    for(let i=0; i < btnDelete.length; i++) {

        btnDelete[i].addEventListener('click', deleteBrand);

    }

    function deleteBrand() {

        var id = this.dataset.id;

        if(confirm('Are you sure?')) {

            if(id != '') {

                let data = {id: id};

                fetch('brands/delete', {

                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)

                })
                .then(r => {

                    return r.json();

                })
                .then(r => {

                    if(r.ok) {

                        this.parentNode.parentElement.previousElementSibling.innerHTML = `<span class="alert alert-danger">${r.msg}</span>`;
                        let that = this;
                        setTimeout(function() {

                            that.parentNode.parentNode.parentNode.remove();

                        }, 3000);

                    }
                    else {

                        alert(r.msg);

                    }

                })
                .catch(e => {

                    console.log(e);

                })

            }

        }

    }

})
