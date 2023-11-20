document.addEventListener('DOMContentLoaded', function() {

    var btnCreate = document.querySelector('#btnCreate');
    btnCreate.addEventListener('click', createProfile);

    function createProfile() {

        var proDescription = document.querySelector('#proDescription').value.trim();

        if(proDescription != '') {

            let newProfile = {proDescription: proDescription}

            if(confirm('Are You Sure?')) {

                fetch('/profiles/create', {

                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newProfile)
    
                })
                .then(r => {
    
                    return r.json();
    
                })
                .then(r => {
    
                    if(r.ok) {
    
                        document.querySelector('.proCreateMsg').innerHTML = `<span class="alert alert-success">${r.msg}</span>`;
                        document.querySelector('#proDescription').value = '';

                        setTimeout(function(){

                            document.querySelector('.proCreateMsg').innerHTML = '';

                        }, 3000);
    
                    }
                    else {

                        alert(r.msg);

                    }
    
                })

            }

        }

    }

})
