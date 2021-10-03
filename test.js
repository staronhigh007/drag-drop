const draggingElements = document.querySelectorAll('.draggable');
const sourceContainer = document.querySelector('.source-container');
const targetContainer = document.querySelector('.target-container');
const resetState = document.querySelector('.resetState');

resetState.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

draggingElements.forEach((draggable) => {
  draggable.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

targetContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
});

targetContainer.addEventListener('drop', (e) => {
  const dragElement = document.querySelector('.dragging');
  targetContainer.appendChild(dragElement);
  dragElement.removeAttribute('draggable');
  dragElement.classList.remove('draggable');

  var data = e.dataTransfer.getData('text');
  let movedData = localStorage.getItem('movedData');

  if (!movedData) {
    let dataArray = [];
    dataArray.push(data);
    localStorage.setItem('movedData', JSON.stringify(dataArray));
  } else {
    movedData = JSON.parse(movedData);
    movedData.push(data);
    localStorage.setItem('movedData', JSON.stringify(movedData));
  }
});

let localData = localStorage.getItem('movedData');
if (localData) {
  localData = JSON.parse(localData);
  localData.forEach((item, index) => {
    document.getElementById(item).remove();
    targetContainer.appendChild(element(item));
  });
}

function element(item) {
  var z = document.createElement('p');
  z.classList.add('dragobject');
  z.id = item;
  z.innerHTML = 'ITEM ' + item.split('item')[1];
  return z;
}
