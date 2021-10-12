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
let listError = document.createElement('div');
let dlBox = document.querySelector('.dl-box');
let displayTodo = document.querySelector('.display-todo');
let yesBtn = document.querySelector('.yes');
let noBtn = document.querySelector('.no');
let todoData =[];

userNameError.style.color="red";
todoError.style.color="red";
listError.style.color="red";

//````````````````function to create greeting````````````````````//
let time = Number((new Date).getHours());
function checkMorningNoon(time){
    if(time>=0 && time<12){ greetings.textContent="Good Morning";}
    else if (time>=12){
        if(time>=12 && time <17){greetings.textContent="Good Afternoon"}
        else if(time>=17){greetings.textContent="Good Evening"}
    }
}
checkMorningNoon(time);

//``````````````````````taking name from user```````````````````````````//
todoApp.style.display="none";
dlBox.style.display="none";
userName.focus();

userName.addEventListener('keypress',(e) =>userNameTaken(e));
nameTaken.addEventListener('click',(e)=>userNameTaken(e));

function userNameTaken(e){
    userNameError.innerText="";
     if(e.key==="Enter" || e.type==="click"){
    if(userName.value===""){userNameError.textContent="Pls Enter your name first"}
    else{
        userNameError.innerText="";
        takeName.style.display="none";
        todoApp.style.display="block";
        todo.focus();
        giveUserName.textContent= userName.value;
        }
} 
}

//``````````````````````````creating todo``````````````````````````````//

todo.addEventListener('keypress',(e)=>addTodo(e));
addTodoBtn.addEventListener('click',(e)=>addTodo(e));
//``````````````````````````function to check input is valid or not`````````````````````````````//
function addTodo(e){
   todoError.innerText="";
         if(e.key==="Enter" || e.type==="click"){
             if(todo.value===""){todoError.innerText="Pls Enter todo first"}
             else{ 
                  addTodoList();   
                }
        }
}

//``````````````````````function to update data in todo's array`````````````````//
function comparing(arr,value){
    let rawValue = value.replaceAll(" ","").toLowerCase();
    let rawArr=[];
    for(let a of arr){
        rawArr.push(a.replaceAll(" ","").toLowerCase());
    }
    if(rawArr.includes(rawValue)){return true;}
    else{return false;}
}

//```````````````````````````````````adding todo in the list`````````````````````````````````//
function addTodoList(){
    let todoItem = document.createElement('li');                 //``````````````creating todo li ````````````````````//
    let todoRemoveBtn = document.createElement('button');       //``````````````creating remove button for todo `````````````//
    let todoCheckBtn = document.createElement('input');         //`````````````creating button for updating todo complete ```````````````//
    let todoEditBtn = document.createElement('button');         //````````````````creating button for editing todo ```````````````````//
    let saveChanges = document.createElement('button');         //````````````````creating save button for saving changes in the todo after editing it ``````````//
    let todoContent = document.createElement('span');           //```````````````creatinng a span to store todo content`````````````````````````//
    saveChanges.innerText="Save changes";
    todoCheckBtn.type="checkbox";
    todoRemoveBtn.innerText="X";
    todoEditBtn.innerText="🖉";
    todoEditBtn.className="edit-btn";
    todoRemoveBtn.className="cross-btn";
    saveChanges.className="save-btn";
    //````````````check weather the todo is already created or not ```````````````````````//
        if(comparing(todoData,todo.value)){todoError.innerText="Error:Todo already added";}
        else{
                todoData.push(todo.value);    
                todoContent.innerText=todo.value;                                                             //````````` pushing todo's value in a array (for checking new array is already listed or not ) ````````//
                todoList.append(todoItem);                                                             //````````` adding the todo 'li' in the 'ul'`````````//
                todoItem.append(todoRemoveBtn,todoCheckBtn,todoContent,todoEditBtn,saveChanges);         //````````` adding all the buttons and todo value in the 'li'``````//

                saveChanges.style.display="none";
                todo.value="";
                todoCount.innerText=todoList.childElementCount;
                
                remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
                todoRemoveBtn.addEventListener('click',(e)=>removeTodo(e,todoCheckBtn));
                todoCheckBtn.addEventListener('click',()=>checkTodo(todoCheckBtn));   
                todoEditBtn.addEventListener('click',()=>edit(todoItem,saveChanges));
            }
}

//`````````````````function to remove todo from the arrar``````````````````//
function removeFromData(temp){
temp.removeChild(temp.childNodes[0]);
temp.removeChild(temp.childNodes[0]);
temp.removeChild(temp.childNodes[1]);
temp.removeChild(temp.childNodes[1]);
        todoData= todoData.filter((el,index)=>{
            let a= todoData.indexOf(temp.innerText);
            return index!=a;
        })
}
//``````````````````function to show alert before deleting a todo``````````````````````//
function removeAlert(e,btn){
    todoApp.style.display="none";
    dlBox.style.display="block";
    displayTodo.innerText=e.path[1].childNodes[2].innerText;
    yesBtn.addEventListener('click',()=> {
                dlBox.style.display="none"; 
                todoApp.style.display="block";
                todoList.removeChild(e.path[1]);
                let temp=e.path[1];
                removeFromData(temp);
                todoCount.innerText=todoList.childElementCount;
                if(btn.checked){
                    todoCompleted.innerText=Number(todoCompleted.innerText)-1;
                    remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
                }
                remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
    });
                
    noBtn.addEventListener('click',()=>{dlBox.style.display="none"; todoApp.style.display="block"});
}
//````````````function to remove todo from the list`````````````````````//
function removeTodo(e,btn){ 
todoError.innerText="" ;
removeAlert(e,btn)
}

//```````````````function to check and uncheck todo `````````````````//
function checkTodo(btn){
   if(btn.checked){
       btn.parentElement.childNodes[2].style.textDecoration="line-through";
       btn.parentElement.style.opacity="0.5";
       todoCompleted.innerText=Number(todoCompleted.innerText)+1;
        remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
   }
   else{
       btn.parentElement.childNodes[2].style.textDecoration="none";
       btn.parentElement.style.opacity="1";
       todoCompleted.innerText=Number(todoCompleted.innerText)-1;
        remainingTodo.innerText=Number(todoCount.innerText)-Number(todoCompleted.innerText);
   }
}

//````````````````function to edit todo ```````````````````````//
function edit(list,saveChanges){
    let editArea = document.createElement('input');             //``````````` created edit filed for editing todo````````````````//
    editArea.className="edit-area";
    let btn1 = list.childNodes[0];                              //`````````storing the created button in a variable`````````````//        
    let btn2 = list.childNodes[1];
    let btn3 = list.childNodes[3];
    let btn4 = list.childNodes[4];

    removeFromData(list);                                //`````````````````````removed buttons for extracting text data  &&  removed the old todo from array`````````````````````//

    editArea.value = list.innerText;                      
    list.innerText="";
    list.append(editArea,btn4);
    saveChanges.style.display="inline";
    editArea.focus();

    editArea.addEventListener('keypress', (e)=>save(e,list,btn1,btn2,btn3,btn4,editArea));
    saveChanges.addEventListener('click',(e)=>save(e,list,btn1,btn2,btn3,btn4,editArea));   
}

//````````````````functiion to save changes after editing todo ``````````````````````````//
function save(e,list,btn1,btn2,btn3,btn4,edit){
    list.append(listError);
    listError.className="edit-error";
    listError.innerText="";
if(e.key==="Enter" || e.type==="click"){
    if(edit.value===""){
        listError.innerText="Error: Todo can't be empty"}
    else{
        if(comparing(todoData,edit.value)){   listError.innerText="Error: Todo already Created"}
        else{
            todoData.push(edit.value);
            list.innerText=edit.value;
            list.prepend(btn2);
            list.prepend(btn1);
            list.append(btn3);
            list.append(btn4);
            btn4.style.display="none";
        }
    }
}
}