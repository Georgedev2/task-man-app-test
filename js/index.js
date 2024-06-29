import { data } from './utilities/filter-utils.js';
import {
  ASC,
  DESC,
  priority as priorityList,
  status as statusList,
  SORT_DATE,
  DATE,
} from './constants.js';

import {
  validateDate,
  removeSpaceCharacter,
  formateToDateString,
  sortData,
  getPageQueryParam,
  setQueryParam,
  createArrayOfAnySize,
} from './utilities/helpers.js';
import { desktopView, mobileView } from './views.js';
import { pagination } from './utilities/pagination.js';

const searchInput = document.querySelector('#searchInput');
const filterButtons = document.querySelectorAll('#filterBtn');
const searchBarBox = document.getElementById('searchBar');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const selectPageDropdown = document.querySelector('#selectPageDropdown');

const { paginate, getTotalPages, pageCount } = pagination(data.taskList);

const createPaginationDropdown = () => {
  selectPageDropdown.innerHTML = '';
  createArrayOfAnySize(getTotalPages(data.taskList.length)).forEach((el) => {
    let option = document.createElement('option');
    option.value = el;
    option.innerText = el;
    selectPageDropdown.appendChild(option);
  });
};

// FIRES WHEN PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  createPaginationDropdown();
  const filteredData = paginate(pageCount.pageNumber, data.taskList);
  upDateDOM(filteredData, 1);
});

export const paginationUI = (pageNumber, totalPages, totalItemInList) => {
  // pagination UI;
  document.querySelector('#totalPage').innerText = totalPages;
  document.querySelector('#currentPage').innerText = pageNumber;
  document.querySelector('#totalItems').innerText = ` of ${totalItemInList}`;
  prevButton.style.color = `${pageCount.pageNumber > 1 ? 'teal' : '#eee'}`;
  // prevButton.disabled = `${pageCount.pageNumber < 1 ? true : false}`;
  nextButton.style.color = `${
    pageCount.pageNumber == totalPages ? '#eee' : 'teal'
  }`;
  selectPageDropdown.value = pageCount.pageNumber;
};

export function upDateDOM(taskList) {
  if (taskList.length > 0) {
    paginationUI(
      pageCount.pageNumber,
      getTotalPages(data.taskList.length),
      data.taskList.length
    );
    // selected row
    const allSelected = taskList.filter((el) => el.isSelected).length;
    document.querySelector('#clearSelected').style.display = `${
      allSelected ? 'flex' : 'none'
    }`;
    document.querySelector('#totalSelected').innerText = allSelected;

    const sortOrder = getPageQueryParam(SORT_DATE);
    const list = sortData(taskList, sortOrder, DATE);

    // map over the list
    desktopView(taskList,pageCount.pageNumber);
    mobileView(taskList);
  } else {
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById(
      'searchInputValue'
    ).innerHTML = `"${searchInput.value}"`; //LOOK ME PLEASE
    document.getElementById('taskTable').style.display = 'none';
  }
}

// SEARCH INPUT CLEAR BUTTON
document.addEventListener('click', (e) => {
  if (searchBarBox.contains(e.target)) {
    searchBarBox.classList.add('search-bar-focus');
    searchClearIcon.style.display = 'block';

    searchClearIcon.addEventListener('click', () => {
      // Clear the search input
      searchInput.value = '';
      const paginatedData = paginate(pageCount.pageNumber, data.taskList);
      const filterList = data.filterListByQuery(paginatedData);
      upDateDOM(filterList);
    });
  } else {
    searchBarBox.classList.remove('search-bar-focus');
    searchClearIcon.style.display = 'none';
  }
});

// SEARCH INPUT
searchInput.addEventListener('input', (e) => {
  const paginatedData = paginate(pageCount.pageNumber, data.taskList);
  const filterList = data.filterListByQuery(
    paginatedData,
    e.target.value.trim(),
    'description'
  );
  upDateDOM(filterList);
});

// SORT DATE
const sortButtonRef = document.getElementById('sortOrder');
sortButtonRef.addEventListener('click', () => {
  const sortOrder = getPageQueryParam(SORT_DATE);

  if (sortOrder === ASC) {
    setQueryParam(DESC);

    sortButtonRef.classList.add('rotate180');
    //sort
    const sortedData = sortData(
      paginate(pageCount.pageNumber),
      sortOrder,
      DATE
    );
    upDateDOM(sortedData);
  } else {
    setQueryParam(ASC);
    sortButtonRef.style = {
      transform: 'rotate(0deg)',
    };

    sortButtonRef.classList.remove('rotate180');
    // sort
    const sortedData = sortData(
      paginate(pageCount.pageNumber),
      sortOrder,
      DATE
    );
    upDateDOM(sortedData);
  }
});

// SELECT ALL TASK
const selectAllCheckBox = document.querySelector('#selectAlCheckBox');
selectAllCheckBox.addEventListener('change', (e) => {
  const selectedTask = data.selectAll(
    data.taskList,
    e.target.checked,
    paginate,
    pageCount.pageNumber
  );
  upDateDOM(selectedTask);
});

//DELETE ALL SELECTED TASK
const deleteSelectedTask = document.querySelector('#deleteSelectedTask');
deleteSelectedTask.addEventListener('click', () => {
  data.filterOutCheckedTask(paginate, upDateDOM, pageCount.pageNumber);
  document.querySelector('#selectAlCheckBox').checked = false;
  createPaginationDropdown();
});

// CATEGORY FILTER BUTTONS
filterButtons.forEach((node) => {
  node.addEventListener('click', function (e) {
    filterButtons.forEach((el) => {
      el.classList.remove('filter-btn-active');
    });
    this.classList.add('filter-btn-active');
    let paginatedData = paginate(pageCount.pageNumber, data.taskList);
    data.filterByCategoryClick(paginatedData, this.textContent, upDateDOM);
  });
});

// PAGINATION PREV & NEXT BUTTON
nextButton.addEventListener('click', () => {
  let paginatedData = paginate(pageCount.increasePageNumber(), data.taskList);
  upDateDOM(paginatedData);
});

// SET PAGE NUMBER FROM DROP_DOWN
selectPageDropdown.addEventListener('input', (e) => {
  pageCount.setCount(e.target.value);
  let paginatedData = paginate(Number(e.target.value), data.taskList);
  upDateDOM(paginatedData);
});

prevButton.addEventListener('click', () => {
  let paginatedData = paginate(pageCount.decreasePageNumber(), data.taskList);
  upDateDOM(paginatedData);
});

//ADD TASK MODAL
const addTaskModal = document.querySelector('#addTaskModal');
document.querySelector('#addButton').addEventListener('click', () => {
  //Open task modal
  addTaskModal.style.display = 'block';
  document.getElementById('date').value = formateToDateString();
});

const removeActiveStyleFromCategoryBtn = () => {
  addFormStatusBtn.forEach((statusBtn) => {
    statusBtn.classList.remove('add-task-form-btn-active');
  });

  addFormPriorityBtn.forEach((priorityBtn) => {
    priorityBtn.classList.remove('add-task-form-btn-active');
  });
};

document.querySelector('#addModalCloseBtn').addEventListener('click', () => {
  addTaskModal.style.display = 'none';
  removeActiveStyleFromCategoryBtn();
});

const initialTask = {
  id: Math.random().toFixed(2) * 100,
  status: '',
  priority: '',
  description: '',
  date: null,
};

let task = initialTask;
const addFormStatusBtn = document.querySelectorAll('#addFormStatusBtn');
const addFormPriorityBtn = document.querySelectorAll('#addFormPriorityBtn');

addFormStatusBtn.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    addFormStatusBtn.forEach((button) => {
      button.classList.remove('add-task-form-btn-active');
    });
    e.target.classList.add('add-task-form-btn-active');
    task.status = e.target.innerText;
  });
});

addFormPriorityBtn.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    addFormPriorityBtn.forEach((button) => {
      button.classList.remove('add-task-form-btn-active');
    });
    e.target.classList.add('add-task-form-btn-active');
    task.priority = removeSpaceCharacter(e.target.innerText);
  });
});

document.querySelector('#addTaskBtn').addEventListener('click', () => {
  const desc = document.querySelector('#taskDesc');
  task.description = desc.value.trim();
  task.date = document.getElementById('date').valueAsNumber;

  const { error } = validateDate(task);
  if (!error) {
    data.addTask(Object.assign({}, task));
    let paginatedData = paginate(pageCount.pageNumber);
    upDateDOM(paginatedData);

    addTaskModal.style.display = 'none';
    document.querySelector('#addTaskForm').reset();
    task = initialTask;
    removeActiveStyleFromCategoryBtn();
  }
});
