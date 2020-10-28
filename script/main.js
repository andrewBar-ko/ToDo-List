'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    headerBtn = document.querySelector('.header-button'),
    todoList = document.querySelector('.todo-list'),
    textTodo = document.querySelector('.text-todo'),
    removeBtn = document.querySelector('.todo-remove'),
    todoCompleted = document.querySelector('.todo-completed');

// Массив с получеными данными о планах
let todoData = localStorage.getItem('item') ?
 JSON.parse(localStorage.getItem('item')) : [];

// Добавление дел на страницу
const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        let li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML += '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        // Метка о выполнении
        const btnComplete = li.querySelector('.todo-complete');

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        // Добавление в выполненые(не выполненые)
        btnComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

    });
 
};

// К форме todoControl навешиваем событие submit
todoControl.addEventListener('submit', function(e) {
    e.preventDefault();  // Отмена перезагрузки страницы

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };

    todoData.push(newTodo);
    
    localStorage.setItem('item', JSON.stringify(todoData));
    headerInput.value = '';
     
    render();
 
});

// Удаление дел
// removeBtn.addEventListener('click', function() {
//     todoData.forEach(function(i) {

//     };
// });

render();





// todoList.addEventListener('click', function(e) {
//         const target = e.target;
//         const removeBtn = target.closest('.todo-remove');
//         console.log(removeBtn);
//     });