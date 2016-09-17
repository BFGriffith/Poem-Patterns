$(document).ready(function() {
  console.log("ready!");
  $("#limerick_stanzaLine1checkbox").change(function() {
    if ($(this).prop('checked') == true) {
      console.log("checkbox selected");
    } else {
      console.log("checkbox deselected");
    }
  });
}); // END $document.ready
