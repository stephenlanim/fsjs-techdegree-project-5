/*jshint esversion: 6 */
/* ======================================
    Random staff Generator API
   ====================================== */

// Get directory-card targets
let $dcImage;
let $dcName;
let $dcEmail;
let $dcCity;

// Get modal-card targets
let $mcImage;
let $mcName;
let $mcEmail;
let $mcCity;
let $mcPhone;
let $mcAddress;
let $mcBirthday;

// Initialize variables for Fetch data properties
let currentStaff;
let sourceImage;
let sourceName;
let sourceEmail;
let sourceCity;
let sourcePhone;
let parsedPhone;
let sourceAddress;
let sourceBirthday;

// Note: Initializing variables inside of any functions only made them accessible to that function and not any nested functions, despite the fact that nested functions should have access to variables from parent functions. The solution was to initialize these variables on a global scope and update their values after the data was fetched.

// Fetch JSON data for 12 staffs from Random staff API
fetchData('https://randomuser.me/api/?results=12&nat=us')
  .then(data => {
    // Loop through the data results
    data.results.map( staff => {
      // Get properties from staff JSON Object
      currentStaff = data.results.indexOf(staff);
      sourceImage = `${staff.picture.large}`;
      sourceName = `${staff.name.first} ${staff.name.last}`;
      sourceEmail = staff.email;
      sourceCity = staff.location.city;
      sourcePhone = staff.phone;
      parsedPhone = `tel:+1${parsePhoneNumber(staff.phone)}`;
      sourceAddress = `${staff.location.street}, ${staff.location.city}, ${staff.location.state} ${staff.location.postcode}`;
      sourceBirthday = formatBirthday(staff.dob.date);

      // Get gallery card targets
      $dcImage = $('.card .card-img').eq(currentStaff);
      $dcName = $('.card .card-name').eq(currentStaff);
      $dcEmail = $('.card .email').eq(currentStaff);
      $dcCity = $('.card .city').eq(currentStaff);

      // Get modal-card targets
      $mcImage = $('.modal-card .modal-img').eq(currentStaff);
      $mcName = $('.modal-card .modal-name').eq(currentStaff);
      $mcEmail = $('.modal-card .email').eq(currentStaff);
      $mcCity = $('.modal-card .city').eq(currentStaff);
      $mcPhone = $('.modal-card .phone').eq(currentStaff);
      $mcAddress = $('.modal-card .address').eq(currentStaff);
      $mcBirthday = $('.modal-card .birthday').eq(currentStaff);

      insertRandomEmployees(staff);
    }); // end of map()
  }) // end of first then()
; // end of fetchData()


// Function to insert random staff data into directory-cards and modal-cards
function insertRandomEmployees(staff) {

  insertBasicInfo($dcImage, $dcName, $dcEmail, $dcCity);
  insertModalInfo();

}

// Function for inserting basic employee info
function insertBasicInfo (imageTarget, nameTarget,  emailTarget, cityTarget) {

  // Insert employee image
  imageTarget.attr('src', `${sourceImage}`);
  // Insert First and Name
  nameTarget.text(`${sourceName}`);
  // Insert email
  emailTarget.text(`${sourceEmail}`);
  // Insert city
  cityTarget.text(`${sourceCity}`);
} // end of insertBasicInfo()


// Function for populating modal-card
function insertModalInfo() {
  // Insert basic info
  insertBasicInfo($mcImage, $mcName, $mcEmail, $mcCity);

  // Insert email into link w/ mailto
  $mcEmail.attr('href', `mailto:${sourceEmail}`);
  // Insert cell number
  $mcPhone.text(`${sourcePhone}`);
  // Insert parsed phone number into link w/ tel
  $mcPhone.attr('href', `${parsedPhone}`);
  // Insert address
  $mcAddress.text(`${sourceAddress}`);
  // Insert birthday
  $mcBirthday.text(`${sourceBirthday}`);
} // end of insertModalInfo()

// Function for parsing phone number
function parsePhoneNumber(phoneString) {
  // Split phone number string into an array of individual string characters
  const splitNum = phoneString.split('');
  // Create array in which to store just numbers/integers from phone number string
  const intArray = [];

  // Return only the characters that are integers
  splitNum.forEach(char => {
    if (Number.isInteger(parseInt(char))) {
      intArray.push(parseInt(char));
    }
  });

  // Return the joined numbers as one long integer
  const parsedNumber = parseInt(intArray.join(''));

  // return new phone number to be added into new array from map()
  return parsedNumber;
} // end of parsePhoneNumber


// Function to rearrange numbers for staff birthday
function formatBirthday(birthday) {
  const year = birthday.substring(0, 4);
  const month = birthday.substring(5, 7);
  const day = birthday.substring(8, 10);

  return `${month}/${day}/${year}`;
}
