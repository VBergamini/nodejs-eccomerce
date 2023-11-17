document.addEventListener('DOMContentLoaded', function() {

    var fileName = document.querySelector('input[name="searchCriteria"]:checked').parentNode.innerText;
    var date = new Date().toLocaleDateString()

    document.querySelector('#exportPDF').addEventListener('click', exportPDF);

    function exportPDF() {

        var title = document.title;
        document.title = 'PFS1 -' + ' Report by ' + fileName + ' on ' + date;
        window.print();
        document.title = title;

    }

    document.querySelector('#exportEXCEL').addEventListener('click', exportExcel);

    function exportExcel() {

        var wb = XLSX.utils.table_to_book(document.querySelector('#ordersTable'));
        XLSX.writeFile(wb, 'PFS1 -' + 'Report by' + fileName + ' on ' + date + '.xlsx');

    }

    function tableFilter() {

        var searchCriteria = document.querySelector('input[name="searchCriteria"]:checked').value;
        var searchTerms = document.querySelector('#inputSearch').value;

        // fetch

    }
})