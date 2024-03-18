import { PER_PAGE } from "../constants.js";

export const pagination = (taskList, itemPerPage = PER_PAGE) => {
  return {
    totalItemInList: taskList.length,
    getTotalPages: function (totalItemInList) {
      return Math.ceil(totalItemInList / itemPerPage);
    },

    paginate: (pageNumber, list = taskList, itemsPerPage = itemPerPage) => {
      return list.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      );
    },
    pageCount: {
      pageNumber: 1,
      increasePageNumber: function () {
        // the 'this' keyword refers to the object calling this function which is 'pageCount'
        if (this.pageNumber < Math.ceil(taskList.length / itemPerPage)) {
          return ++this.pageNumber;
        }
      },
      decreasePageNumber: function () {
        if (this.pageNumber > 1) {
          return --this.pageNumber;
        }
      },
      setCount: function (num = 1) {
        return (this.pageNumber = num);
      },
    },
  };
};
