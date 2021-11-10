function add_rows(table_sel, arr) {
    $(table_sel).ready(function() {
        row_html = ""
        for (var i = 0; i < arr.length; i++) {
            row_html += "<tr>"
            for (var j = 0; j < arr[i].length; j++) {
                row_html += "<td>" + arr[i][j] + "</td>"
            }
            row_html += "</tr>"
        }
        $(table_sel).append(row_html);
    });
}