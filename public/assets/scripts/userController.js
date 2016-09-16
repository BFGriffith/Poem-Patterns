// login and user creation controller: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
$(document).ready(function() {
  console.log("ready!");
  $("#createUser").click(function(e) {
    e.preventDefault();
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    console.log(username);
    $.ajax({
        method: "POST",
        url: "/signup",
        data: { username: username, password: password }
      })
      .done(function(data) {
        console.log("Data Saved: " + data);
        // save in local storage to attach to poems with userID
        var user = data;
        sessionStorage.setItem('user', JSON.stringify(user));
        var userObj = JSON.parse(sessionStorage.user);
      });
  });

  $("#submitUser").click(function(e) {
    e.preventDefault();
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    console.log(username);
    function loginChecker(form) {
      $.ajax({
          method: "POST",
          url: "/signin",
          data: { username: username, password: password }
        })
        .done(function(data) {
          console.log("Data Saved: " + data);
          // save in local storage to attach to poems with userID
          /*
          for (i = 0; i < data.val().length; i++) {
            if (form.username.value == data.username && form.password.value == data.password) {
              alert("error: some of those values already exist in the database");
            } else {
              $.ajax({
                  method: "GET",
                  url: "/users",
                  data: { username: username, password: password }
                })
                .done(function(data) {
                  // alert("Data Saved: " + data);
                  // save in local storage to attach to poems with userID
                  var user = data;
                  sessionStorage.setItem('user', JSON.stringify(user));
                  var userObj = JSON.parse(sessionStorage.user);
                });
            }
          } // END for-loop
          */

        }); // END .done

    }; // END loginChecker
  }); // END submitUser

}); // END $document.ready


// var username = $("#username").val().trim();
      // var password = $("#password").val().trim();
      // console.log(username);
      // $.ajax({
      //     method: "POST",
      //     url: "/signup",
      //     data: { username: username, password: password }
      //   })
      //   .done(function(data) {
      //     console.log("Data Saved: " + data);
      //     data = user;
      //     sessionStorage.setItem('user', JSON.stringify(user));
      //     var userObj = JSON.parse(sessionStorage.user);
      //   });
