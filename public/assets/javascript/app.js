$(document).ready(function() {

  /******  Articles  ******/

  // click event to scrape new articles
  $("#scrape-new").on("click", function (event){
    console.log("You are inside of app.js scrape");
	  event.preventDefault();
	  $.ajax({
	    url: "/scrape",
	    type: "GET",
	    success: function (response) {
		    window.location.href = "/";
	    }
	  });
  });

  // Click event to save an article
  $(document).on("click", "#save-article", function(event) {
    event.preventDefault();
    var articleID = $(this).attr("data-id");  
    $.ajax({
      url: "/save-article/" + articleID,
      type: "POST",
      success: function (response) {
        window.location.href = "/";
      },
      error: function(error) {
        console.log("error " + JSON.stringify(error));
      }
    });
  });

  // Click event to clear all unsaved articles
  $(document).on("click", "#clear-unsaved", function() {
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/clear-unsaved"
    }).then(function(data) {
      console.log(data);
      location.reload();  
    });
  });

  // Click event to clear all saved articles
  $(document).on("click", "#clear-saved", function() {
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/clear-saved"
    }).then(function(data) {
      console.log(data);
      location.reload();  
    });
  });


  // Click event to delete a saved article
  $(document).on("click", "#delete-article", function(event) {
    console.log("You are inside of app.js delete-article")
    event.preventDefault();
    var articleID = $(this).attr("data-id");
    console.log("articleID = " + articleID) 
    $.ajax({
      url: "/delete-article/" + articleID,
      type: "POST",
      success: function (response) {
        window.location.href = "/saved";
      },
      error: function(error) {
        console.log("error " + JSON.stringify(error));
      }
    });
  });

  /******  Notes  ******/

  // Click event to save a note
  $("body").on("click", ".save-note", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("You are inside of app.js 'save a note'");

    var articleID = $(this).attr("data-id");
   
    console.log("articleID: " + articleID);

    // Send the POST request.
    $.ajax({
      url: "/save-note/" + articleID,
      type: "POST",
      dataType: "json",
      data: {
        noteBody: $(`#noteBodyInput${articleID}`).val(),
        createDate: Date.now()
      }
    }).then(
      function(dbArticle) {
        console.log("dbArticle: " + JSON.stringify(dbArticle));
        location.reload();
      }
    );
  });

  // Click event to delete a note
  $("body").on("click", ".note-delete", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("You are inside of app.js 'delete a note'");

    var noteID = $(event.target).attr("id");

    console.log("noteID: " + noteID);

    // Send the POST request.
    $.ajax({
      url: "/delete-note/" + noteID,
      type: "POST"
    }).then(
      function(data) {
        console.log("data: " + JSON.stringify(data));
        location.reload();
      }
    );

  });
    
});
