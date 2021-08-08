let addMessage = document.querySelector('.input'),
  addButton = document.querySelector('.btn'),
  todo = document.querySelector('.todo');
  
let todoList = [];

if(localStorage.getItem('todo')){
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', function (){
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    done: false
  };
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages(){
  let displayMessage='';
  todoList.forEach(function(item, i) {
    displayMessage += `
    <li>
      <input type='checkbox' id='item_${i}' ${item.checked ? 'checked': ''}>
      <label for='item_${i}' ${item.done ? 'class="done"': ''}>${item.todo}</label>
    </li>
    `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function(event){
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for='+ idInput +']');
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function (item) {
    if(item.todo === valueLabel){
      item.checked = !item.checked;
      item.done = !item.done;
      localStorage.setItem('todo',JSON.stringify(todoList));
    }
  });
  document.querySelector('[for='+ idInput +']').classList.toggle('done');
});