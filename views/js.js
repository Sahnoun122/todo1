const btn1 = document.querySelector("#crud-modal");
let isclick =true;
let btn = function(){
    if(isclick == 1){
        btn1.style.display="block";
        isclick=0;
    }else{
        btn1.style.display="none";
        isclick=1;
    }
}

const crudModal = document.getElementById('crud-modal');
const titleInput = document.getElementById('title');
const statusInput = document.getElementById('statu');
const priorityInput = document.getElementById('Priority');
const descriptionInput = document.getElementById('description');
const submitButton = document.getElementById('submit');
const todoList = document.getElementById('todo1');
const doingList = document.getElementById('doing1');
const doneList = document.getElementById('done1');

let data = localStorage.stockage ? JSON.parse(localStorage.stockage) : [];



function statistic() {
    const todocount = data.filter(task => task.statu === 'todo').length;
    const doingcount = data.filter(task => task.statu === 'doing').length;
    const donecount = data.filter(task => task.statu === 'done').length;

    document.getElementById('todocount').textContent = `todo: ${todocount}`;
    document.getElementById('doingcount').textContent = `doing: ${doingcount}`;
    document.getElementById('donecount').textContent = `done: ${donecount}`;
}


document.getElementById('bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtersearche = data.filter(task => task.title.toLowerCase().includes(query));
    render(filtersearche);
});

function render(tasks = data) {
    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    tasks.forEach((task, index) => {
        const container = getContainer(task.statu);
        if (container) {
            container.innerHTML += `
                <div class="border-2 todoo1 ${createPriorityClass(task.Priority)} border-l-8" style="height: 130px; width: 330px; margin-top: 60px; margin-left: 150px;">
                    <h2 style="margin-left: 30px; font-family: 'Courier New', Courier, monospace; font-size: 700;font-weight:600;">Title:${task.title}</h2>
                    <p style="margin-left: 20px;">Statut: ${task.statu}</p>
                    <p style="margin-left: 20px;">Priorité: ${task.Priority}</p>
                    <p style="margin-left: 20px;">Description: ${task.description}</p>
                    <p  id="date-filter"   style="margin-left: 20px;">Date d'échéance: ${task.dueDate}</p>
                    <div class="flex" style="margin-top: 20px; margin-left: 140px;">
                        <button type="button" onclick="openUpdate(${index})" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Update</button>
                        <button type="button" onclick="deleteTask(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Delete</button>
                    </div>
                </div>
            `;
        }
    });

    statistic();
    render(filtersearche); 
    filterdate(selectedate);
    render(datefilter); 
}

submitButton.onclick = function() {
    const newTask = {
        title: titleInput.value,
        statu: statusInput.value,
        Priority: priorityInput.value,
        description: descriptionInput.value,
        dueDate: dueDate.value

    };
    
    data.push(newTask);
    localStorage.setItem('stockage', JSON.stringify(data));
    render();
    clear();
};

function getContainer(status) {
    switch (status) {
        case 'todo':
            return todoList;
        case 'doing':
            return doingList;
        case 'done':
            return doneList;
        default:
            return null;
    }
}

function createPriorityClass(priority) {
    switch (priority) {
        case 'P1':
            return 'todoo';
        case 'P2':
            return 'todoo1';
        case 'P3':
            return 'todoo2';
        default:
            return '';
    }
}

function clear() {
    titleInput.value = '';
    statusInput.value = '';
    priorityInput.value = '';
    descriptionInput.value = '';

}

function deleteTask(index) {
    data.splice(index, 1);
    localStorage.setItem('stockage', JSON.stringify(data));
    render();
    statistic();
}

function openUpdate(index) {
    const task = data[index];
    if (task) {
        titleInput.value = task.title;
        statusInput.value = task.statu;
        priorityInput.value = task.Priority;
        descriptionInput.value = task.description;
        crudModal.style.display = 'flex';
    }
    statistic();
}

function save() {
    crudModal.style.display = 'none';
}

render();

function filterdate(date) {
    const datefilter = data.filter(task => task.dueDate === date);
    render(datefilter); 
}

document.getElementById('date-filter').addEventListener('input', function() {
    const selectedate = this.value; 
    if (selectedate) {
        filterdate(selectedate); 
    } else {
        render(); 
    }
});

