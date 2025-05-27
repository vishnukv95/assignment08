let taskInput = document.getElementById("task-input");
let inputButton = document.getElementById("input-button");
let taskList = document.getElementById("task-list");
let completedTasks = document.getElementById("completed-task-list");
let activeTaskHeading = document.getElementById("active-task-heading")
let completedTaskHeading = document.getElementById("complete-task-heading")


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let completedTaskList =  JSON.parse(localStorage.getItem("completedTaskList")) || [];

render();
completedTaskListrender();


inputButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (taskInput.value.trim() == "") {
    return alert("Enter task");
  }

  tasks.push(taskInput.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";

  render();
});


//This function is for rendering active tasks

function render() {
  taskList.innerHTML = "";

  noTaskMessage();

  if (tasks.length === 0) {
    activeTaskHeading.style.display = "none";
  } else {
    activeTaskHeading.style.display = "block";
  }


    tasks.forEach((tasktext, index) => {
      let card = document.createElement("div");
      card.className = "taskcard col-12 col-md-6 col-lg-3 ";
      card.innerHTML = `
                 <div class="card h-100 " >
             
                   <div class="card-body">
                     <p  class="card-text text-center w-100 mb-3 p-2 mx-auto">${tasktext}</p>
                    
                  </div>
                   <div   class="d-flex justify-content-evenly">
                     <button type="button"  class="btn complete-button btn-outline-success toggle-complete mb-3 p-1 ">
                         <i class="bi bi-check-circle"></i> Completed
   
                        </button>

                        <button type="button"  class="btn delete-button btn-outline-danger btn-lg mb-3 p-1 w-25">
                        <i class="bi bi-trash"></i>
                     </button>
                     </div>
                </div>
    
    `;

      const completebutton = card.querySelector(".complete-button");
      completebutton.addEventListener("click", () => {
        completedTaskList.push(tasks.splice(index, 1)[0]);
        localStorage.setItem(
          "completedTaskList",
          JSON.stringify(completedTaskList)
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
        completedTaskListrender();
       
        render();
      });

      const deleteButton = card.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render();
      });

      taskList.appendChild(card);
    });
  }


// This function is for rendering completed tasks

function completedTaskListrender() {
  completedTasks.innerHTML = "";

  if (completedTaskList.length === 0) {
    completedTaskHeading.style.display = "none";
  } else {
    completedTaskHeading.style.display = "block";
  }


  completedTaskList.forEach((tasktext, index) => {
    let card = document.createElement("div");
    card.className = "taskcard col-12 col-md-6 col-lg-3 m-5";
    card.innerHTML = `   
                 <div class="card h-100 " >
                   <div class="card-body">
                     <p  class="card-text text-center text-decoration-line-through  w-100 mb-3 p-2 mx-auto">${tasktext}</p>
                    
                  </div>
                   <div   class="d-flex justify-content-evenly">
                     <button type="button"  class="btn disabled complete-button btn-outline-grey toggle-complete mb-3 p-1 ">
                         <i class="bi bi-check-circle"></i> Completed
   
                        </button>

                        <button type="button"  class="btn delete-button btn-outline-danger btn-lg mb-3 p-1 w-25">
                        <i class="bi bi-trash"></i>
                     </button>
                     </div>
                </div>
    
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      completedTaskList.splice(index, 1);
      localStorage.setItem(
        "completedTaskList",
        JSON.stringify(completedTaskList)
        
      );
      completedTaskListrender();
      render();
    });

    completedTasks.appendChild(card);
  });
}


// This function checks if there is any tasks in both active and completed sections

function noTaskMessage() {
  if (tasks.length === 0&&completedTaskList.length===0) {
    let message = document.createElement("div");
    message.innerHTML = `
           <h2 class="text-center text-danger">"No Tasks to Show"</h2>
           `;
    taskList.appendChild(message);
  }
}

