let notification = document.querySelector(".notification");

let getAllTodo = async () => {
  let _data = await fetch("http://127.0.0.1:8080/api/todo")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return _data;
};

const displayTodoTable = async () => {
  let tableBody = document.querySelector(".all-div table tbody");
  let rowChild = tableBody.querySelectorAll("tr");
  rowChild.forEach((child) => {
    tableBody.removeChild(child);
  });

  let rowContent = await getAllTodo();
  if (rowContent.length <= 0) {
    notification.classList.remove("hidden");
    notification.textContent = "No thing to do found";
    notification.style.color = "red";
    return;
  }

  notification.classList.add("hidden");
  for (i = 0; i < rowContent.length; i++) {
    let row = document.createElement("tr");
    row.id = String(rowContent[i].id);
    let tdId = document.createElement("td");
    let tdContent = document.createElement("td");
    let tdEdit = document.createElement("td");
    let tdDelete = document.createElement("td");
    let buttonEdit = document.createElement("button");
    let buttonDelete = document.createElement("button");

    tdId.textContent = String(i + 1);
    tdContent.textContent = rowContent[i].Todo;

    buttonEdit.textContent = "Edit";
    buttonEdit.classList.add("btn");
    buttonEdit.classList.add("btn-edit");
    buttonEdit.addEventListener("click", showEditTodo);
    tdEdit.appendChild(buttonEdit);

    buttonDelete.textContent = "Delete";
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn-delete");
    buttonDelete.addEventListener("click", deleteTodo);
    tdDelete.appendChild(buttonDelete);

    row.appendChild(tdId);
    row.appendChild(tdContent);
    row.appendChild(tdEdit);
    row.appendChild(tdDelete);

    tableBody.appendChild(row);
  }
};

displayTodoTable();

let deleteButtons = document.querySelectorAll(".btn-delete");
let buttonSubmits = document.querySelectorAll(".btn-submit");
let buttonAddNewTodo = document.querySelector(".btn-add");
let buttonTurnBack = document.querySelector(".btn-turn-back");
let buttonSubmitAdd;
let buttonSubmitEdit;
let buttonDeleteAll;
let allDiv = document.querySelector(".all-div");
let addDiv = document.querySelector(".add-div");
let editDiv = document.querySelector(".edit-div");

deleteButtons.forEach((btn) => {
  if (btn.classList.contains("all")) {
    buttonDeleteAll = btn;
  }
});

editDiv.classList.add("hidden");
addDiv.classList.add("hidden");
buttonTurnBack.classList.add("hidden");

const preventDefaultFrom = (event) => {
  event.preventDefault();
};

buttonSubmits.forEach((btn) => {
  btn.addEventListener("click", preventDefaultFrom);
  if (btn.classList.contains("edit")) {
    buttonSubmitEdit = btn;
  }
  if (btn.classList.contains("add")) {
    buttonSubmitAdd = btn;
  }
});

let idEdit;
const showEditTodo = (event) => {
  notification.classList.add("hidden");
  idEdit = event.path[2].id;
  let tdContent = event.path[2].querySelectorAll("td")[1];
  let content = tdContent.textContent;
  let inputEdit = document.getElementById("edit-content");
  inputEdit.value = content;
  editDiv.classList.remove("hidden");
  addDiv.classList.add("hidden");
  allDiv.classList.add("hidden");
  buttonTurnBack.classList.remove("hidden");
  buttonDeleteAll.classList.add("hidden");
};

const showAddTodo = () => {
  notification.classList.add("hidden");
  editDiv.classList.add("hidden");
  addDiv.classList.remove("hidden");
  allDiv.classList.add("hidden");
  buttonTurnBack.classList.remove("hidden");
  buttonDeleteAll.classList.add("hidden");
  buttonAddNewTodo.classList.add("hidden");
};

const turnBackTodoList = () => {
  editDiv.classList.add("hidden");
  addDiv.classList.add("hidden");
  allDiv.classList.remove("hidden");
  buttonTurnBack.classList.add("hidden");
  buttonDeleteAll.classList.remove("hidden");
  buttonAddNewTodo.classList.remove("hidden");
};

const deleteTodo = async (event) => {
  if (!event.path[0].classList.contains("all")) {
    let id = event.path[2].id;
    await fetch(`http://localhost:8080/api/todo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    await displayTodoTable();
  } else {
    await fetch("http://localhost:8080/api/todo", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    await displayTodoTable();
  }
};

const submitAddTodo = async (event) => {
  inputText = document.querySelector("#todo");
  todo = inputText.value;
  await fetch("http://127.0.0.1:8080/api/todo", {
    method: "POST",
    body: JSON.stringify({
      Content: todo,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  displayTodoTable();
  turnBackTodoList();
};

const submitEditTodo = async (event) => {
  let inputEdit = document.querySelector("#edit-content");
  let editText = inputEdit.value;
  await fetch(`http://127.0.0.1:8080/api/todo/${idEdit}`, {
    method: "PUT",
    body: JSON.stringify({
      Content: editText,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  displayTodoTable();
  turnBackTodoList();
};

deleteButtons.forEach((btn) => {
  btn.addEventListener("click", deleteTodo);
});

buttonSubmitAdd.addEventListener("click", submitAddTodo);

buttonSubmitEdit.addEventListener("click", submitEditTodo);

buttonAddNewTodo.addEventListener("click", showAddTodo);

buttonTurnBack.addEventListener("click", turnBackTodoList);
