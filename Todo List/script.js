// Select Dom Elements
const input = document.getElementById('todo-input')
const addbutton = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// Try to load saved todos from localStorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // Save ecurrent todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a DOM node for a table object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // TODO: Visual feedback: strick-through when completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    })

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    // Add duble-click event listner to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    // Delete Todo button
    const delbutton = document.createElement('button');
    delbutton.textContent = "Delete";
    delbutton.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbutton);
    return li

}

// Render the whole todo list from array
function render() {
    list.innerHTML = '';

    //Recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node)
    });

}

function addtodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    // Push a new todo object 
    todos.push({ text, completed: false });
    input.value = '';
    render()
    saveTodos()

}

addbutton.addEventListener("click", addtodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter')
        addtodo();
})
render();