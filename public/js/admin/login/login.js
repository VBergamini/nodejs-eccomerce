
document.addEventListener('DOMContentLoaded', function() {

    if(!this.cookie) {

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

                        document.getElementById("alertMsg").innerHTML = '<div class="alert alert-primary">'+ r.msg +'</div>';

                    }

                });

            }
            else {

                alert("Invalid User or Password");

            }

        }

    }
    else {
    
        document.querySelector('.login-box').style.display = 'none';
        document.querySelector(".LogedInMsg").innerHTML = `
        <div class="container">
            <p class="alert alert-warning">You are already logged in, do you want to log out?</p>
            <div class="text-right">
                <a class="btn btn-secondary m-2" href="/">No</a>
                <a class="btn btn-primary m-2" href="/login/logout">Yes</a>
            </div>
        </div>`;

    }

});