$(document).ready(function () {
    $("#btnBuy").on('click', function () {
        $("#tr").show();
        return false;
    });


    $("#headBuy").on('click', function() {
        $("#tr").hide();
        return true;
    });
});