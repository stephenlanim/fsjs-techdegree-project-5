/* ======================================
    Employee Directory Filter
   ====================================== */

const $filter = $('#search-input');
const $profile = $('.card');

// Begin filter after each typed character in input
$filter.on('keyup', function () {

  // For each profile
  $profile.each( function () {
    const $employeeName = $(this).find('.card-name').text().toLowerCase();
    const $userInput = $filter.val().toLowerCase();

    // if employee's name matches user's filter input
    if ($employeeName.includes($userInput)) {
    // show profile
    $(this).show();
    }
    // else hide profile
    else {
      $(this).hide();
    }
  });
});
