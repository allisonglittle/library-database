function updatePatron(id){
    $.ajax({
        url: '/patrons/' + id,
        type: 'PUT',
        data: $('#update-patron').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};