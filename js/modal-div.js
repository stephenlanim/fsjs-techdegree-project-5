/* ======================================
    Modal Div
   ====================================== */

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   These scripts add modals to the <body> of the DOM.

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Function to create modal
const createModal = (qty)=> {

  // Create modal container
  const $modalCntnr = $('<div></div>').attr('class', 'modal-container');
  // Note: Might need to move this back inside the loop to group individual sets of modal elements. But maybe not.

  // Create modals by the indicated quantity
  for (let i = 0; i < qty; i++) {

    // Create modal
    const $modal = $('<div></div>').attr('class', 'modal');

    // Create nested modal elements
    const $modalBtn = $('<button></button>').attr('type', 'button').attr('id', 'modal-close-btn').attr('class', 'modal-close-btn').html('&#10006;');
    const $modalInfo = $('<div></div>').attr('class', 'modal-info-container');

    // Create nest modal info elements
    const $modalImg = $('<img>').attr('class', 'card-img').attr('src', 'https://placehold.it/125x125').attr('alt', 'profile picture');
    const $modalName = $('<h3></h3>').attr('class', 'modal-name cap').attr('id', 'name');
    const $modalEmail = $('<p></p>').attr('class', 'modal-text');
    const $modalCity =$('<p></p>').attr('class', 'modal-text cap');
    const $modalPhone =$('<p></p>').attr('class', 'modal-text');
    const $modalAddress =$('<p></p>').attr('class', 'modal-text');
    const $modalBDay =$('<p></p>').attr('class', 'modal-text');

    // Append nested modal elements
    $modalInfo.append($modalImg, $modalName, $modalEmail, $modalCity, $modalPhone, $modalAddress, $modalBDay);
    $modal.append($modalBtn, $modalInfo);

    // Create button container and nested elements
    const $btnCntnr = $('<div></div>').attr('class', 'modal-btn-container');
    const $prevBtn = $('<button></button>').attr('type', 'button').attr('id', 'modal-prev').attr('class', 'modal-prev').text('Prev');
    const $nextBtn = $('<button></button>').attr('type', 'button').attr('id', 'modal-next').attr('class', 'modal-next').text('Next');

    // Append nested button elements
    $btnCntnr.append($prevBtn, $nextBtn);

    // Append all modal elements to container
    $modalCntnr.append($modal, $btnCntnr);

  } // end of for loop

  // Append modal container to DOM
  $('#gallery').after($modalCntnr);

} // end of createModal()

// Create 12 Modals
createModal(12);
