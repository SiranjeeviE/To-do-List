const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => {
    document.body.classList.toggle('dark');
};

const welcomePage = document.getElementById('welcomePage');
const loginPage = document.getElementById('loginPage');
const signupPage = document.getElementById('signupPage');
const todoPage = document.getElementById('todoPage');
const taskList = document.getElementById('taskList');
const messageBox = document.getElementById('messageBox');

let users = JSON.parse(localStorage.getItem('users') || '{}');
let tasks = JSON.parse(localStorage.getItem('tasks') || '{}');

function showMessage(msg) {
    messageBox.textContent = msg;
    messageBox.style.display = 'block';
    setTimeout(() => messageBox.style.display = 'none', 2000);
}

function showLogin() { 
    welcomePage.classList.add('hidden'); 
    loginPage.classList.remove('hidden');
}

function showSignup() { 
    welcomePage.classList.add('hidden'); 
    signupPage.classList.remove('hidden'); 
}

function signup() {
    const u = signupUser.value.trim();
    const p = signupPass.value;
    if (u && p && !users[u]) {
        users[u] = p; tasks[u] = []; 
        saveAll(); 
        showMessage('Signup successful!'); 
        location.reload();
    } 
    else { 
        signupMsg.textContent = 'Invalid or existing user'; 
    }
}

function login() {
    const u = loginUser.value.trim(); 
    const p = loginPass.value;
    if (users[u] === p) { 
        localStorage.setItem('currentUser', u); 
        showTodoPage(); 
    }
    else { loginMsg.textContent = 'Invalid credentials'; }
}

function saveAll() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTodoPage() {
    const user = localStorage.getItem('currentUser');
    if (!user) 
        return;
    [welcomePage, loginPage, signupPage].forEach(e => e.classList.add('hidden'));
    todoPage.classList.remove('hidden');
    currentUser.textContent = user;
    if (!tasks[user]) tasks[user] = [];
    renderTasks();
}

function logout() { 
    localStorage.removeItem('currentUser'); 
    location.reload(); }

function addTask() {
    const user = localStorage.getItem('currentUser');
    const text = taskInput.value.trim();
    if (!user || !text)
        return;
    tasks[user].push({ text, date: dateInput.value, cat: catInput.value });
    saveAll();
    taskInput.value = '';
    dateInput.value = ''; 
    renderTasks();
    showMessage("Task added successfully!");
}

function renderTasks() {
    const user = localStorage.getItem('currentUser');
    taskList.innerHTML = '';
    if (!tasks[user]) return;
    tasks[user].forEach((t, i) => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `<span>${t.text}<br><small>${t.date} | ${t.cat}</small></span>
                      <button onclick="startEdit(${i})">✎</button>
                      <button onclick="deleteTask(${i})">X</button>`;
        taskList.appendChild(li);
    });
}

function deleteTask(i) { 
    const u = localStorage.getItem('currentUser'); 
    tasks[u].splice(i, 1); 
    saveAll(); 
    renderTasks(); 
}

function startEdit(i) {
    const u = localStorage.getItem('currentUser');
    const t = tasks[u][i];
    const newText = prompt("Edit task", t.text);
    if (newText !== null) {
        t.text = newText.trim();
        t.date = prompt("Edit date", t.date) || t.date;
        t.cat = prompt("Edit category", t.cat) || t.cat;
        saveAll(); renderTasks();
        showMessage("Task updated successfully!");
    }
}

if (localStorage.getItem('currentUser'))
    showTodoPage();
