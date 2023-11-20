
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('btnCreate').addEventListener('click', createUser);

    function createUser() {

        var name = document.getElementById('userName');
        var email = document.getElementById('userEmail');
        var profile = document.getElementById('userProfile');
        var password = document.getElementById('userPassword');
        var active = document.getElementById('userActive');

        if (validate(name, email, profile, password)) {
           
            let user = {
                name: name.value,
                email: email.value,
                profile: profile.value,
                password: password.value,
                active: active.checked == true ? 'Y' : 'N'
            }

            if(confirm('Are You Sure?')) {

                fetch('/users/create', {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                })
                .then(r => {
    
                    return r.json();
    
                })
                .then(r => {
    
                    if (r.ok) {
    
                        document.querySelector('.userCreateMsg').innerHTML = `<span class="alert alert-success">${r.msg}</span>`;
                        name.value = '';
                        email.value = '';
                        profile.value = 0;
                        password.value = '';
                        active.checked = false;
                        
                        setTimeout(function(){

                            document.querySelector('.userCreateMsg').innerHTML = '';

                        }, 3000);
    
                    }
                    else {
    
                        alert(r.msg);
    
                    }
    
                });
                
            }

        }
        else {

            alert('Fill in the highlighted fields correctly!');

        }

    }

    function validate(name, email, profile, password) {

        name.style['border-color'] = '';
        email.style['border-color'] = '';
        profile.style['border-color'] = '';
        password.style['border-color'] = '';
        var errs = [];

        if (name.value.trim() == '') {
            errs.push(name);
        }
        if (email.value.trim() == '') {
            errs.push(email);
        }
        if (profile.value.trim() == 0) {
            errs.push(profile);
        }
        if (password.value.trim() == '') {
            errs.push(password);
        }

        if (errs.length > 0) {

            for (let i = 0; i<errs.length; i++) {

                errs[i].style['border-color'] = 'red';

            }

            return false;
        }
        else {

            return true;

        }

    }
    
})
