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
          lastWordOfLine().then(function(word) {

            getWordRhymes(word);

          });

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
        return new Promise(function(res, rej) {
          var last_arr = $('#testing').text().split(' ');
          var las = last_arr[last_arr.length - 1];
          res(las);
        });
      };

      function getWordRhymes(las) {
        // body...
        console.log(las);
        $.ajax({
            method: "POST",
            url: "/getRhymes",
            data: { word: las }
          })
          .done(function(data) {
            // console.log(data);
            var rhymeSchemeResultsA = data;
            console.log(rhymeSchemeResultsA);

          });



        // $.getJSON(("http://rhymebrain.com/talk?function=getRhymes&lang=en&jsonp&word=" + las + "?callback=?"), function(json) {
        //   console.log(json);
        // });
        /*
          function logResults(json) {
            console.log(json);
          }
          var rhymeQueryString = "http://rhymebrain.com/talk?function=getRhymes&lang=en&jsonp&word=" + las;
          $.ajax({
            url: rhymeQueryString,
            dataType: "jsonp",
            jsonpCallback: "logResults"
          });
          */

        /*
        var rhymeQueryString = "http://rhymebrain.com/talk?function=getRhymes&lang=en&jsonp&word=" + las;

        $.ajax({
          method: "GET",
          url: rhymeQueryString
        })
        // $.ajax(settings).done(function(response) {
        //   console.log(response);
        // });
        .done(function(data) {
          console.log("Data Saved: " + data);
          //var rhymeAPIresponse = JSON.parse(data);
          //console.log(rhymeAPIresponse);
        });
        */


      } //get Rhyme word closing

    } else {
      console.log("checkbox deselected");
    }
  });
}); // END $document.ready
