# InspireTask
![Local Image](demo.png)

## Features

### Task List Management

- Users can add tasks to a list.
- Each task includes a description, a "Delete" button, an "Edit" button, and a checkbox to mark it as completed.
- Tasks are stored in the browser's local storage, allowing them to persist even if the page is refreshed.

### Time and Date Display

- The application displays the current time and date.
- The time is shown in a 12-hour format with hours, minutes, seconds, and an AM/PM indicator.
- The date is presented with the day, month, and year, along with the name of the weekday.

### Random Quote Display

- The application fetches a random quote from a JSON file (`data.json`) using the Fetch API.
- The quote is displayed on the webpage and updates every hour.

### User Interaction

- Users can edit task descriptions by clicking the "Edit" button, prompting them with a dialog to enter a new task description.
- Completed tasks can be marked using checkboxes, and their status is stored in local storage.
- Users can delete tasks, removing them from both the webpage and local storage.

### Styling

- The application features basic styling for a pleasant user interface.
- Delete and Edit buttons are styled with specific colors and hover effects.
- Time and date elements are styled and updated every second.

## How to Use

1. Clone the repository.
2. Open the `index.html` file in a web browser.


## License

This project is licensed under the [MIT License](LICENSE).
