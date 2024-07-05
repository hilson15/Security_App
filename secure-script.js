const residents = [
  { username: 'dan1', password: 'pass1', passcode: '1234', image: 'ceo.jpg', houseNumber: '001', status: 'Checked In', relations: [
    { name: 'Joan Daniel', image: 'res1-wife.jpg' },
    { name: 'Alex Dan', image: 'res1-son.jpg' }
  ]},
  { username: 'Hilson', password: 'pass02', passcode: '0000', image: 'profile-pix.jpg', houseNumber: 'Flat-B1 House 1', status: 'Checked In', relations: [
    { name: 'Martina Hilson', image: 'wife-res2.jpg' },
    { name: 'Chioma Innocent', image: 'res2-sis.jpg' },
    { name: 'Chima Innocent', image: 'brother-res2.jpg' },
    { name: 'Manuel Innocent', image: 'res2-friend.jpg' }
  ] },
  { username: 'resident3', password: 'pass3', passcode: '3456', image: 'img3.jpg', houseNumber: '003', status: 'Checked In' },
  { username: 'resident4', password: 'pass4', passcode: '4567', image: 'img4.jpg', houseNumber: '004', status: 'Checked In' },
  { username: 'resident5', password: 'pass5', passcode: '5678', image: 'img5.jpg', houseNumber: '005', status: 'Checked In' },
];



// modifying end 

    let visitorNotifications = [];
    const securityPersonnel = [
      { username: 'security1', password: 'secure1', status: 'on duty' },
      { username: 'security2', password: 'secure2', status: 'off duty' },
      {username: 'comfort', password: 'c4', status: 'on duty'},
    ];
    
    let currentResident = null;
    let isCheckedIn = false;
    

    function residentLogin() {

      const username = document.getElementById('residentUsername').value;
      const password = document.getElementById('residentPassword').value;

      currentResident = residents.find(user => user.username === username && user.password === password);

      if (currentResident) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('residentDashboard').style.display = 'block';
        document.getElementById('residentLoggedInUser').innerText = currentResident.username;
      } else {
        document.getElementById('alert').style.display = 'block';
        // document.getElementById('alert').innerHTML= 'Invalid username or password';
        displayAlert('Invalid username or password', 3000);
               // alert('Invalid username or password');
      }
     // Populate visitor form fields with resident's information
  document.getElementById('visitorHostName').value = currentResident.username;
  document.getElementById('visitorHouseNumber').value = currentResident.houseNumber;

  // Disable visitor form fields
  document.getElementById('visitorHostName').disabled = true;
  document.getElementById('visitorHouseNumber').disabled = true;
    }

    
    // Function to display message in the alert and hide it after a duration
function displayAlert(message, duration) {
  const alertDiv = document.getElementById('alert');
  alertDiv.style.display = 'block';
  alertDiv.innerHTML = message;

  // Set timeout to hide the alert after the specified duration
  setTimeout(function() {
      alertDiv.style.display = 'none';
  }, duration);
}


    function checkInOut() {
      isCheckedIn = !isCheckedIn;
      displayAlert(`You are ${isCheckedIn ? 'Checked In' : 'Checked Out'}`, 3000);  
      displayAlert(`You are ${isCheckedIn ? 'Checked In' : 'Checked Out'}`, 3000);
        
    }

    

    //function shareLocation() {
     // document.getElementById('alert').style.display= 'block';
       //displayAlert('Location sharing feature will be implemented later', 3000);
      // alert('Location sharing feature will be implemented later');
   // }

   function shareLocation() {
    const selectedResidentUsername = document.getElementById('residentSelector').value;
    
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Request permission to access the user's location
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // Success callback
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationString = `Latitude: ${latitude}, Longitude: ${longitude}`;
          
          // Find the selected resident
          const selectedResident = residents.find(resident => resident.username === selectedResidentUsername);
          
          if (selectedResident) {
            // Share location with the selected resident
            selectedResident.sharedLocation = locationString;
            
            // Update security dashboard with shared location
            updateSecurityDashboardWithSharedLocation(selectedResident);
            
            // Display location to the user
            displayAlert('Location shared successfully.', 3000); // Display for 3 seconds
          } else {
            displayAlert('Please select a resident to share the location.', 3000);
          }
        },
        function(error) {
          // Error callback
          displayAlert(`Error getting location: ${error.message}`, 5000);
        }
      );
    } else {
      // Geolocation not supported
      displayAlert("Geolocation is not supported by your browser.", 5000);
    }
  }

  function populateResidentOptions() {
    const residentSelector = document.getElementById('residentSelector');

    // Clear existing options
    residentSelector.innerHTML = '';

    // Create default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Resident';
    residentSelector.appendChild(defaultOption);

    // Populate options for residents
    residents.forEach(resident => {
        const option = document.createElement('option');
        option.value = resident.username;
        option.textContent = resident.username;
        residentSelector.appendChild(option);
    });
}

function updateSecurityDashboardWithSharedLocation(resident) {
  // Display shared location in security dashboard
  const securitySharedLocation = document.getElementById('securitySharedLocation');
  securitySharedLocation.innerText = `Resident: ${resident.username}, Shared Location: ${resident.sharedLocation}`;
  document.getElementById('sharedLocationIndicator').style.display = 'block';
}

// Call the function to populate resident options when the page loads
window.addEventListener('load', populateResidentOptions);


 // Function to display shared location details when clicked
function displaySharedLocationDetails() {
  const sharedLocationDetails = document.getElementById('sharedLocationDetails');
  sharedLocationDetails.innerText = ''; // Clear previous content

  // Check if current resident has shared location
  if (currentResident && currentResident.sharedLocationWith) {
    // Display shared location details
    // document.getElementById('sharedLocationDetails')= 'block';
    sharedLocationDetails.innerText = `Shared by: ${currentResident.name}`;
    sharedLocationIndicator.style.display = 'block'; // Show indicator
  } else {
    // No shared location available
    sharedLocationDetails.innerText = 'No location shared.';
    sharedLocationIndicator.style.display = 'none'; // Hide indicator
  }
}

// Event listener for shared location
document.getElementById('sharedLocation').addEventListener('click', displaySharedLocationDetails);
 

  
    

    function viewUpdate() {
      document.getElementById('alert').style.display= 'block';
      displayAlert('View update feature will be implemented later', 3000);
      // alert('View update feature will be implemented later');
    }
    

    function postUpdate() {
      document.getElementById('alert').style.display= 'block';
     displayAlert('Post update feature will be implemented later', 3000);
      // alert('Post update feature will be implemented later');
    }

    function closeVisitorForm(){
      document.getElementById('visitorForm').style.display= 'none';
    }
        
    function residentLogout() {
      
      currentResident = null;
      isCheckedIn = false;
      document.getElementById('residentDashboard').style.display = 'none';
      document.getElementById('container').style.display = 'none';

      document.getElementById('securityDashboard').style.display= 'none';
      document.getElementById('login-out-page').style.display= 'block';

      // document.getElementById('container').style.display = 'none';
    }

    function returnHome(){
      document.getElementById('container').style.display= 'block';
      document.getElementById('login').style.display = 'block';
      document.getElementById('residentDashboard').style.display= 'none';
      document.getElementById('login-out-page').style.display='none';
    }
    function showSecurityLogin() {
      document.getElementById('residentDashboard').style.display = 'none';
      document.getElementById('securityDashboard').style.display = 'none';
      document.getElementById('login').style.display = 'block';
    }

    // Function to handle login for security personnel
    function securityLogin() {
      const username = document.getElementById('securityUsername').value;
      const password = document.getElementById('securityPassword').value;
    
      // Check if entered credentials match any security personnel and they are on duty
      const loggedInSecurity = securityPersonnel.find(person => 
        person.username === username && person.password === password && person.status === 'on duty'
      );
    
      if (loggedInSecurity) {
        // Login successful, display security dashboard
        document.getElementById('login').style.display = 'none';
        document.getElementById('securityDashboard').style.display = 'block';
      } else {
        // Login failed, display error message or alert
        displayAlert('Invalid username, password, or not on duty', 3000);
      }
    }

    // function securityLogin() {
      // Show loading animation
  //  var loadingContainer = document.getElementById('loadingContainer');
  //  loadingContainer.style.display = 'flex';
 
   // Simulate async operation (e.g., API call)
  //  setTimeout(function() {
     
  // const username = document.getElementById('securityUsername').value;
  // const password = document.getElementById('securityPassword').value;

  // if (username === security.username && password === security.password) {
     // Hide loading animation
    //  loadingContainer.style.display = 'none';
    //  display the security dashboard
  //   document.getElementById('login').style.display = 'none';
  //   document.getElementById('securityDashboard').style.display = 'block';
  // } else {
    // loadingContainer.style.display = 'none';
    // document.getElementById('alert').innerHTML = 'Invalid username or password';
    // Hide loading animation
   
    // alert('Invalid username or password');
  // }

  //   }


function openVerifyForm() {
  document.getElementById('verifyForm').style.display = 'block';
}

function verifyResident() {

  const username = document.getElementById('verifyUsername').value;
  const passcode = document.getElementById('verifyPasscode').value;

  const matchedResident = residents.find(resident => 
    resident.username === username && resident.passcode === passcode
  );

  if (matchedResident) {
    document.getElementById('residentInfo').style.display = 'block';
    document.getElementById('residentImage').src = matchedResident.image;
    document.getElementById('residentName').innerText = `Name: ${matchedResident.username}`;
    document.getElementById('residentHouseNumber').innerText = `House Number: ${matchedResident.houseNumber}`;

     // Update confirmation box to green
     document.getElementById('confirmationBox').style.display='block';
     document.getElementById('confirmationBox').style.backgroundColor = 'green';
     document.getElementById('confirmationMessage').innerText = 'Verified';
     document.getElementById('verifiedIcon').style.display='inline';
     document.getElementById('notVerifiedIcon').style.display='none';
    //  document.querySelector('.fa-check-circle').style.display = 'inline';

     // Reset the verification form
    document.getElementById('verifyUsername').value = '';
    document.getElementById('verifyPasscode').value = '';
  
    // // Set radio button status
    // document.getElementById('checkInRadio').checked = matchedResident.status === 'Checked In';
    // document.getElementById('checkOutRadio').checked = matchedResident.status === 'Checked Out';
  
    // Display relations' details
    const relationsContainer = document.getElementById('residentRelations');
    relationsContainer.innerHTML = ''; // Clear previous content
    matchedResident.relations.forEach(relation => {
      const relationElement = document.createElement('div');
      const relationImage = document.createElement('img');
      relationImage.src = relation.image;
      relationImage.alt = relation.name;
      relationImage.style.maxWidth = '100px';
      const relationName = document.createElement('p');
      relationName.innerText = relation.name;
      relationElement.appendChild(relationImage);
      relationElement.appendChild(relationName);
      relationsContainer.appendChild(relationElement);
    });
  } else {
    document.getElementById('confirmationBox').style.display='block';
     document.getElementById('confirmationBox').style.backgroundColor = 'red';
     document.getElementById('confirmationMessage').innerText="Not Confirmed";
     document.getElementById('notVerifiedIcon').style.display='inline';
     document.getElementById('verifiedIcon').style.display = 'none';
    //  document.querySelector('.fa-solid fa-hand fa-beat').style.display = 'inline';
    displayAlert('Resident data does not exist', 3000);
    // alert('Resident data does not exist');
  }
}

// Function to show relations' details
function showRelations() {
  const relationsContainer = document.getElementById('residentRelations');
  const relationsButton = document.getElementById('showRelationsButton');

  if (relationsContainer.style.display === 'none') {
    relationsContainer.style.display = 'block';
    relationsButton.innerText = 'Hide Relations';
  } else {
    relationsContainer.style.display = 'none';
    relationsButton.innerText = 'Show Relations';
  }
}


function checkInOut() {
  const username = document.getElementById('verifyUsername').value;

  const residentIndex = residents.findIndex(resident => resident.username === username);

  if (residentIndex !== -1) {
    residents[residentIndex].status = residents[residentIndex].status === 'Checked In' ? 'Checked Out' : 'Checked In';
    
    // Set radio button status
    document.getElementById('checkInRadio').checked = residents[residentIndex].status === 'Checked In';
    document.getElementById('checkOutRadio').checked = residents[residentIndex].status === 'Checked Out';
    
    displayAlert(`Resident status changed to ${residents[residentIndex].status}`, 3000);
    // alert(`Resident status changed to ${residents[residentIndex].status}`);
  } else {
     displayAlert('Resident data does not exist', 3000);
    // alert('Resident data does not exist');
  }
}

function openVisitorForm() {
  document.getElementById('visitorForm').style.display = 'block';
}

function updateNotificationBadge(count) {
  const badge = document.getElementById("visitor-notification-badge");
  badge.innerText = count;

  // Remove any existing event listeners to prevent multiple bindings
  badge.removeEventListener('click', displayVisitorDetails);

  // Add event listener to reset badge count when clicked
  badge.addEventListener('click', function() {
    badge.innerText = '0'; // Reset badge count to zero
  });
}



//A function that will update security dashboard when a visitor register visitor
// Function to update the security dashboard with visitor information
function updateSecurityDashboard(visitorName, visitorPurpose, visitorHouseNumber, visitorHostName) {
  const securityDashboard = document.getElementById('securityDashboard');

  // Create a new list item to display visitor information
  const visitorInfo = document.createElement('li');
  visitorInfo.textContent = `Visitor: ${visitorName}, Purpose: ${visitorPurpose}, House Number: ${visitorHouseNumber}, Host Name: ${visitorHostName}`;

  // Append the visitor information to the security dashboard
  securityDashboard.appendChild(visitorInfo);
}


function submitVisitor() {
  console.log('Submit button clicked'); // Debug logging
  const visitorName = document.getElementById('visitorName').value;
  const visitorPurpose = document.getElementById('visitorPurpose').value;
  const visitorHouseNumber = document.getElementById('visitorHouseNumber').value;
  const visitorHostName = document.getElementById('visitorHostName').value;

  const visitor = {
      name: visitorName,
      purpose: visitorPurpose,
      houseNumber: visitorHouseNumber,
      hostName: visitorHostName
      
  };

  console.log('Visitor details:', visitor); // Debug logging

  visitorNotifications.push(visitor);
  updateNotificationBadge(visitorNotifications.length);
  console.log('Visitor notifications:',visitorNotifications); // Debug logging
  // displayVisitorNotification();
  // displayVisitorDetails();
  // console.log('registration done!');
  document.getElementById('alert').style.display = 'block';
  displayAlert(`your Visitor ${visitorName} Registered Successfully`, 3000);
  // alert('Visitor registered successfully');

  // Call function to update security dashboard
  // updateSecurityDashboard();

  // Reset form
  document.getElementById('visitorName').value = '';
  document.getElementById('visitorPurpose').value = '';
  document.getElementById('visitorHouseNumber').value = '';
  document.getElementById('visitorHostName').value = '';

  // Hide visitor form
  document.getElementById('visitorForm').style.display = 'none';
}


// Function to display visitor details in a modal
function displayVisitorDetails() {
  const modal = document.getElementById('visitorModal');
  const visitorListModal = document.getElementById('visitorListModal');
  visitorListModal.innerHTML = ''; // Clear previous content

  // Iterate through visitorNotifications array
  visitorNotifications.forEach(visitor => {
      // Create list item element to display visitor details
      const listItem = document.createElement('li');
      listItem.textContent = `Visitor: ${visitor.name}, Purpose: ${visitor.purpose}, House Number: ${visitor.houseNumber}, Host Name: ${visitor.hostName}`;
      
      // Append list item to modal content
      visitorListModal.appendChild(listItem);
  });

  // Display the modal
  modal.style.display = 'block';
}

// function displayVisitorNotification() {
//   const notificationContainer = document.getElementById('visitorNotification');
//   notificationContainer.style.display = 'none';

//   const visitorList = document.getElementById('visitorList');
//   visitorList.innerHTML = '';

//   visitorNotifications.forEach(visitor => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `Visitor: ${visitor.name}, Purpose: ${visitor.purpose}, House Number: ${visitor.houseNumber}, Host Name: ${visitor.hostName}`;
//       visitorList.appendChild(listItem);
//   });
// }


// Function to display visitor notification in modal
// function displayVisitorNotificationInModal() {
//   const modal = document.getElementById('visitorModal');
//   const visitorListModal = document.getElementById('visitorListModal');
//   visitorListModal.innerHTML = '';

//   visitorNotifications.forEach(visitor => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `Visitor: ${visitor.name}, Purpose: ${visitor.purpose}, House Number: ${visitor.houseNumber}, Host Name: ${visitor.hostName}`;
//       visitorListModal.appendChild(listItem);
//   });

//   modal.style.display = 'block';
// }

// // Function to close the modal
function closeVisitorModal() {
  const modal = document.getElementById('visitorModal');
  modal.style.display = 'none';
}

// show messages received 
// Function to display visitor details in a modal
function displayVisitorDetails() {
  const modal = document.getElementById('visitorModal');
  const visitorListModal = document.getElementById('visitorListModal');
  visitorListModal.innerHTML = ''; // Clear previous content

  // Iterate through visitorNotifications array
  visitorNotifications.forEach(visitor => {
      // Create list item element to display visitor details
      const listItem = document.createElement('li');
      listItem.textContent = `Visitor: ${visitor.name}, Purpose: ${visitor.purpose}, House Number: ${visitor.houseNumber}, Host Name: ${visitor.hostName}`;
      
      // Append list item to modal content
      visitorListModal.appendChild(listItem);
  });

  // Display the modal
  modal.style.display = 'block';
}

// Event listener for the button with the notification badge
document.getElementById('notificationButton').addEventListener('click', displayVisitorDetails);



// Function to notify visitor arrival
function notifyVisitorArrival() {
  // Implementation to notify security about visitor arrival
  const visitorName = prompt("Enter visitor's name:");
  const purposeOfVisit = prompt(`Enter purpose of visit for ${visitorName}:`);
  const houseNumber = prompt(`Enter house number for ${visitorName}:`);
  const hostName = prompt(`Enter host name for ${visitorName}:`);
  
  const arrivalNotification = {
    name: visitorName,
    purpose: purposeOfVisit,
    houseNumber: houseNumber,
    hostName: hostName,
    status: "Arrival"
  };
   // Add notification to the list
   visitorNotifications.push(arrivalNotification);
  
   // Update the visitor notification display
   displayVisitorNotification();
   
   // Alert visitor arrival
   displayAlert(`Visitor ${visitorName} has arrived.`, 3000);
 }

// Function to notify visitor departure
function notifyVisitorDeparture() {
  // Get visitor details
  const visitorName = prompt("Enter visitor's name:");
  const purposeOfVisit = prompt(`Enter purpose of visit for ${visitorName}:`);
  const houseNumber = prompt(`Enter house number for ${visitorName}:`);
  const hostName = prompt(`Enter host name for ${visitorName}:`, 3000);

  // Create notification object
  const departureNotification = {
    name: visitorName,
    purpose: purposeOfVisit,
    houseNumber: houseNumber,
    hostName: hostName,
    status: "Departure"
  };
  
  // Add notification to the list
  visitorNotifications.push(departureNotification);
  
  // Update the visitor notification display
  displayVisitorNotification();
  
  // Alert visitor departure
  displayAlert(`Visitor ${visitorName} has arrived.`);
  (`Visitor ${visitorName} has departed.`, 3000);
}



    function securityLogout() {
      document.getElementById('securityDashboard').style.display = 'none';
      document.getElementById('login').style.display = 'none';
      document.getElementById('container').style.display='none';
      document.getElementById('login-out-page').style.display='block';
    }

    // window.addEventListener('load', function() {
    //   var loadingBar = document.getElementById('loadingBar');
    
      // Set the loading bar width to 100% when the page is fully loaded
      // loadingBar.style.width = '100%';
    
      // Hide the loading bar after a short delay
    //   setTimeout(function() {
    //     var loadingBarContainer = document.getElementById('loadingBarContainer');
    //     loadingBarContainer.style.display = 'none';
    //   }, 3000);
    // });
    
    