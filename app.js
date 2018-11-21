// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
    // 'DOM loaded' event for use of LocSto to get the tasks back
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);

}

// get tasks from LocSto
function getTasks(){
    let tasks;
    // if LocSto is empty, tasks becomes an array
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // LocSto only stores strings, so parse them to JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // add class to li
    li.className = 'collection-item';
    // create text node and apend to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element inside li
    const link = document.createElement('a');
    // add class to link el.
    link.className = 'delete-item secondary-content';
    // add icon html to link el.
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to the ul
    taskList.appendChild(li);
    // put task to local storage
    storeTask(taskInput.value);
    // clear input
    taskInput.value = '';
    e.preventDefault();
}

// store task in LocSto
function storeTask(task){
    let tasks;
    // if LocSto is empty, tasks becomes an array
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // LocSto only stores strings, so parse them to JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    // store to LocSto, it accepts key-value pairs as strings only
    localStorage.setItem('tasks', JSON.stringify(tasks));
}    

// remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Delete permanently?')){
            // remove from DOM
            e.target.parentElement.parentElement.remove();
            // remove from LocSto
            removeTaskFromLocSto(e.target.parentElement.parentElement);

        }
    }
}

// remove li from LocSto
function removeTaskFromLocSto(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks
function clearTasks(){
    // simpler
    // taskList.innerHTML = '';
    // faster
    while(taskList.firstChild) {
        //clear all tasks from DOM
        taskList.removeChild(taskList.firstChild);
        //clear all tasks from LocSto
        localStorage.clear();
    }
}

// filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // select all lis; query-selector-all returns a node list so we can loop through it
    // indexof() returns the first match within an array, if no match returns -1
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
