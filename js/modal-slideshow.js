/* ======================================
    Modal & Slideshow
   ====================================== */

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  These scripts create functioning modals as well as a slideshow for them.

  Use this document in conjunction with the stylesheet modal-slideshow.css for the CSS animations. These CSS animations are used because jQuery slide animations are buggy and inconsistent in performance.

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  HTML Object Requirements Per Modal

   <!--  Modal Trigger -->
   <!-- Modal trigger can be any element given the .modal-trigger class  -->
   <!-- - If trigger is a simple button -  -->
   <button class="modal-trigger">Open [Object Name]</button>
   <!-- - OR if trigger is a video screenshot - -->
   <button class="modal-trigger vid-modal-trigger text-center"><img src="[image URL]" alt=""></button>

   <!-- Modal Background/Wrapper -->
  <div class="modal-bkgrnd">

    <!-- Individual Modal -->
    <div class="modal">

      <div class="modal-card">
          <button type="button" class="modal-close-btn">&#10006;</button>
          <div class="modal-content">

          </div> <!-- /.modal-content -->
      </div> <!-- /.modal-card -->

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>  <!-- /.modal-btn-container -->

    </div> <!-- /.modal -->

  </div>  <!-- End of modal background/wrapper -->

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  // -------------------------------
  //   Variables
  // -------------------------------

  // Get any modal trigger button
  const $modalTrigger = $(".modal-trigger");

  // Get the modal background
  const $modalBkgrnd = $(".modal-bkgrnd");

  // Get modal content window
  const $modal = $(".modal");

  // Get modal close button
  const $modalCloseBtn = $(".modal-close-btn");

  // -------------------------------
  //   Helper Functions
  // -------------------------------

  // Function to remove any present animation classes
  function removeAnimations() {
    $modal.removeClass('slideInLeft slideOutLeft slideInRight slideOutRight modalOpen');
  }

  // -------------------------------
  //   Modal by Index in DOM
  // -------------------------------

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  These scripts select and manipulate modal objects by their index number/instance in the DOM.
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  function modalByIndex() {
   // Function for when user clicks modal trigger button
   $($modalTrigger).click(function(e){

      // Loop through all modal divs
      for (let i = 0; i < $modal.length; i++) {
        // If the index of the clicked modal trigger matches the current modal div in the loop
        if ($modalTrigger.index(this) === i) {
          // Note: I used "this" here to induce event bubbling on the entire contents of the modal trigger.

          // Open modal background
          $modalBkgrnd.show();

          // Open the modal corresponding to the clicked trigger
          $modal.eq(i).show().toggleClass('modalOpen');

        } // end of if statement

      } // end of for loop

   });

   // Function for when user clicks close button
   $modalCloseBtn.click(function(e){

     // Loop through all modal divs
     for (let i = 0; i < $modal.length; i++) {
       // If the index of the clicked modal close button matches the current modal div in the loop
       if ($modalCloseBtn.index(this) === i) {
         // Note: I used "this" here to induce event bubbling on the "x" inside the close button.

         // Close entire modal
         $modalBkgrnd.toggle('fade', 300).find($modal).hide();

         removeAnimations();

       } // end of if statement

     } // end of for loop

   });

   // Function for when user clicks the area outside the modal content window (i.e. the modal overlay)
   $($modalBkgrnd).click(function(e){

     // If the modal div itself is the target...
     if ($modalBkgrnd.is(e.target) || $modal.is(e.target)) {
       // Note: I used "e.target" here to prevent event bubbling on the $modalBkgrnd's children.

       // Close the clicked modal overlay
       $(this).toggle('fade', 300).find($modal).hide();

       removeAnimations();

     }

   });

  }

  // Call function
  modalByIndex();

  // -------------------------------
  //   Modal Slide Show
  // -------------------------------

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  These scripts grab the modals in sequence and make them appear as a slideshow when a "previous" and "next" button are clicked.

  Each set of modal objects is in the same overall modal container, so the background doesn't move as the modal objects slide to the left or right.

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  // Variables
  const $previousBtn = $('.modal-prev');
  const $nextBtn = $('.modal-next');

  // Function to create modal slideshow
  function modalSlideShow() {

   // When "Previous" button is clicked...
   $previousBtn.on('click', function (e) {

     removeAnimations();

     // Loop through the modals
     $modal.each( (i) => {
       // If the index of the clicked button matches the current modal...
       if ($previousBtn.index(this) === i) {
         // Note: I used "this" here and in the "next" button click function to induce event bubbling on the chevron inside the button.

         // Get current modal and slide it out to the right after a short delay
         $modal.eq(i).toggleClass('slideOutRight');
         setTimeout(() => {$modal.eq(i).hide();}, 300);

         // Show the PREVIOUS modal in the sequence and slide it in from the left
         setTimeout(()=> {$modal.eq(i - 1).toggleClass('slideInRight').show();}, 300);

       } // end of if statement

     }); // end of each() loop

   }); // end of click function

   // When the "Next" button is clicked...
   $nextBtn.on('click', function (e) {

     removeAnimations();

     // Capture current button's index number
     const thisBtnIndex = $nextBtn.index(this);

     // If the clicked button is the last in the sequence...
     if (thisBtnIndex === $nextBtn.length - 1){
       // Note: I had to subtract 1 because the .length property counts differently from index property.

       // Get the last modal and slide it out to the left after a short delay
       $modal.eq(thisBtnIndex).toggleClass('slideOutLeft');
       setTimeout(() => {$modal.eq(thisBtnIndex).hide();}, 300);

       // Show the first modal in the sequence and slide it in from the right
       setTimeout(()=> {$modal.eq(0).toggleClass('slideInLeft').show();}, 300);

     } // end of if statement

      else {
        // Loop through the modals
        $modal.each( (i) => {

          // If the index of the clicked button matches the current modal...
          if ($nextBtn.index(this) === i) {

            // Get the current modal and slide it out to the left
            $modal.eq(i).toggleClass('slideOutLeft');
            setTimeout(() => {$modal.eq(i).hide();}, 300);

            // Show the NEXT modal in the sequence and slide it in from the right
            setTimeout(()=> {$modal.eq(i + 1).toggleClass('slideInLeft').show();}, 300);

          } // end of if statement

        }); // end of $modal.each() loop
      } // end of else statement

    }); // end of click function
  } // end of modalSlideShow()

  // Call function
  modalSlideShow();
