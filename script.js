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

// Function to create card
function createCard(todo) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", todo.id);

  card.innerHTML = `
    <h3>${todo.title}</h3>
    <p>User ID: ${todo.userId}</p>
    <p class="${todo.completed ? 'completed' : 'not-completed'}">
      ${todo.completed ? "Completed" : "Not Completed"}
    </p>
    <button class="delete-btn">Delete</button>
  `;

  // Add delete functionality
  const deleteBtn = card.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          card.remove(); // remove from UI instantly
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