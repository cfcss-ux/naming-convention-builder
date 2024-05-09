const itemContainer = document.getElementById('itemContainer');
const addRowButton = document.getElementById('addRowButton');
const rerenderButton = document.getElementById('rerenderButton');
const renderArea = document.getElementById('renderArea');
const delimiterInput = document.getElementById('delimiterInput');

let rowCounter = 1;

addRowButton.addEventListener('click', function() {
  rowCounter++;
  
  const newRow = document.createElement('div');
  newRow.className = 'item-row';
  
  const itemNameInput = document.createElement('input');
  itemNameInput.type = 'text';
  itemNameInput.className = 'item-name';
  itemNameInput.value = `Item ${rowCounter}`;
  
  const itemContentInput = document.createElement('input');
  itemContentInput.type = 'text';
  itemContentInput.className = 'item-content';
  
  const itemWeightInput = document.createElement('input');
  itemWeightInput.type = 'number';
  itemWeightInput.className = 'item-weight';
  itemWeightInput.value = rowCounter;
  itemWeightInput.addEventListener('input', renderItems);
  
  newRow.appendChild(itemNameInput);
  newRow.appendChild(itemContentInput);
  newRow.appendChild(itemWeightInput);
  
  itemContainer.appendChild(newRow);
  
  renderItems();
});

rerenderButton.addEventListener('click', renderItems);

function renderItems() {
  const itemRows = Array.from(itemContainer.getElementsByClassName('item-row'));
  const delimiter = delimiterInput.value;
  
  const sortedItems = itemRows.sort((a, b) => {
    const weightA = parseInt(a.querySelector('.item-weight').value);
    const weightB = parseInt(b.querySelector('.item-weight').value);
    return weightA - weightB;
  });
  
  renderArea.innerHTML = '';
  
  // Render item values
  const itemValuesContainer = document.createElement('div');
  sortedItems.forEach((item, index) => {
    const itemContent = item.querySelector('.item-content').value;
    
    const renderedItem = document.createElement('span');
    renderedItem.textContent = itemContent;
    
    itemValuesContainer.appendChild(renderedItem);
    
    if (index < sortedItems.length - 1) {
      const delimiterSpan = document.createElement('span');
      delimiterSpan.textContent = delimiter;
      itemValuesContainer.appendChild(delimiterSpan);
    }
  });
  renderArea.appendChild(itemValuesContainer);
  
  // Render item names
  const itemNamesContainer = document.createElement('div');
  sortedItems.forEach((item, index) => {
    const itemName = item.querySelector('.item-name').value;
    
    const renderedItemName = document.createElement('span');
    renderedItemName.textContent = `{${itemName}}`;
    
    itemNamesContainer.appendChild(renderedItemName);
    
    if (index < sortedItems.length - 1) {
      const delimiterSpan = document.createElement('span');
      delimiterSpan.textContent = delimiter;
      itemNamesContainer.appendChild(delimiterSpan);
    }
  });
  renderArea.appendChild(itemNamesContainer);
}

// Add event listener to existing sort weight input field
const initialSortWeightInput = document.querySelector('.item-weight');
initialSortWeightInput.addEventListener('input', renderItems);

// Add event listener to delimiter input field
delimiterInput.addEventListener('input', renderItems);