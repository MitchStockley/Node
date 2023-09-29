//Listing 29.4 Creating an Ajax function to retrieve course data
$(document).ready(() => { //wait for the dom to load
  $("#modal-button").click(() => { //handle click event pn the modal button
    $(".modal-body").html(""); //reset modals body content to a empty string
    $.get(`/api/courses`, (results = {}) => { //fetch course data via an ajax get request
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => { //loop through each course an eppend to the modal body
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
			console.log(`/api/courses/${courseId}/join`)
    $.get(`/api/courses/${courseId}/join`, (results = {}) => { //make an aoi call to join the selected courses
      let data = results.data;
      if (data && data.success) {
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
