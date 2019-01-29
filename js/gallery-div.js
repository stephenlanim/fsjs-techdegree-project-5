/* ======================================
    Employee Profile Gallery Div
   ====================================== */

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   These scripts add employee profiles to the gallery in the DOM.

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Function to create an employee profile card
const createProfile = (qty)=> {

  // Create profiles by the indicated quantity
  for (let i = 0; i < qty; i++) {

    // Create card
    const $card = $('<div></div>').attr('class', 'card');

    // Create card-image-container and nested image
    const $cardImgCntnr = $('<div></div>').attr('class', 'card-img-container');
    const $cardImg = $('<img>').attr('class', 'card-img').attr('src', 'https://placehold.it/90x90').attr('alt', 'profile picture');

    // Create card-info-container and nested text
    const $cardInfo = $('<div></div>').attr('class', 'card-info-container');
    const $cardName = $('<h3></h3>').attr('id', 'name').attr('class', 'card-name cap');
    const $cardEmail = $('<p></p>').attr('class', 'card-text email');
    const $cardLocation = $('<p></p>').attr('class', 'card-text cap city');

    // Append Nested Items
    $cardImgCntnr.append($cardImg);
    $cardInfo.append($cardName, $cardEmail, $cardLocation);
    $card.append($cardImgCntnr, $cardInfo);

    // Append Items to Gallery
    $('#gallery').append($card);

  } // end of for loop

} // end of createProfile()

// Create 12 Employee Profiles
createProfile(12);
