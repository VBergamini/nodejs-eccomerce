document.addEventListener('DOMContentLoaded', function() {

    var btnDelete = document.querySelectorAll('.btnDelete');
    btnDelete.forEach(function(value, index) {

        value.onclick = deleteProfile;

    })

    function deleteProfile() {

        var profile = this.dataset.id;

        if(profile != null) {

            if(confirm('Are You Sure?')) {

                fetch('/profiles/delete', {

                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({profile: profile})
    
                })
                .then(r => {
    
                    return r.json();
    
                })
                .then(r => {
    
                    if(r.ok) {
    
                        this.parentNode.parentNode.previousElementSibling.innerHTML = `<p class="alert alert-success">${r.msg}</p>`;
                        let that = this;
                        setTimeout(function() {

                            that.parentNode.parentNode.parentNode.remove();

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
