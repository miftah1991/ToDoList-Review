import Tasks from './Tasks.js';

const generateElement = (taskid, description) => {
  const elem = `
  <li class="litasks task-${taskid}">
    <div class="task">
      <input type="checkbox" name="task" class="check-${taskid}"> 
      <input type="text" readonly class="task-desc" value="${description}" id="input-${taskid}"/>
    </div>
    <i class="fas fa-ellipsis-v three-dot-icon-${taskid}"></i>
    <i class="fas fa-trash trash-${taskid}"></i>
  </li>
  `;
  return elem;
};
const threeDotIconEdit = (taskid) => {
  const threeDotIcon = document.querySelector(`.three-dot-icon-${taskid}`);
  threeDotIcon.addEventListener('click', () => {
    const targetInput = document.querySelector(`#input-${taskid}`);
    targetInput.removeAttribute('readonly');
    targetInput.focus();
    const span = document.createElement('span');
    span.textContent = 'Save';
    threeDotIcon.insertAdjacentElement('afterend', span);
    threeDotIcon.classList.add('hidden');
    span.addEventListener('click', () => {
      Tasks.updateItems(taskid, targetInput.value);
      targetInput.setAttribute('readonly', 'readonly');
      threeDotIcon.classList.remove('hidden');
      span.classList.add('hidden');
    });
  });
};
const trashIcon = (taskid) => {
  const trashIcon = document.querySelector(`.trash-${taskid}`);
  trashIcon.addEventListener('click', () => {
    Tasks.removeItem(taskid);
    const targetTodo = document.querySelector(`.task-${taskid}`);
    targetTodo.remove();
  });
};
const completeIcon = (taskid) => {
  const checkIcon = document.querySelector(`.check-${taskid}`);
  const targetTodo = document.querySelector(`#input-${taskid}`);
  checkIcon.addEventListener('change', () => {
    targetTodo.classList.toggle('completed');
    Tasks.updateCompleted(taskid);
  });
};
const displayAllTasks = () => {
  if (JSON.parse(localStorage.getItem('tasks'))) {
    Tasks.tasks = JSON.parse(localStorage.getItem('tasks'));
    let htmlTask = '';
    Tasks.tasks.forEach((task) => {
      htmlTask = generateElement(task.id, task.description);
      const inputItem = document.getElementById('input-item');
      inputItem.insertAdjacentHTML('afterend', htmlTask);
      threeDotIconEdit(task.id);
      trashIcon(task.id);
      completeIcon(task.id);
      const checkIcon = document.querySelector(`.check-${task.id}`);
      if (task.completed === true) {
        const targetTodo = document.querySelector(`#input-${task.id}`);
        targetTodo.classList.toggle('completed');
        checkIcon.checked = true;
      }
    });
  }
};
export default displayAllTasks;