const firebaseConfig = {
    apiKey: "AIzaSyCMDiznodSlAvp8ZpP6jjeEK6dOxGApDUk",
    authDomain: "cloud-ai-a0769.firebaseapp.com",
    databaseURL: "https://cloud-ai-a0769-default-rtdb.firebaseio.com",
    projectId: "cloud-ai-a0769",
    storageBucket: "cloud-ai-a0769.appspot.com",
    messagingSenderId: "819738537672",
    appId: "1:819738537672:web:f9e9286160bb3454d67ffd"
  };
  
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 // Reference your database
 var contactFormDB = firebase.database().ref("cloudForm");

 // Initialize Firebase storage
 var storage = firebase.storage();

 document.getElementById("cloudForm").addEventListener("submit", submitForm);

 function submitForm(e) {
   e.preventDefault();

   var name = getElementVal("name");
   var emailid = getElementVal("emailid");
   var file = document.getElementById("file").files[0];

   if (file) {
     // Create a storage reference
     var storageRef = storage.ref("messages/" + new Date().getTime() + "_" + file.name);

     // Upload the file to Firebase storage
     var task = storageRef.put(file);

     // Update progress bar
     task.on("state_changed", function(snapshot) {
       var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log("Upload is " + percentage + "% done");
     }, function(error) {
       // Handle error
       console.error(error);
     }, function() {
       // Handle successful upload
       task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         // Save the download URL and other form data to the realtime database
         saveMessages(name, emailid, file.name, downloadURL);
       });
     });
   } else {
     // If no file is selected, save other form data without file
     saveMessages(name, emailid, null, null);
   }

   // Enable alert
   document.querySelector(".alert").style.display = "block";

   // Remove the alert
   setTimeout(() => {
     document.querySelector(".alert").style.display = "none";
   }, 3000);

   // Reset the form
   document.getElementById("cloudForm").reset();
 }

 const saveMessages = (name, emailid, fileID, downloadURL = null) => {
   var newContactForm = contactFormDB.push();

   newContactForm.set({
     name: name,
     emailid: emailid,
     fileID: fileID,
     downloadURL: downloadURL
   });
 };

 const getElementVal = (id) => {
   return document.getElementById(id).value;
 };