$(document).ready(function() {
  console.log("ready!");
  $("#limerick_stanzaLine1checkbox").change(function() {
    if ($(this).prop('checked') === true) {

      var timeout;
      var delay = 2000; // 2 seconds

      $('#limerick_stanzaLine1').keyup(function(e) {
        console.log("typing started");
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
          lastWordOfLine();
        }, delay);
      });

      $("#limerick_stanzaLine1")
        .keyup(function() {
          var value = $(this).val();
          console.log(value);
          $("#testing").text(value);
        })
        .keyup();

      function lastWordOfLine() {
        var last_arr = $('#testing').text().split(' ');
        var las = last_arr[last_arr.length - 1];
        console.log(las);
      }

      // setTimeout(function() {
      //   $.ajax({
      //       method: "GET",
      //       url: "http://rhymebrain.com/talk?function=getRhymes&word=" + rhymeQuery,
      //       // data: 
      //     })
      //     .done(function(data) {
      //       console.log("Data Saved: " + data);
      //       var rhymeAPIresponse = JSON.parse(data);
      //       console.log(rhymeAPIresponse);
      //     });
      // }, 1000);
    } else {
      console.log("checkbox deselected");
    }
  });
}); // END $document.ready
