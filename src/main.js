const todoForm = document.querySelector('#todo-form');
const inputTodo = document.querySelector('#input-todo');

const todoList = document.querySelector('#todo-list');

const deleteTodo = document.querySelector('.delete');

function addTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id.toString();
  li.classList.add('todo');

  const label = document.createElement('label');

  const input = document.createElement('input');

  const content = document.createElement('div');
  content.classList.add('todo-content');
  content.innerText = newTodo.text;

  label.appendChild(input);
  label.appendChild(content);

  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', removeTodo);

  li.appendChild(label);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function removeTodo(e) {
  const li = e.target.parentElement;
  li.remove();
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();

  const newTodo = {
    text: inputTodo.value,
    id: Date.now(),
  };

  addTodo(newTodo);
  inputTodo.value = '';
});
