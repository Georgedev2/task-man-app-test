import { data } from './utilities/filter-utils.js';
import {
  capitalize,
  formateTime,
  removeSpaceCharacter,
} from './utilities/helpers.js';

export const desktopView = (arrayOfTask, pageNumber) => {
  document.getElementById('taskTable').style.display = 'table';
  const tableBody = document.querySelector('#tableBody');
  tableBody.innerHTML = '';

  // map over the list
  arrayOfTask.forEach((task) => {
    let tr = document.createElement('tr');
    tr.classList.add('add-bg', 'table-role'); // allows me to add hover effect to the tr element
    let childrenElement = `
      <td>
      <input type='checkbox' id='selectTask' class='selectedTask' ${
        task.isSelected && 'checked'
      }/>
     </td>
      <td>${task.description}</td>
      <td>
        <div class='status ${removeSpaceCharacter(
          task.status
        )}'><span>${capitalize(task.status)} </span></div>
      </td>
      <td>${formateTime(task.date)}</td>
      <td>
        <div class='priority ${removeSpaceCharacter(
          task.priority
        )}'><span>${capitalize(task.priority)}</span></div>
      </td>
      <td class='drop-down-btn'>
      <span role='button' class="ellipse-btn" > &#8942;</span>   
      <ul style='display:none;' id='edit-dropdown'>
       <li> 
        <img src='./icons/delete-icon.svg' alt='delete icon'/>
        <span class='delete'>Delete</span> 
        </li> 
       <li>
       <img src="./icons/pen.svg" alt="" alt='pen icon'/>
       <span>Edit</span>
       </li>  
       <li>
       <img src="./icons/star-icon.svg" alt="pin icon" />
       <span>Pin</span> 
       </li> 
      </ul> 
     </td>`;

    tr.innerHTML = childrenElement;
    tableBody.appendChild(tr);

    tr.querySelector('#selectTask').addEventListener('change', function () {
      data.selectOne(task.id, pageNumber);
    });

    // Edit Task Dropdown Menu
    tr.querySelector('.ellipse-btn').onclick = (e) => {
      document.querySelectorAll('#edit-dropdown').forEach((el) => {
        el.style.display = 'none';
      });
      e.target.nextElementSibling.style.display = 'block';
    };
  });
};

export const mobileView = (taskList) => {
  const dataList = document.querySelector('#mobileView');
  dataList.innerHTML = '';
  const cards = document.createElement('div');
  // Hide Empty state
  document.getElementById('emptyState').style.display = 'none';
  cards.classList.add('mobile-view-cards');
  taskList.forEach((task) => {
    cards.innerHTML += `
    <section class="task-card">
    <div class="box">
    <div class='paragraph-bd'>
      <p class="description">${capitalize(task.description)}</p>
      <div class="date text-color">
        <img src="../icons/date-21.svg" width="12" height="12" alt="date " />
        <p>${formateTime(task.date)} at 10:30pm</p>
      </div>
      </div>
      <span class="three-dots">&#8942;</span>
    </div>
    <div class="tags flex-with-align">
      <img src="../icons/tags-1-1.svg" width="25" height="25" alt="tag" />

      <div class="tag ${removeSpaceCharacter(task.status)}">
        <span>${task.status}</span>
      </div>
      <div class="tag ${removeSpaceCharacter(task.priority)}">
        <span>${task.priority}</span>
      </div>
    </div>
  </section>
        `;
  });
  dataList.appendChild(cards);
};
