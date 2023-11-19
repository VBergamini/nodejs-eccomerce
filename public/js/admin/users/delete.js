document.addEventListener("DOMContentLoaded", function() {

    var buttons = document.querySelectorAll(".btnDelete");

    for (let i = 0; i<buttons.length; i++) {

        buttons[i].onclick = deleteUser;

    }

    function deleteUser() {

        var idDelete = this.dataset.id;

        if (confirm('Are you sure?')) {

            if (idDelete != undefined && idDelete != "") {

                fetch('/users/delete', {

                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({id: idDelete})
                    
                })
                .then(r => {

                    return r.json();

                })
                .then(r => {

                    if (r.ok) {

                        this.parentNode.parentNode.previousElementSibling.innerHTML = `<pan class="alert alert-success">${r.msg}</span>`;
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
            else {

                alert("Invalid Data!");

            }

        }

    }
    
})