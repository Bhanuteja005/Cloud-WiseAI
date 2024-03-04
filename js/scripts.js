const firebaseConfig = {
    apiKey: "AIzaSyCMDiznodSlAvp8ZpP6jjeEK6dOxGApDUk",
    authDomain: "cloud-ai-a0769.firebaseapp.com",
    databaseURL: "https://cloud-ai-a0769-default-rtdb.firebaseio.com",
    projectId: "cloud-ai-a0769",
    storageBucket: "cloud-ai-a0769.appspot.com",
    messagingSenderId: "819738537672",
    appId: "1:819738537672:web:f9e9286160bb3454d67ffd"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("cloudForm");
  
  document.getElementById("cloudForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
  
    saveMessages(name, emailid, msgContent);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("cloudForm").reset();
  }
  
  const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };