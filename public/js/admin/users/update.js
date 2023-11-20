
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnUpdate").addEventListener('click', updateUser);

    function updateUser() {

        var id = document.getElementById("userId");
        var name = document.getElementById("userName");
        var email = document.getElementById("userEmail");
        var profile = document.getElementById("userProfile");
        var password = document.getElementById("userPassword");
        var active = document.getElementById("userActive");

        if (validate(name, email, profile, password)) {
           
            let user = {
                id: id.value,
                name: name.value,
                email: email.value,
                profile: profile.value,
                password: password.value,
                active: active.checked == true ? "Y" : "N"
            }

            if(confirm('Are You Sure?')) {

                fetch('/users/update', {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                    
                })
                .then(r => {
    
                    return r.json();
    
                })
                .then(r => {
    
                    if (r.ok) {
    
                        document.querySelector('.userUpdateMsg').innerHTML = `<span class="alert alert-success">${r.msg}</span>`;

                        setTimeout(function(){

                            document.querySelector('.userUpdateMsg').innerHTML = '';
                            window.location.href = '/users';

                        }, 3000);
    
                    }
                    else {
    
                        alert(r.msg);
    
                    }
    
                });

            }

        }
        else {

            alert("Fill in the highlighted fields correctly!");

        }

    }

    function validate(name, email, profile, password) {

        name.style["border-color"] = "";
        email.style["border-color"] = "";
        profile.style["border-color"] = "";
        password.style["border-color"] = "";
        var errs = [];

        if (name.value.trim() == "") {
            errs.push(name);
        }
        if (email.value.trim() == "") {
            errs.push(email);
        }
        if (profile.value.trim() == 0) {
            errs.push(profile);
        }
        if (password.value.trim() == "") {
            errs.push(password);
        }

        if (errs.length > 0) {

            for (let i = 0; i<errs.length; i++) {

                errs[i].style["border-color"] = "red";

            }

            return false;

        }
        else {

            return true;

        }

    }
    
})
