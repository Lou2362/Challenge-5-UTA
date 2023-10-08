// Pulls current day from Moment.js and writes it to paragraph
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

// Pulls current hour in military time (24 hour) for hourColorSetter on intial page laod before hourChecker initiates
let currentHour = Number(moment().format("HH"));

// Creates nodeList of all textareas -- called by hourColorSetter() and .each method on Line 58
const taskInputs = $(".task-input textarea");

const hourColorSetter = ()=> {
    // Iterates through nodeList of textareas
    taskInputs.each(function() {
        // If statements compare value of textarea data-time attribute against currentHour

        // For assigning future class
        if ($(this).data("time") > currentHour) {
            // Adds corresponding class to change color
            $(this).parent().addClass("future");

            // Removes any existing classes from previous day
            $(this).parent().removeClass("past");
            $(this).parent().removeClass("present");

            // Removes any readonly attributes from previous day
            // $(this).attr("readonly", false);

        // For assigning current class
        } else if ($(this).data("time") === currentHour) {
            $(this).parent().addClass("present");
            $(this).parent().removeClass("past");
            $(this).parent().removeClass("future");
            // $(this).attr("readonly", false);

        // For assigning past class
        } else {
            $(this).parent().addClass("past");
            $(this).parent().removeClass("present");
            $(this).parent().removeClass("future");
            // Adds readonly attributes to make past hour textareas uneditable
            // $(this).attr("readonly", true);
        }
    })
}

// Checks currentHour variable against pull from moment.js every second and updates if currentHour is lower (meaning hour has changed)
const hourChecker = setInterval(() => {
    // Pulls current day from Moment.js and writes it to paragraph (for updating day if planner is open at midnight)
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    // Sets currentHour equal to current hour pulled from moment.js
    currentHour = Number(moment().format("HH"));

    // Runs evaluation to update colors when hour changes
    hourColorSetter();
}, 1000);

// Assigns click listener to save divs
$(".saveBtn").on("click", (e) => {
    // Pulls data-time attribute of parent of textarea for associated save button
    const taskHour = $(e.target).siblings(".task-input").children("textarea").data("time");

    // Pulls value from textarea for associated save button
    const task = $(e.target).siblings(".task-input").children("textarea").val();

    // Pushes task value to local storage with data-time attribute as key for repopulating later
    localStorage.setItem(taskHour, task);
});

// Assigns click listener to save icons
$(".saveBtn i").on("click", (e) => {
    // Prevents click event from bubbling to div listener
    e.stopPropagation();

    // Pulls data-time attribute of parent of textarea for associated save button
    const taskHour = $(e.target).parent().siblings(".task-input").children("textarea").data("time");

    // Pulls value from textarea for associated save button
    const task = $(e.target).parent().siblings(".task-input").children("textarea").val();

    // Pushes task value to local storage with data-time attribute as key for repopulating later
    localStorage.setItem(taskHour, task);
});

// Called on runtime to iterate through nodeList of textareas and populate existing values from localStorage
taskInputs.each(function() {
    // Confirms item exists for specified hour in localStorage
    if (localStorage.getItem($(this).data("time"))) {
        // Populates textarea with value of matching key to data-time attribute
        $(this).text(localStorage.getItem($(this).data("time")));
    }
})

// Called on runtime to color timeblocks before hourChecker begins running
hourColorSetter();