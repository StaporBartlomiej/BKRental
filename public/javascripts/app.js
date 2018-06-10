
$(function(){

    $("#register").on('click', function(event){
        event.preventDefault();
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var r_password = $("#repeat_password").val();

        if (!firstname || !lastname || !email || !password || !r_password){
            $("#msgDiv").show().html("All fields are required.");
        } else if (r_password !== password) {
            $("#password").val("");
            $("#repeat_password").val("");
            $("#msgDiv").show().html("Passwords should match.");
        } else{
            $("#form").submit();
        }
    });
});