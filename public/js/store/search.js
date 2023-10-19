document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#btnSearch').addEventListener('click', Search);

    function Search() {

        var campoBusca = document.querySelector('#campoBusca');

        if (campoBusca.value != '') {
            
            let busca = { busca: campoBusca.value };

            fetch('/loja/busca', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(busca)
            })
            .then(r=> {

                return r.json();

            })
            .then(r=> {

                if (r.ok) {

                    alert(r.msg);

                }
                else {

                    alert(r.msg);

                }

            });

        }
        else {

            alert('Digita algo para buscar');

        }

    }
    
})