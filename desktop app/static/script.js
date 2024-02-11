        function addTask() {
        	var taskInput = document.getElementById("taskInput");
        	var taskList = document.getElementById("taskList");
        	if (taskInput.value.trim() !== "") {
        		// Create a new list item
        		var li = document.createElement("li");
        		var taskText = document.createTextNode(taskInput.value);
        		li.appendChild(taskText);
        		// Add a delete button
        		var deleteButton = document.createElement("button");
        		deleteButton.appendChild(document.createTextNode("DEL"));
        		deleteButton.className = "delete-button"; // Apply the delete button style
        		deleteButton.onclick = function () {
        			// Remove the task from the list
        			taskList.removeChild(li);
        			// Remove the task from local storage
        			removeFromLocalStorage(taskText.textContent);
        		};
        		// Add an edit button
        		var editButton = document.createElement("button");
        		editButton.appendChild(document.createTextNode("Edit"));
        		editButton.className = "edit-button"; // Apply the edit button style
        		editButton.onclick = function () {
        			var updatedTask = prompt("Edit task:", taskText.textContent);
        			if (updatedTask !== null) {
        				taskText.textContent = updatedTask;
        				// Update the task in local storage
        				updateLocalStorage(taskText.textContent, updatedTask);
        			}
        		};
        		// Add a completed checkbox
        		var completedCheckbox = document.createElement("input");
        		completedCheckbox.type = "checkbox";
        		completedCheckbox.onclick = function () {
        			li.classList.toggle("completed");
        			// Update the task status in local storage
        			updateTaskStatusInLocalStorage(taskText.textContent, li.classList.contains("completed"));
        		};
        		li.appendChild(deleteButton);
        		li.appendChild(editButton);
        		li.appendChild(completedCheckbox);
        		taskList.appendChild(li);
        		// Save the task to local storage
        		saveToLocalStorage(taskText.textContent);
        		// Clear the input field
        		taskInput.value = "";
        	}
        }

        function saveToLocalStorage(task) {
        	var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        	tasks.push({
        		text: task,
        		completed: false
        	});
        	localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function removeFromLocalStorage(task) {
        	var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        	var updatedTasks = tasks.filter(function (t) {
        		return t.text !== task;
        	});
        	localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }

        function updateLocalStorage(oldTask, newTask) {
        	var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        	var updatedTasks = tasks.map(function (t) {
        		if (t.text === oldTask) {
        			t.text = newTask;
        		}
        		return t;
        	});
        	localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }

        function updateTaskStatusInLocalStorage(task, completed) {
        	var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        	var updatedTasks = tasks.map(function (t) {
        		if (t.text === task) {
        			t.completed = completed;
        		}
        		return t;
        	});
        	localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }

        function loadTasksFromLocalStorage() {
        	var taskList = document.getElementById("taskList");
        	var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        	tasks.forEach(function (task) {
        		var li = document.createElement("li");
        		var taskTextNode = document.createTextNode(task.text);
        		li.appendChild(taskTextNode);
        		// Add a delete button
        		var deleteButton = document.createElement("button");
        		deleteButton.appendChild(document.createTextNode("DEL"));
        		deleteButton.className = "delete-button"; // Apply the delete button style
        		deleteButton.onclick = function () {
        			taskList.removeChild(li);
        			removeFromLocalStorage(task.text);
        		};
        		// Add an edit button
        		var editButton = document.createElement("button");
        		editButton.appendChild(document.createTextNode("Edit"));
        		editButton.onclick = function () {
        			var updatedTask = prompt("Edit task:", task.text);
        			if (updatedTask !== null) {
        				taskTextNode.textContent = updatedTask;
        				updateLocalStorage(task.text, updatedTask);
        			}
        		};
        		// Add a completed checkbox
        		var completedCheckbox = document.createElement("input");
        		completedCheckbox.type = "checkbox";
        		completedCheckbox.onclick = function () {
        			li.classList.toggle("completed");
        			updateTaskStatusInLocalStorage(task.text, li.classList.contains("completed"));
        		};
        		// Set the initial state based on local storage
        		if (task.completed) {
        			li.classList.add("completed");
        			completedCheckbox.checked = true;
        		}
        		li.appendChild(deleteButton);
        		li.appendChild(editButton);
        		li.appendChild(completedCheckbox);
        		taskList.appendChild(li);
        	});
        }
        // Load tasks from local storage when the page loads
        loadTasksFromLocalStorage();

        function updateTimeAndDate() {
        	var hourElement = document.getElementById("hour");
        	var minuteElement = document.getElementById("minute");
        	var secondAmPmElement = document.getElementById("secondAmPm"); // Combine seconds and AM/PM in one element
        	var dayElement = document.getElementById("day");
        	var monthElement = document.getElementById("month");
        	var yearElement = document.getElementById("year");
        	var weekdayElement = document.getElementById("weekday");
        	var now = new Date();
        	// Display time
        	var hours = now.getHours();
        	var amPm = hours >= 12 ? 'PM' : 'AM';
        	hours = hours % 12 || 12; // Convert to 12-hour format
        	var minutes = now.getMinutes();
        	var seconds = now.getSeconds();
        	var formattedSeconds = formatTimeComponent(seconds);
        	var displayTime = `${formattedSeconds}<br>${amPm}`;
        	hourElement.innerHTML = formatTimeComponent(hours);
        	minuteElement.innerHTML = formatTimeComponent(minutes);
        	secondAmPmElement.innerHTML = displayTime;
        	// Display date and weekday
        	var day = now.getDate();
        	var month = now.getMonth() + 1; // Months are zero-based
        	var year = now.getFullYear();
        	var weekday = getWeekdayName(now.getDay());
        	dayElement.textContent = formatTimeComponent(day);
        	monthElement.textContent = formatTimeComponent(month);
        	yearElement.textContent = formatTimeComponent(year);
        	weekdayElement.textContent = weekday;
        }

        function formatTimeComponent(component) {
        	return component < 10 ? "0" + component : component;
        }

        function getWeekdayName(dayIndex) {
        	var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        	return weekdays[dayIndex];
        }
        // Update time and date every second
        setInterval(updateTimeAndDate, 1000);
        // Initial call to set the time and date immediately when the page loads
        updateTimeAndDate();

        function getRandomQuote() {
        	// Use the data attribute in your JavaScript code
        	fetch(jsonUrl)
        		.then(response => response.json())
        		.then(data => {
        			// Check if the JSON data contains an array of quotes
        			if (Array.isArray(data) && data.length > 0) {
        				// Pick a random quote from the array
        				var randomIndex = Math.floor(Math.random() * data.length);
        				var randomQuote = data[randomIndex].quote;
        				displayQuote(randomQuote);
        			} else {
        				displayQuote("No quotes found in the data.json file.");
        			}
        		})
        		.catch(error => {
        			console.error('Error fetching data:', error);
        			displayQuote("An error occurred while fetching the quotes.");
        		});
        }

        function displayQuote(quote) {
        	// Implement your code for displaying the quote
        	console.log(quote);
        }

        // Initial call to get a quote when the page loads
        getRandomQuote();

        function displayQuote(quote) {
        	var quoteElement = document.getElementById("quote-text");
        	quoteElement.textContent = quote;
        }
        // Get a new quote every 5 minutes)
        setInterval(getRandomQuote, 300000);
        getRandomQuote();

        //Save tasks by pressing "Enter" from keyborad 
        document.addEventListener("DOMContentLoaded", function () {
        	// Attach event listener to the task input
        	var taskInput = document.getElementById("taskInput");
        	taskInput.addEventListener("keyup", function (event) {
        		if (event.key === "Enter") {
        			addTask();
        		}
        	});
        });


        //weather API
        document.addEventListener("DOMContentLoaded", function () {
        	// Check if the Geolocation API is available
        	if ('geolocation' in navigator) {
        		navigator.geolocation.getCurrentPosition(position => {
        			const latitude = position.coords.latitude;
        			const longitude = position.coords.longitude;
        			const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit&forecast_days=3`;
        			fetch(apiURL).then(response => response.json()).then(data => {
        				if (data.current && data.current.temperature_2m) {
        					document.getElementById("temperature").innerHTML = `<span id="temperature1">${data.current.temperature_2m} °F</span>`;
        					document.getElementById("loading").style.display = "none";
        				} else {
        					document.getElementById("temperature").textContent = "Unable to fetch temperature";
        					document.getElementById("loading").style.display = "none";
        				}
        			}).catch(error => {
        				console.error("Error fetching weather data:", error);
        				document.getElementById("temperature").textContent = "Error fetching data";
        				document.getElementById("loading").style.display = "none";
        			});
        		}, error => {
        			console.error("Error getting geolocation:", error);
        			document.getElementById("temperature").innerHTML = "Error getting geolocation<br>Turn on your location";
        			document.getElementById("loading").style.display = "none";
        		});
        	} else {
        		console.error("Geolocation is not supported");
        		document.getElementById("temperature").textContent = "Geolocation is not supported";
        		document.getElementById("loading").style.display = "none";
        	}
        });
