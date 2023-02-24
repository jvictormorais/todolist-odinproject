let tasks = [
  {
    id: 1,
    list: "Project",
    title: "Title Here",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    dueDate: "??/??/????",
    priority: "high",
  },
];
const newList = document.querySelector(".list-new");
const lists = document.querySelector(".lists");

const tasksArea = document.querySelector(".tasks-area");

window.addEventListener("DOMContentLoaded", function () {
  displayTasksItems(tasks);
  displayListsButtons();
});

// display items

function displayTasksItems(taskItems) {
  let displayTasks = taskItems.map(function (item) {
    return `<div class="task">
        <div class="check"><input type="checkbox" /></div>
        <div class="title">${item.title}</div>
        <div class="description">
          ${item.description}
        </div>
        <div class="priority">
                <p>Priority</p>
                <h4>${item.priority}</h4>
              </div>
        <div class="due-date">${item.dueDate}</div>
        <div class="delete-container"><button class="delete-btn" id="${item.id}">del</button></div>
      </div>`;
  });
  displayTasks = displayTasks.join("");
  tasksArea.innerHTML = displayTasks;

  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach(function (button) {
    button.addEventListener("click", deleteTask);
  });
}

function displayListsButtons() {
  const projects = tasks.reduce(
    function (values, item) {
      if (!values.includes(item.list)) {
        values.push(item.list);
      }
      return values;
    },
    ["all"]
  );
  const listBtn = projects
    .map(function (list) {
      return `<div class="list-name" data-id=${list}>${list}</div>`;
    })
    .join("");

  lists.innerHTML = listBtn;
  const listName = lists.querySelectorAll(".list-name");
  //   console.log(listName);

  listName.forEach(function (div) {
    div.addEventListener("click", function (e) {
      //   console.log(e.currentTarget.dataset);
      const list = e.currentTarget.dataset.id;
      const tasksList = tasks.filter(function (tasksItem) {
        // console.log(tasksItem.list);
        if (tasksItem.list === list) {
          return tasksItem;
        }
      });
      if (list === "all") {
        displayTasksItems(tasks);
      } else {
        displayTasksItems(tasksList);
      }
    });
  });
}

// modal btn

const modalBtn = document.querySelector(".add-new-task");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
});
closeBtn.addEventListener("click", function () {
  modal.classList.remove("open-modal");
});

// user add task

const addTask = function (e) {
  e.preventDefault();
  let newTask = {
    id: Date.now(),
    list: document.querySelector("#list-form").value,
    title: document.querySelector("#title-form").value,
    description: document.querySelector("#description-form").value,
    dueDate: document.querySelector("#duedate-form").value,
    priority: document.querySelector("#priority-form").value,
  };
  tasks.push(newTask);
  //   document.forms[0].reset();
  document.getElementById("formbox").reset();
};

const submitBtn = document.querySelector("#btn-submit");
submitBtn.addEventListener("click", function (e) {
  addTask(e);
  displayTasksItems(tasks);
  displayListsButtons();
  function closeModal() {
    modal.classList.remove("open-modal");
  }
  closeModal();
  console.log(tasks);
});

// delete function

function deleteTask(e) {
  console.log(tasks);
  const id = e.currentTarget.id;
  console.log(id);
  tasks = tasks.filter(function (obj) {
    return obj.id !== Number(id);
  });
  console.log(tasks);
  displayTasksItems(tasks);
  displayListsButtons();
}

// function get object inside array

function getByValue(arr, value) {
  var result = arr.filter(function (o) {
    return o.b == value;
  });
  console.log(result);

  return result ? result[0] : null; // or undefined
}
