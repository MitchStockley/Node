//dding an event listener to each button in recipeApp.js
$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener(); //add event listenar on your buttons after the ajax requests completes
    });
  });
});

let addJoinButtonListener = () => { //create the event listenar for the modal button
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id"); //grab the button and button id data
    $.get(`/api/courses/${courseId}/join`, (results = {}) => { //make an ajax request with the courses ID to join
      let data = results.data;
      if (data && data.success) { //check whether the join was successfull
        $button
          .text("Joined") 
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
