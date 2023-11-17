
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("btnLogin").addEventListener('click', authenticate);

    function authenticate() {

        var email = document.querySelector("#email").value;
        var password = document.querySelector("#password").value;

        if (email != "" && password != "") {

            let body = {
                email: email,
                password: password 
            }

            fetch('/login', {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)

            }).then(r => {

                return r.json();

            }).then(r => {

                if (r.status == true) {

                    window.location.href = '/';

                }
                else {

                    document.getElementById("alertMsg").innerHTML = '<div class="alert alert-danger">'+ r.msg +'</div>';

                }

            });

        }
        else {

            alert("Invalid User or Password");

        }

    }

});