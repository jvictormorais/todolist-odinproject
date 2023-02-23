const tasks = [
  {
    id: 1,
    list: "Project",
    title: "title",
    description: "lorem",
    priority: "high",
    dueDate: "??/??/????",
  },
  {
    id: 2,
    list: "Project",
    title: "Title Here",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    dueDate: "??/??/????",
    priority: "high",
  },
  {
    id: 3,
    list: "very-crazy",
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
        <div class="due-date">${item.priority}</div>
        <div class="delete-btn"><button>del</button></div>
      </div>`;
  });
  displayTasks = displayTasks.join("");
  tasksArea.innerHTML = displayTasks;
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
      return `<div class="list-name" data-id=${list}>${list} <span id="delete-list-btn">x</span></div>`;
    })
    .join("");

  lists.innerHTML = listBtn;
  const listName = lists.querySelectorAll(".list-name");
  console.log(listName);

  listName.forEach(function (div) {
    div.addEventListener("click", function (e) {
      console.log(e.currentTarget.dataset);
      const list = e.currentTarget.dataset.id;
      const tasksList = tasks.filter(function (tasksItem) {
        console.log(tasksItem.list);
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
