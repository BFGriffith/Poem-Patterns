$(document).ready(function() {

  $('.poemLine').keypress(function(enterEvent) {
    var keycode = (enterEvent.keyCode ? enterEvent.keyCode : enterEvent.which);
    if (keycode == '13') {
      // $( "#x" ).prop( "checked", true );
      console.log('You pressed a "enter" key in textbox');
    }
    enterEvent.stopPropagation();
  }); // END .poemLine

  //console.log("ready!");
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
          $("#testingA").text(value);
        })
        .keyup();

      function lastWordOfLine() {
        return new Promise(function(res, rej) {
          var last_arr = $('#testingA').text().split(' ');
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
            console.log(data);
            var rhymeSchemeResultsA = data;
            var parsedRhymeSchemeResultsA = jQuery.parseJSON(rhymeSchemeResultsA);
            // console.log(typeof parsedRhymeSchemeResultsA);
            // console.log(parsedRhymeSchemeResultsA);
            var rhymeSchemeResultsA_dropdown = '';
            for (var i = 0; i < parsedRhymeSchemeResultsA.length; i++) {
              console.log(parsedRhymeSchemeResultsA[i]);
              rhymeSchemeResultsA_dropdown += '<option value="' + parsedRhymeSchemeResultsA[i].word + '">' + parsedRhymeSchemeResultsA[i].word + '</option>';
            }
            $('#rhymeSchemeA1').append(rhymeSchemeResultsA_dropdown);
            $('#rhymeSchemeA2').append(rhymeSchemeResultsA_dropdown);
            $('#rhymeSchemeA3').append(rhymeSchemeResultsA_dropdown);
          }); // END .done
      }; //get Rhyme word closing

    } else {
      console.log("checkbox deselected");
    }
  }); // END #limerick_stanzaLine1checkbox
  // Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
  $("#limerick_stanzaLine3checkbox").change(function() {
    if ($(this).prop('checked') === true) {

      var timeout;
      var delay = 2000; // 2 seconds

      $('#limerick_stanzaLine3').keyup(function(e) {
        console.log("typing started");
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
          lastWordOfLine().then(function(wordB) {

            getWordRhymes(wordB);

          });

        }, delay);
      });

      $("#limerick_stanzaLine3")
        .keyup(function() {
          var valueB = $(this).val();
          console.log(valueB);
          $("#testingB").text(valueB);
        })
        .keyup();

      function lastWordOfLine() {
        return new Promise(function(res, rej) {
          var last_arrB = $('#testingB').text().split(' ');
          var lasB = last_arrB[last_arrB.length - 1];
          res(lasB);
        });
      };

      function getWordRhymes(lasB) {
        // body...
        console.log(lasB);
        $.ajax({
            method: "POST",
            url: "/getRhymesB",
            data: { wordB: lasB }
          })
          .done(function(data) {
            console.log(data);
            var rhymeSchemeResultsB = data;
            var parsedRhymeSchemeResultsB = jQuery.parseJSON(rhymeSchemeResultsB);
            // console.log(typeof parsedRhymeSchemeResultsB);
            // console.log(parsedRhymeSchemeResultsB);
            var rhymeSchemeResultsB_dropdown = '';
            for (var j = 0; j < parsedRhymeSchemeResultsB.length; j++) {
              console.log(parsedRhymeSchemeResultsB[j]);
              rhymeSchemeResultsB_dropdown += '<option value="' + parsedRhymeSchemeResultsB[j].word + '">' + parsedRhymeSchemeResultsB[j].word + '</option>';
            }
            $('#rhymeSchemeB1').append(rhymeSchemeResultsB_dropdown);
            $('#rhymeSchemeB2').append(rhymeSchemeResultsB_dropdown);
          }); // END .done
      }; //get Rhyme word closing

    } else {
      console.log("checkbox deselected");
    }
  }); // END #limerick_stanzaLine3checkbox
  // Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
}); // END $document.ready


// NEW limerick archiving
$(document).ready(function() {

  $('#limerick_template').on('submit', addLimerick);

  function addLimerick(event) {
    event.preventDefault();
    // basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#limerick_template input').each(function(index, val) {
      if ($(this).val() === '') { errorCount++; }
    });
    // check if errorCount is zero
    if (errorCount === 0) {
      // compile limerick into object
      var newLimerick = {
        'limerickLine1': $('#limerick_stanzaLine1').val(),
        'limerickLine2': $('#limerick_stanzaLine2').val(),
        'limerickLine3': $('#limerick_stanzaLine3').val(),
        'limerickLine4': $('#limerick_stanzaLine4').val(),
        'limerickLine5': $('#limerick_stanzaLine5').val()
      }
      console.log(newLimerick);
      // AJAX post
      $.ajax({
        type: 'POST',
        data: newLimerick,
        url: '/limericks/addLimerick',
        dataType: 'JSON'
      })
      .then(function(response) {
        // check for successful (blank) response
        if (response.msg === '') {
          // clear form inputs
          $('#limerick_template fieldset input').val('');
          // populate the stanza into the view
          // populateStanza();
        }
      })
      .fail(function(err) {
        console.log('Error: ' + err);
      }); // END .done
    } else {
      // if errorCount is > 0, output error
      console.log('Please complete the stanza.');
      return false;
    }
  }; // END addLimerick

}); // END $document.ready

