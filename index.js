
const mapContainer = document.getElementById("mapContainer");

let desks = [];

let currentDesk = null;


document.querySelector('#deskForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const deskName = document.querySelector('#deskName').value;
    const deskSymbol = document.querySelector('#deskSymbol').value;

    const newDesk = {
        name: deskName,
        symbol: deskSymbol
    };

    console.log(newDesk);

    // Generate HTML markup for the desk representation
    var deskMarkup = '<div class="desk" draggable="true">' +
        '<span class="symbol">' + newDesk.symbol + '</span>' +
        '<span class="name">' + newDesk.name + '</span>' +
        '</div>';

    // Append the desk markup to the map container
    mapContainer.insertAdjacentHTML("beforeend", deskMarkup);

    document.getElementById('deskName').value = '';
    document.getElementById('deskSymbol').value = '';

    desks = document.querySelectorAll('.desk');

    desks.forEach(desk => {
        desk.removeEventListener('dragstart', handleDragStart);
        desk.removeEventListener('dragover', handleDragOver);
        desk.removeEventListener('drop', handleDrop);
        desk.removeEventListener('dragend', handleDragEnd);
    });

    desks.forEach(desk => {
        desk.addEventListener('dragstart', handleDragStart);
        desk.addEventListener('dragover', handleDragOver);
        desk.addEventListener('drop', handleDrop);
        desk.addEventListener('dragend', handleDragEnd);
    });
});




// Drag start event handler
function handleDragStart(event) {
    currentDesk = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', null);
    this.classList.add('dragging');
}

// Drag over event handler
function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

// Drop event handler
function handleDrop(event) {
    event.preventDefault();
    if (currentDesk !== this) {
        // Swap desks' positions
        const currentDeskIndex = Array.from(desks).indexOf(currentDesk);
        const dropDeskIndex = Array.from(desks).indexOf(this);
        

        desks = Array.from(desks)
        const temp = desks[currentDeskIndex]
        desks[currentDeskIndex] = desks[dropDeskIndex]
        desks[dropDeskIndex] = temp;

        mapContainer.append(...desks);
    }
}

// Drag end event handler
function handleDragEnd() {
    this.classList.remove('dragging');
    currentDesk = null;
}


mapContainer.addEventListener('dragover', handleDragOverMap);
mapContainer.addEventListener('drop', handleDropMap);



// Drag over event handler for the map container
function handleDragOverMap(event) {
    event.preventDefault();
  }
  
  // Drop event handler for the map container
  function handleDropMap(event) {
    event.preventDefault();
  }
