let takeName= document.querySelector('.take-name');
let userName = document.querySelector('.username');
let nameTaken = document.querySelector('.name-taken'); 
let userNameError = document.querySelector('.user-name-error');
let todoApp = document.querySelector('.todo-app');
let giveUserName = document.querySelector('.give-user-name');
let greetings = document.querySelector('.greetings');
let todo = document.querySelector('.todo');
let todoCount = document.querySelector('.todo-count');
let todoCompleted = document.querySelector('.todo-completed');
let remainingTodo = document.querySelector('.remaining-todo');
let addTodoBtn = document.querySelector('.add-todo-btn');
let todoList = document.querySelector('.todo-list');
let todoError = document.querySelector('.todo-error');


let time = Number((new Date).getHours());
function checkMorningNoon(time){
    if(time>=0 && time<12){ greetings.textContent="Good Morning";}
    else if (time>=12){
        if(time>=12 && time <17){greetings.textContent="Good Afternoon"}
        else if(time>=17){greetings.textContent="Good Evening"}
    }
}
checkMorningNoon(time);

todoApp.style.display="none";
userName.addEventListener('keypress',(e) =>userNameTaken(e));
nameTaken.addEventListener('click',userNameTaken);
function userNameTaken(e){
    userNameError.innerText="";
     if(e.key==="Enter" || e.type==="click"){
    if(userName.value===""){userNameError.textContent="Pls Enter your name  first"}
    else{
        userNameError.innerText="";
        takeName.style.display="none";
        todoApp.style.display="block";
        giveUserName.textContent= userName.value;
        }
}
}

giveUserName.textContent="Elon Musk";

todo.addEventListener('keypress',(e)=>addTodo(e));
addTodoBtn.addEventListener('click',(e)=>addTodo(e));
addTodoBtn.removeEventListener;
function addTodo(e){
   todoError.innerText="";
         if(e.key==="Enter" || e.type==="click"){
             if(todo.value===""){todoError.innerText="pls Enter todo first"}
             else{  addTodoList();      }
        }
}

function addTodoList(){
    let todoItem = document.createElement('li');
    let todoRemoveBtn = document.createElement('button');
    let todoCheckBtn = document.createElement('button');
    todoCheckBtn.innerText="not-completed";
    todoRemoveBtn.innerText="X";
    todoList.append(todoItem);
    todoItem.append(todoCheckBtn,todoRemoveBtn,todo.value)
    todo.value="";
    todoCount.innerText=todoList.childElementCount;
    remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
    todoRemoveBtn.addEventListener('click',(e)=>removeTodo(e,todoCheckBtn));
    todoCheckBtn.addEventListener('click',()=>checkTodo(todoCheckBtn));   
}


function removeTodo(e,btn){ 
todoList.removeChild(e.path[1]);
todoCount.innerText=todoList.childElementCount;
if(btn.textContent==="Completed"){
    todoCompleted.innerText=Number(todoCompleted.innerText)-1;
    remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
}
}

function checkTodo(btn){
   if(btn.textContent==="not-completed"){
       btn.innerText="Completed";
       todoCompleted.innerText=Number(todoCompleted.innerText)+1;
        remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
   }
   else if(btn.textContent==="Completed"){
       console.log("hey");
       btn.innerText="not-completed";
       todoCompleted.innerText=Number(todoCompleted.innerText)-1;
        remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
   }
}
