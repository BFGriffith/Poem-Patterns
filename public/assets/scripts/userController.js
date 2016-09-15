$(document).ready(function() {
  console.log("ready!");
  $("#createUser").click(function(e) {
    e.preventDefault();
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    console.log(username);
    console.log(password);
    $.ajax({
        method: "POST",
        url: "/signup",
        data: { username: username, password: password }
      })
      .done(function(data) {
        alert("Data Saved: " + data);
        // save in local storage to attach to poems with userID
      });
  });
});
