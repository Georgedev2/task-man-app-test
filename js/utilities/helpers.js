import { ASC, DESC, SORT_DATE } from '../constants.js';

export const setQueryParam = (paramValue) => {
  history.pushState(null, '', `?${SORT_DATE}=${paramValue}`);
};

export const sortData = (list, sortOrder = ASC, field) => {
  if (sortOrder == DESC) {
    return list.sort((a, b) => a[field] - b[field]);
  }
  return list.sort((a, b) => b[field] - a[field]);
};

export const capitalize = (input) => {
  return input.slice(0, 1).toUpperCase() + input.slice(1); // capitalize text
};

export const removeSpaceCharacter = (string) => {
  return string.replace(/\s/g, '').toLowerCase();
};

const addSuffixCorrespondToNumber = (input) => {
  let str = input.toString();
  if (str === '1') {
    return 'st';
  }
  if (str.endsWith('1')) {
    return 'th';
  }
  if (str.endsWith('2')) {
    return 'nd';
  }
  if (str.endsWith('3')) {
    return 'rd';
  }
  return 'th';
};

export const formateTime = (dateInput) => {
  // dateInput can be timestamp, date String etc.. it returns date in this formate eg 6th, Nov 2023.
  let date = new Date(dateInput);
  const dayNumber = date.getDate();
  return `${dayNumber}${addSuffixCorrespondToNumber(
    dayNumber
  )}, ${date.toLocaleString('en-GB', {
    month: 'short',
  })} ${date.getFullYear()}`;
};

export const formateToDateString = () => {
  // return the current date in this formate YYYY-MM-DD
  return new Date().toISOString().split('T')[0];
};

export const validateDate = (input) => {
  const errorMsg = {};

  if (input.priority.length == 0) {
    document.querySelector('#priorityError').innerText =
      'Please select priority';
    errorMsg.error = true;
  } else {
    document.querySelector('#priorityError').innerText = '';
  }

  if (input.status.length == 0) {
    document.querySelector('#statusError').innerText = 'Please select status';
    errorMsg.error = true;
  } else {
    document.querySelector('#statusError').innerText = '';
  }

  if (input.description.length == 0) {
    document.querySelector('#descError').innerText =
      'Please write some description';
    errorMsg.error = true;
  } else {
    document.querySelector('#descError').innerText = '';
  }

  return errorMsg;
};

export const createArrayOfAnySize = (size) => {
  let array = [];
  for (let count = 0; count < size; count++) {
    array.push(count + 1);
  }
  return array;
};

export const getPageQueryParam = (paramKey) => {
  const queryParam = new URLSearchParams(window.location.search);
  return queryParam.get(paramKey);
};
