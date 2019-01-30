/* ======================================
    Modal & Slideshow
   ====================================== */

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  These scripts create functioning modals as well as a slideshow for them.

  Use this document in conjunction with the stylesheet modal-slideshow.css for the CSS animations. These CSS animations are used because jQuery slide animations are buggy and inconsistent in performance.

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  HTML Object Requirements Per Modal

  <!-- Any Parent Container for Set of Modal Objects -->
  <div>

   <!--  Modal Trigger -->
   <!-- Modal trigger can be any element given the .modal-trigger class  -->
   <!-- - If trigger is a simple button -  -->
   <button class="modal-trigger">Open [Object Name]</button>
   <!-- - OR if trigger is a video screenshot - -->
   <button class="modal-trigger vid-modal-trigger text-center"><img src="[image URL]" alt=""></button>

  </div> <!-- End of modal set -->

  <div class="modal-container">
      <div class="modal">
          <button type="button" class="modal-close-btn">&#10006;</button>
          <div class="modal-content">

          </div>
      </div>

      // IMPORTANT: Below is only for exceeds tasks
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


  // **** I need to modify these scripts so that they work with modal items that are in the same container. I may need to add a CSS animation to the modal's appearance.


  // -------------------------------
  //   Variables
  // -------------------------------

  // Get any modal trigger button
  const $modalTrigger = $(".modal-trigger");

  // Get any modal overlay
  const $modalDiv = $(".modal-container");

  // Get modal content window
  const $modalStuff = $(".modal-grouper");

  // Get modal close button
  const $modalCloseBtn = $(".modal-close-btn");

  // -------------------------------
  //   Helper Functions
  // -------------------------------

  // Function to remove any present animation classes
  function removeAnimations() {
    $modalStuff.removeClass('slideInLeft slideOutLeft slideInRight slideOutRight modalOpen');
  }

  // -------------------------------
  //   Modal by Index in DOM
  // -------------------------------

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  09-18-2018: These scripts select and manipulate modal objects by their index number/instance in the DOM. So, unlike the DOM traversal scripts I made a few months ago, these ones do not require that the modal-trigger and modal-overlay content be placed in the same precise manner. They just need to be in the same chronological order to match up the index numbers.
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  function modalByIndex() {
   // Function for when user clicks modal trigger button
   $($modalTrigger).click(function(e){

      // Loop through all modal divs
      for (let i = 0; i < $modalStuff.length; i++) {
        // If the index of the clicked modal trigger matches the current modal div in the loop
        if ($modalTrigger.index(this) === i) {
          // Note: I used "this" here to induce event bubbling on the entire contents of the modal trigger.

          // Open modal background
          $modalDiv.show();

          // Open the modal corresponding to the clicked trigger
          $modalStuff.eq(i).show().toggleClass('modalOpen');

        } // end of if statement

      } // end of for loop

   });

   // Function for when user clicks close button
   $modalCloseBtn.click(function(e){

     // Loop through all modal divs
     for (let i = 0; i < $modalStuff.length; i++) {
       // If the index of the clicked modal close button matches the current modal div in the loop
       if ($modalCloseBtn.index(this) === i) {
         // Note: I used "this" here to induce event bubbling on the "x" inside the close button.

         // Close entire modal
         $modalDiv.toggle('fade', 300).find($modalStuff).hide();

         removeAnimations();

       } // end of if statement

     } // end of for loop

   });

   // Function for when user clicks the area outside the modal content window (i.e. the modal overlay)
   $($modalDiv).click(function(e){

     // If the modal div itself is the target...
     if ($modalDiv.is(e.target) || $modalStuff.is(e.target)) {
       // Note: I used "e.target" here to prevent event bubbling on the $modalDiv's children.

       // Close the clicked modal overlay
       $(this).toggle('fade', 300).find($modalStuff).hide();

       removeAnimations();

     }

   });

  }

  modalByIndex();

  // -------------------------------
  //   Modal Slide Show
  // -------------------------------

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  These scripts grab the modals in sequence and make them appear as a slideshow when a "previous" and "next" button are clicked.

  Because each modal is in a separate container, the animation for the slideshow does not have the same appearance as a slideshow/carousel in which all elements are in the same container. So I had to make the sliding in and out of the elements overlap a bit using the jQuery delay() method.

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  // **** Since the pairs of modal objects are not grouped together in containers, I need to make these scripts slide both the appropriate modal and button container.


  const $previousBtn = $('.modal-prev');
  const $nextBtn = $('.modal-next');

  function modalSlideShow() {

   // When "Previous" button is clicked...
   $previousBtn.on('click', function (e) {

     removeAnimations();

     // Loop through the modal-overlays
     $modalStuff.each( (i) => {
       // If the index of the clicked button matches the current modal-overlay...
       if ($previousBtn.index(this) === i) {
         // Note: I used "this" here and in the "next" button click function to induce event bubbling on the chevron inside the button.

         // Get current modal-overlay and slide it out to the right after a short delay
         // $modalStuff.eq(i).toggle('slide', {direction:'right', easing:'swing'}, 600);
         $modalStuff.eq(i).toggleClass('slideOutRight');
         setTimeout(() => {$modalStuff.eq(i).hide();}, 300);

         // Show the PREVIOUS modal-overlay in the sequence and slide it in from the left
         // $modalStuff.eq(i - 1).toggle('slide', {direction:'left', easing:'swing'}, 600);
         setTimeout(()=> {$modalStuff.eq(i - 1).toggleClass('slideInRight').show();}, 300);

       } // end of if statement

     }); // end of each() loop



   }); // end of click function

   // When the "Next" button is clicked...
   $nextBtn.on('click', function (e) {

     removeAnimations();

     // console.log($nextBtn);

     // *** $thisBtn.index() currently returns 1 because it's counting the buttons in the $btnCntnr, not all the next buttons. I need to find a way to have the index of the clicked next button be its place among all next buttons. I may need to loop through the next buttons separately.
     const targetBtn = e.target;
     const thisBtn = this;
     const thisBtnIndex = $nextBtn.index(thisBtn);
     // console.log(e.target);
     // console.log(thisBtn);
     // console.log(thisBtn.indexOf);
     let clickedBtn;

     // console.log($nextBtn.index(thisBtn));

     // Loop through next buttons
     // $nextBtn.each(function (i) {
     //   // console.log($nextBtn.eq(i));
     //   if ($nextBtn.eq(i) == thisBtn) {
     //     console.log('true');
     //     // clickedBtn = $nextBtn.eq(i);
     //   }
     // });
     // console.log(clickedBtn);

     // console.log($nextBtn.index());

     // If the clicked button is the last in the sequence...
     // if ($nextBtn.index(i) === $nextBtn.index(thisBtn) && $nextBtn.index(thisBtn) === $nextBtn.length -1)
     // if ($nextBtn.index(thisBtn) === $nextBtn.length - 1){
     if (thisBtnIndex === $nextBtn.length - 1){
       // console.log($nextBtn.index());
       // console.log(thisBtn);
       // Note: I had to subtract 1 because the .length property counts differently from index property.

       // Get the last modal-overlay and slide it out to the left after a short delay
       // $modalStuff.eq(thisBtnIndex).toggle('slide', {direction:'left', easing:'swing'}, 600);
       $modalStuff.eq(thisBtnIndex).toggleClass('slideOutLeft');
       setTimeout(() => {$modalStuff.eq(thisBtnIndex).hide();}, 300);

       // Show the first modal-overlay in the sequence and slide it in from the right
       // $modalStuff.eq(0).toggle('slide', {direction:'right', easing:'swing'}, 600);
       setTimeout(()=> {$modalStuff.eq(0).toggleClass('slideInLeft').show();}, 300);

     } // end of if statement

      else {
        // Loop through the modal-overlays
        $modalStuff.each( (i) => {

          // // If the clicked button is the last in the sequence...
          // // if ($nextBtn.index(i) === $nextBtn.index(thisBtn) && $nextBtn.index(thisBtn) === $nextBtn.length -1)
          // if ($nextBtn.index(thisBtn) === $nextBtn.length - 1){
          //   // console.log($nextBtn.index());
          //   // console.log(thisBtn);
          //   // Note: I had to subtract 1 because the .length property counts differently from index property.
          //
          //   // Get the last modal-overlay and slide it out to the left after a short delay
          //   $modalStuff.eq($nextBtn.index(thisBtn)).toggle('slide', {direction:'left', easing:'swing'}, 600);
          //
          //   // Show the first modal-overlay in the sequence and slide it in from the right
          //   $modalStuff.eq(0).toggle('slide', {direction:'right', easing:'swing'}, 600);
          //
          // } // end of if statement

          // else if the index of the clicked button matches the current modal-overlay...
          if ($nextBtn.index(this) === i) {



            // Get current modal-overlay and slide it out to the left
            // $modalStuff.eq(i).toggle('slide', {direction:'left', easing:'swing'}, 600);
            $modalStuff.eq(i).toggleClass('slideOutLeft');
            setTimeout(() => {$modalStuff.eq(i).hide();}, 300);

            // console.log($modalStuff.eq(i + 1));

            // Show the NEXT modal-overlay in the sequence and slide it in from the right
            // $modalStuff.eq(i + 1).delay(500).toggle('slide', {direction:'right', easing:'swing'}, 500);
            setTimeout(()=> {$modalStuff.eq(i + 1).toggleClass('slideInLeft').show();}, 300);


          } // end of if statement

        }); // end of each() loop
      } // end of else statement



    }); // end of click function
  } // end of modalSlideShow()

  modalSlideShow();
