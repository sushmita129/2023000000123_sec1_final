const container = document.getElementById("todoContainer");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(data => {
    data.slice(0, 20).forEach(todo => {
      createCard(todo);
    });
  })
  .catch(error => {
    console.log("Error:", error);
  });

// Create card function
function createCard(todo) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", todo.id);

  let completed = todo.completed;

  card.innerHTML = `
    <h3>${todo.title}</h3>
    <p>User ID: ${todo.userId}</p>

    <p class="status-text ${completed ? 'completed' : 'not-completed'}">
      ${completed ? "Completed" : "Pending"}
    </p>

    <button class="toggle-btn">Toggle Status</button>
    <button class="delete-btn">Delete</button>
  `;

  const statusText = card.querySelector(".status-text");
  const toggleBtn = card.querySelector(".toggle-btn");
  const deleteBtn = card.querySelector(".delete-btn");

  // 🔁 Toggle Status (PATCH request)
  toggleBtn.addEventListener("click", () => {
    const newStatus = !completed;

    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: newStatus
      })
    })
      .then(response => {
        if (response.ok) {
          completed = newStatus;

          // Update UI instantly
          statusText.textContent = completed ? "Completed" : "Pending";
          statusText.className = `status-text ${completed ? 'completed' : 'not-completed'}`;
        } else {
          console.log("Failed to update status");
        }
      })
      .catch(error => {
        console.log("Error updating:", error);
      });
  });

  // Delete request
  deleteBtn.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          card.remove();
        } else {
          console.log("Failed to delete");
        }
      })
      .catch(error => {
        console.log("Error deleting:", error);
      });
  });

  container.appendChild(card);
}