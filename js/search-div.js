/*jshint esversion: 6 */
/* ======================================
    Search Container Div
   ====================================== */

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   These scripts add a search bar to the DOM.

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

 // Create form elements
   const $form = $('<form></form>').attr('action', '#').attr('method', 'get');
   const $search = $('<input>').attr('type', 'search').attr('id', 'search-input').attr('class', 'search-input').attr('placeholder', 'Filter by name.');
   const $submit = $('<input>').attr('type', 'submit').attr('value', 'Submit').attr('id', 'search-submit').attr('class', 'search-submit');

 // Bring elments together and append them to the .search-container div

$form.append($search).append($submit);
$('.search-container').append($form);
