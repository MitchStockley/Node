//Listing 26.6 Ajax function to load data in modal in recipeApp.js
$(document).ready(() => { //wait for the dom to load
  $("#modal-button").click(() => { //listen for click event
    $(".modal-body").html(""); //clear modal from any previos content
    $.get("/courses?format=json", data => { //request data from /courses?format=js asynchronously
      data.forEach(course => { //loop through the array of data in the response 
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    });
  });
});
