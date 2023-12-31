const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = []
const TODOS_KEY = "toDos"

function savetoDos() {
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}


function deletToDo(event){
    const wantedli = event.target.parentElement; //event.target = button
    function filtering(item) {
        console.log(item.id);
        console.log(wantedli.id);
        return item.id !== parseInt(wantedli.id);
    }
    toDos = toDos.filter(filtering);
    // toDos = toDos.filter((item) => item.id !== parseInt(wantedli,id));
    console.log(toDos);
    wantedli.remove();
    savetoDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = " ❌";
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodo.text;
    toDoList.appendChild(li);
    button.addEventListener("click",deletToDo);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value= "";
    const newToDoObj = {
        text : newToDo,
        id : Date.now(),
    };
    paintToDo(newToDoObj);

    toDos.push(newToDoObj);
    savetoDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit)

const savedtoDos = localStorage.getItem(TODOS_KEY)

function paintAgain(item) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");
    button.innerText = "❌ ";
    li.appendChild(button);
    li.appendChild(span);
    li.id = item.id;
    span.innerText = item.text;

    toDoList.appendChild(li);
    button.addEventListener("click",deletToDo);
}

if (savedtoDos !== null) {
    // console.log(savedtoDos);
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_KEY));
    parsedToDos.forEach(paintAgain);
    toDos = parsedToDos;
}