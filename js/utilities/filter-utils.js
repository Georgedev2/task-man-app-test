import { tasks } from '../../taskDatabase.js';
import { PER_PAGE } from '../constants.js';
import { upDateDOM } from '../index.js';

const paginate = (pageNumber, list = taskList, itemsPerPage = PER_PAGE) => {
  return list.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
};

export let data = {
  taskList: tasks,

  // get tasklist
  getTasks: function () {
    return this.taskList;
  },

  //set all task
  setTaskList: function (list, pageNumber) {
    this.taskList = list;
    upDateDOM(paginate(pageNumber, this.taskList));
  },

  //add task to task list
  addTask: function (task) {
    this.taskList.unshift(task);
  },

  selectOne: function (id, pageNumber) {
    const listWithItemsSelected = this.taskList.map((el) => {
      if (el.id === id) {
        el.isSelected = true;
        return el;
      }
      return el;
    });
    this.setTaskList(listWithItemsSelected, pageNumber);
  },

  //handle filtering of description field
  filterListByQuery: function (list, searchQuery = '') {
    return list.filter(({ description }) =>
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
  //handle filtering by category
  filterByCategoryClick: function (paginatedList, query, updatePage) {
    let param = query.toLowerCase();
    const filteredList = paginatedList.filter(({ status }) => {
      return status.toLowerCase().includes(param.includes('all') ? '' : param);
    });
    updatePage(filteredList);
  },

  // select all task by clicking on the checkbox on the table head
  selectAll: (list, checkAll, paginateCB, pageNumber) => {
    const paginatedData = paginateCB(pageNumber, list);
    if (checkAll) {
      return paginatedData.map((el) => {
        el.isSelected = true;
        return el;
      });
    } else
      return paginatedData.map((el) => {
        el.isSelected = false;
        return el;
      });
  },

  editTask: function (id, desc) {
    //TODO --implement the edit task functionality
    const upDatedList = this.taskList.map((el) => {
      if (el.id === id) {
        return (el.description = desc);
      }
      return el;
    });
    this.setTaskList(upDatedList);
  },

  filterOutCheckedTask: function (paginateCB, upDateDOM, pageNumber) {
    const newList = this.taskList.filter((task) => !Boolean(task?.isSelected));
    this.setTaskList(newList, pageNumber, upDateDOM);
  },
};

export const dropdownActions = [
  {
    label: 'Delete',
    action: () => {
      console.log('Deleting');
    },
  },
  {
    label: 'Edit',
    action: () => {
      console.log('Editing');
    },
  },
];
