// ------------------------SESSION HANDLING---------------------------
var pName;

function findSession() {
	var httpreq = new XMLHttpRequest();
	httpreq.onreadystatechange = function() {
		if (httpreq.readyState == 4) {
			const userName = JSON.parse(httpreq.responseText);
			if (userName != "-1") {
				if (userName['user'] == "student")
					hideLogIn(userName['name']);
				else
					hideStaffLogIn(userName['name'])
				pName = userName['pName'];
			}
		}
	}
	httpreq.open("GET", "http://localhost:8080/Course_Management/FindSession");
	httpreq.send();
}

function deleteSession() {
	var httpreq = new XMLHttpRequest();
	httpreq.open("GET", "http://localhost:8080/Course_Management/DeleteSession");
	httpreq.send();
	location.reload();
}

/* ----------------------------------------------------------- */
/* ------------------------ LOGIN IN POPUP ---------------------*/
var option;
var popup = document.querySelector('.loginPopup');
var close = document.querySelector('.loginPopup .close');
var option = document.getElementsByName("options");

var studentLoginBtn = document.querySelector('#student-login');

studentLoginBtn.addEventListener('click', function() {
	popup.classList.add('student');
	popup.style.display = 'flex';
});


function getStaffOption() {
	this.option = "staff";
	console.log(option);
	document.getElementById("studentLogin").style.backgroundColor = "grey";
	document.getElementById("staffLogin").style.backgroundColor = "green";
}
function getStudentOption() {
	this.option = "student";
	console.log(option)
	document.getElementById("staffLogin").style.backgroundColor = "grey";
	document.getElementById("studentLogin").style.backgroundColor = "green";
}

function loginClosePopup() {
	popup.classList.remove('student');//study
	document.getElementById("studentLogin").style.backgroundColor = "grey";
	document.getElementById("staffLogin").style.backgroundColor = "grey";
	document.getElementById("erOption").style.display = "none";
	document.getElementById("erUsername").style.display = "none";
	document.getElementById("erPassword").style.display = "none";
	document.getElementById("loginusername").value = "";
	document.getElementById("loginpassword").value = "";
	popup.style.display = 'none';
}

function checkUsername() {
	let userName = document.getElementById("loginusername").value;
	if (userName.length > 0) {
		document.getElementById("erUsername").style.display = "none";
	}
}

function checkPassword() {
	let password = document.getElementById("loginpassword").value;
	if (password.length > 0) {
		document.getElementById("erPassword").style.display = "none";
	}
}

function checkOption() {
	if (option.length > 0) {
		document.getElementById("erOption").style.display = "none";
	}
}

function login() {
	let password = document.getElementById("loginpassword").value;
	let userName = document.getElementById("loginusername").value;
	userName = userName.trim();
	var flag = 0;
	if (this.option.length == 0) {
		document.getElementById("erOption").style.display = "block";
		document.getElementById("erOption").innerHTML = "Please choose Option";
		flag = 1;
	}
	if (userName.length == 0) {
		document.getElementById("erUsername").style.display = "block";
		document.getElementById("erUsername").innerHTML = "Please Enter Username";
		flag = 1;
	}
	if (password.length == 0) {
		document.getElementById("erPassword").style.display = "block";
		document.getElementById("erPassword").innerHTML = "Please Enter Password";
		flag = 1;
	}
	if (flag == 1) {
		return;
	}

	ajaxCall("http://localhost:8080/Course_Management/Login", "POST").then(function(result) {
		console.log(result + " --result");
		result.trim();
		console.log(result.length);
		if (result == "2") {// Student Login
			//swal("Login Succesfully");
			hideLogIn(userName);
			document.querySelector(".loginPopup").style.display = "none";
		}
		else if (result == "3") {//Staff login
			console.log("staff login");
			hideStaffLogIn(userName);
			document.querySelector(".loginPopup").style.display = "none";
		}
		else if (result == "4") {// Staff details in temporary table waiting for verification
			swal("Your Account is waiting for Verification");
			document.querySelector(".loginPopup").style.display = "none";
		}
		else {// invalid credentials	
			alert("Invalid Credentials");
			swal("Error", "Invalid User!", "error");
			document.querySelector(".loginPopup").style.display = "none";
		}

		location.reload();
	});
}
function hideStaffLogIn(userName) {
	document.getElementById("show-courses").style.display = "none";
	document.getElementById("student-login").style.display = "none";
	document.getElementById("student-signup").style.display = "none";
	document.getElementById("dropdownProfile").style.display = "none";

	// =============================================================================================
	document.getElementById("staffProfile").style.display = "block";
	document.getElementById("Assignment").style.display = "block";
	document.getElementById("LogOut").style.display = "block";
	document.getElementById("showLoginUser").innerHTML = userName;
}

function hideLogIn(userName) {
	document.getElementById("staffProfile").style.display = "none";
	document.getElementById("student-login").style.display = "none";
	document.getElementById("student-signup").style.display = "none";
	document.getElementById("dropdownProfile").style.display = "block";
	document.getElementById("LogOut").style.display = "block";
	document.getElementById("dropdownProfile").style.display = "block";
	document.getElementById("showLoginUser").innerHTML = userName;
}
//ajax call for login 
function ajaxCall(url, requestMethod) {
	let username = document.getElementById("loginusername").value;
	let password = document.getElementById("loginpassword").value;
	console.log(username);
	console.log(password);
	username = username.trim();
	let choice = this.option;
	this.option = "";
	document.getElementById("loginusername").value = "";
	document.getElementById("loginpassword").value = "";

	var promise = new Promise(function(resolve, reject) {// study
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				resolve(xhr.responseText);
			}
		}
		xhr.open(requestMethod, url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("username=" + username + "&password=" + password + "&choice=" + choice);
	});
	return promise;
}
/*----------------------------------------------------------------------------------*/
/* --------------------------------------- SIGN UP---------------------------------------*/
var signupUser;

var Signuppopup = document.querySelector('.signupPopup');
var Signupclose = document.querySelector('.signupPopup .signupClose');
var Signupoption = document.getElementsByName("options");

var studentSignupBtn = document.querySelector('#student-signup');

studentSignupBtn.addEventListener('click', function() {
	Signuppopup.classList.add('student');
	Signuppopup.style.display = 'flex';
});

document.getElementById("signUpLink").addEventListener("click", function() {
	popup.classList.remove('student');//study
	document.getElementById("studentLogin").style.backgroundColor = "grey";
	document.getElementById("staffLogin").style.backgroundColor = "grey";
	document.getElementById("erOption").style.display = "none";
	document.getElementById("erUsername").style.display = "none";
	document.getElementById("erPassword").style.display = "none";
	document.getElementById("loginusername").innerHTML = "";
	document.getElementById("loginpassword").innerHTML = "";
	popup.style.display = 'none';

	Signuppopup.classList.add('student');
	Signuppopup.style.display = 'flex';
});


function closePopup() {
	document.getElementById("erChooseOption").innerHTML = "";
	document.getElementById("erEmail").innerHTML = "";
	document.getElementById("erSignupPassword").innerHTML = "";
	document.getElementById("erName").innerHTML = "";
	document.getElementById("erDate").innerHTML = "";
	document.getElementById("erQualification").innerHTML = "";
	document.getElementById("erPhone").innerHTML = "";
	document.getElementById("erExperience").innerHTML = "";

	document.getElementById("experienceShow").style.display = "none";
	document.getElementById("studentPopUp").style.display = "grid";
	Signuppopup.classList.remove('student');
	document.getElementById("studentSignUp").style.backgroundColor = "grey";
	document.getElementById("staffSignUp").style.backgroundColor = "grey";
	Signuppopup.style.display = 'none';
	this.signupUser = "";
}

function getStaffSignup() {
	this.signupUser = "staff";

	document.getElementById("erExperience").innerHTML = "";
	document.getElementById("erChooseOption").innerHTML = "";
	document.getElementById("erEmail").innerHTML = "";
	document.getElementById("erSignupPassword").innerHTML = "";
	document.getElementById("erName").innerHTML = "";
	document.getElementById("erDate").innerHTML = "";
	document.getElementById("erQualification").innerHTML = "";
	document.getElementById("erPhone").innerHTML = "";
	let username = document.getElementById("mail").value;
	if (username != "" || username != undefined) {
		checkValidUserName(this.signupUser);
	}
	document.getElementById("experienceShow").style.display = "grid";
	document.getElementById("studentSignUp").style.backgroundColor = "grey";
	document.getElementById("staffSignUp").style.backgroundColor = "green";
}

function getStudentSignup() {
	this.signupUser = "student";
	let username = document.getElementById("mail").value;
	if (username != "" || username != undefined) {
		checkValidUserName(this.signupUser);
	}

	document.getElementById("erChooseOption").innerHTML = "";
	document.getElementById("erEmail").innerHTML = "";
	document.getElementById("erSignupPassword").innerHTML = "";
	document.getElementById("erName").innerHTML = "";
	document.getElementById("erDate").innerHTML = "";
	document.getElementById("erQualification").innerHTML = "";
	document.getElementById("erPhone").innerHTML = "";
	document.getElementById("erExperience").innerHTML = "";

	document.getElementById("experienceShow").style.display = "none";
	document.getElementById("studentPopUp").style.display = "grid";
	document.getElementById("staffSignUp").style.backgroundColor = "grey";
	document.getElementById("studentSignUp").style.backgroundColor = "green";
}


document.getElementById("mail").addEventListener('change', function() {
	let signupUserName = document.getElementById("mail").value;
	checkValidUserName(signupUserName);
});

document.getElementById("mail").addEventListener('input', function() {
	document.getElementById("erEmail").innerHTML = "";
});



function checkValidUserName(signupUsername) {
	if (signupUser == "" || signupUser == null) {
		document.getElementById("erChooseOption").innerHTML = "Please select a option";
		return;
	}
	let username = signupUsername.trim();
	username = username.toLowerCase();
	if (username.length == 0 || username == undefined || username == null) {
		document.getElementById("erEmail").innerHTML = "Please enter a email";
		return;
	}
	console.log(username);
	let htmlreq = new XMLHttpRequest();
	htmlreq.onreadystatechange = function() {
		if (htmlreq.readyState == 4) {
			var flag = htmlreq.responseText;
			if (flag == "-1" || flag == "-2") {
				document.getElementById("erEmail").innerHTML = "User Id already Existed";
				document.getElementById("erEmail").style.display = "red";
				document.getElementById("mail").value = "";
			}
		}
	}
	htmlreq.open("GET", "http://localhost:8080/Course_Management/Checkuser?username=" + username + " &user=" + signupUser);
	htmlreq.send();
}



function checkPassword() {
	let count = 0;

	let password = document.getElementById("password").value;
	let passwordStrength = document.getElementById("erSignupPassword");

	if (password.length == 0 || password.includes("%")) {
		passwordStrength.innerHTML = "Please enter the password";
		passwordStrength.style.color = "red";
	}
	if (/[a-z]+/.test(password))
		count += 1;
	if (/[A-Z]+/.test(password))
		count += 1;
	if (/(@|_)+/.test(password))
		count += 1;
	if (password.length > 8)
		count += 1;
	switch (count) {
		case 1:
			passwordStrength.innerHTML = "BAD"
			passwordStrength.style.color = "red";
			break;
		case 2:
			passwordStrength.innerHTML = "Week"
			passwordStrength.style.color = "orange";
			break;
		case 3:
			passwordStrength.innerHTML = "Medium";
			passwordStrength.style.color = "yellow";
			break;
		case 4:
			passwordStrength.innerHTML = "Strong";
			passwordStrength.style.color = "green";
			break;
	}
}

document.getElementById("mail").addEventListener('input', function() {
	document.getElementById("erEmail").innerHTML = "";
});

document.getElementById("experience").addEventListener('input', function() {
	document.getElementById("erExperience").innerHTML = "";
});

document.getElementById("name").addEventListener('input', function() {
	document.getElementById("erName").innerHTML = "";
});

document.getElementById("dob").addEventListener('input', function() {
	document.getElementById("erDate").innerHTML = "";
});

document.getElementById("phoneno").addEventListener('input', function() {
	document.getElementById("erPhone").innerHTML = "";
});

document.getElementById("qualification").addEventListener('input', function() {
	document.getElementById("erQualification").innerHTML = "";
});


function addStudent() {
	let username = document.getElementById("mail").value;
	username = username.toLowerCase();
	let password = document.getElementById("password").value;
	let name = document.getElementById("name").value;
	let dob = document.getElementById("dob").value;
	let phoneNo = document.getElementById("phoneno").value;
	let qualification = document.getElementById("qualification").value;
	let experience;
	let flag = true;

	if (signupUser == "" || signupUser == null) {
		document.getElementById("erChooseOption").innerHTML = "Please select a option";
		flag = false;
	}
	if (username.length == 0 || username == undefined) {
		document.getElementById("erEmail").innerHTML = "Please enter a email";
		flag = false;
	}
	if (password.length <= 8 || password == undefined || password.includes("%")) {
		document.getElementById("erSignupPassword").innerHTML = "Please enter a valid password";
		flag = false;
	}
	if (name.length < 2 || name == undefined) {
		document.getElementById("erName").innerHTML = "Please enter a name";
		flag = false;
	}
	if (dob.length == 0 || dob == undefined) {
		document.getElementById("erDate").innerHTML = "Please select dob";
		flag = false;
	}
	if (phoneNo.length != 10) {
		document.getElementById("erPhone").innerHTML = "Please enter a Valid phoneNo";
		flag = false;
	}
	if (qualification.length == 0 || qualification == undefined) {
		document.getElementById("erQualification").innerHTML = "Please enter a qualification";
		flag = false;
	}
	if (signupUser == "staff") {
		experience = document.getElementById("experience").value;
		if (experience == undefined || experience == "") {
			document.getElementById("erExperience").innerHTML = "Please Enter your Experience"
		}
	}
	if (!flag) {
		return;
	}

	if (signupUser == "student") {
		let addStudent = {
			"newUser": "student",
			"mail": username,
			"password": password,
			"name": name,
			"dob": dob,
			"phoneno": phoneNo,
			"qualify": qualification
		}
		const json = JSON.stringify(addStudent);
		console.log(addStudent);
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				let value = http.responseText;
				document.getElementsByClassName("studentSubmitSignup").style.display = "none";
				if (value == "1")
					swal("Registered Succesfully", "success");
				else
					swal("Unable to Register", "error");
			}
		}
		http.open("POST", "http://localhost:8080/Course_Management/AddStudent", true);
		http.setRequestHeader("Content-Type", "application/json");
		http.setRequestHeader("Accept", "application/json");
		http.send(json);
	}
	else {
		let addStaff = {
			"user": "staff",
			"mail": username,
			"password": password,
			"name": name,
			"dob": dob,
			"phoneNo": phoneNo,
			"qualification": qualification,
			"experience": experience
		}
		const json = JSON.stringify(addStaff);
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				let result = http.responseText;
				document.getElementsByClassName("studentSubmitSignup").style.display = "none";
				if (result == "1")
					swal("Registered Succesfully", "success");
				else
					swal("Unable to Register", "error");
			}
		}
		http.open("POST", "http://localhost:8080/Course_Management/AddStaff", true);
		http.setRequestHeader("Content-Type", "application/json");
		http.setRequestHeader("Accept", "application/json");
		http.send(json);
	}
}
/* -------------------------------------------------------------------------------- */
/* ----------------------------------------ABOUT CONTENT-------------------------------*/

document.getElementById("about-content").addEventListener('click', function() {
	document.getElementById("containers").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "block";
	document.getElementById("showMyProfile").style.display = "none";
	document.getElementById("PostAssignment").style.display = "none";

});
/* -----------------------------------------------------------------------------------*/
/* ==================================HOME =========================================== */
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); 
}


document.getElementById("home-content").addEventListener('click', function() {
	document.getElementById("showMyProfile").style.display = "none";
	document.getElementById("PostAssignment").style.display = "none";
	document.getElementById("containers").style.display = "none";
	document.getElementById("about").style.display = "none";
	show();
	document.getElementById("home").style.display = "block";
});

var show = function() {
	jSuites.loading.show();
	setTimeout(function() {
		jSuites.loading.hide();
	}, 200);
}
/* -==================================================================================*/
/* ====================================SHOW COURSES=========================================*/

var allCourseDetails;
var certificateCourseId;
document.getElementById("show-courses").addEventListener('click', function() {

	showCourses();
});

function showCourses() {
	let httpreq = new XMLHttpRequest();
	httpreq.onreadystatechange = function() {
		if (httpreq.readyState == 4) {
			const courseDetail = httpreq.responseText;
			printCourseDetail(courseDetail);
		}
	}
	httpreq.open("GET", "http://localhost:8080/Course_Management/GetCourseDetail");
	httpreq.send();
}

function printCourseDetail(courseDetailValues) {
	document.getElementById("showMyProfile").style.display = "none";
	document.getElementById("PostAssignment").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("containers").style.display = "grid";
	document.getElementById("containers").innerHTML = "";
	let courseDetail = JSON.parse(courseDetailValues);
	this.allCourseDetails = courseDetail;
	sessionStorage.setItem("courseJson", JSON.stringify(courseDetail));
	for (let i in courseDetail) {
		document.getElementById("containers").appendChild(document.createElement("br"));
		var box = document.createElement("div");
		box.setAttribute('class', 'box')
		box.setAttribute('value', courseDetail[i]['courseid']);
		var heading = document.createElement("h2");
		heading.appendChild(document.createTextNode(courseDetail[i]['name']));
		box.appendChild(heading)
		box.appendChild(document.createElement("br"));
		var durationTag = document.createElement("span")
		durationTag.appendChild(document.createTextNode("Staff: " + courseDetail[i]['staff']))
		box.appendChild(durationTag)
		box.setAttribute('onclick', "showCourseDetails(" + i + ")");
		box.appendChild(document.createElement("br"));
		box.appendChild(document.createTextNode("weeks: " + courseDetail[i]['duration']));
		document.getElementById("containers").appendChild(box);
	}
}

function showCourseDetails(keyValue) {
	sessionStorage.setItem("courseId", keyValue);
	let courseDetail = this.allCourseDetails;
	console.log(courseDetail);
	let value = "" + keyValue;
	this.certificateCourseId = keyValue;
	let showCourses = document.getElementById("showCourse-details");

	document.getElementById("containers").style.display = "none";
	document.getElementById("view-course").style.display = "block";
	showCourses.innerHTML = "";

	let heading = document.createElement("h1")
	heading.setAttribute("id", "course-heading");
	heading.innerHTML = courseDetail[value]['name'];
	showCourses.appendChild(heading);

	
	let isStaff;
	isRegister(courseDetail[value]['courseid'], courseDetail[value]['staffId']).then(function(result) {
		isStaff = result;
		if (result == "-1") {
			let register = document.createElement("button");
			register.setAttribute('id', 'register-course');
			register.setAttribute("class", "course-button");
			register.setAttribute("onclick", "register(" + courseDetail[value]['courseid'] + ")");
			register.innerHTML = "Register";
			document.getElementById("showCourse-details").appendChild(register);
			showCourses.appendChild(document.createElement("br"));
			showCourses.appendChild(document.createElement("br"));
			
		}
	});
	
	getModules(courseDetail[value]['courseid']).then(function(result) {
		var modules = JSON.parse(result);
		console.log(modules);
		for (var i in modules) {
			var modulesDiv = document.createElement("div");
			modulesDiv.setAttribute("id", "modulesDiv" + i);
			modulesDiv.setAttribute("class", "modulesDiv");

			var weekHeading = document.createElement("h4");
			weekHeading.setAttribute("id", "week" + modules[i]['weeks']);
			weekHeading.appendChild(document.createTextNode("Module " + modules[i]['weeks']));
			modulesDiv.appendChild(weekHeading);

			var modulesHeading = document.createElement("h4");
			modulesHeading.setAttribute("id", "modulesHeading" + i);
			modulesHeading.setAttribute("class", "modulesHeading");
			modulesHeading.appendChild(document.createTextNode(modules[i]['module']));
			modulesDiv.appendChild(modulesHeading);
			

			var vedioLink = document.createElement("button");
			vedioLink.setAttribute("onclick", "showVedioLink(" + modules[i]['courseid'] + "," + modules[i]['weeks'] + ")");
			vedioLink.innerHTML = "Vedio";
			modulesDiv.appendChild(vedioLink);
			showCourses.appendChild(modulesDiv);
			
		}

		showCourses.appendChild(document.createElement('br'));
		showCourses.appendChild(document.createElement('br'));
		
	});


	let staffName = document.createElement("h2");
	staffName.setAttribute("id", "staffName");
	staffName.appendChild(document.createTextNode("Staff Name: " + courseDetail[value]['staff']));
	showCourses.appendChild(staffName);

	let weeks = document.createElement("h4");
	weeks.setAttribute("id", "numberOfWeeks");
	weeks.appendChild(document.createTextNode("Total Weeks: " + courseDetail[value]['duration']));
	showCourses.appendChild(weeks);


	var readingMaterial = document.createElement("button");
	readingMaterial.setAttribute("class", "showReading");
	readingMaterial.setAttribute("class", "course-button");
	readingMaterial.setAttribute("onclick", "getReadingMaterial(" + courseDetail[value]['courseid'] + ")");
	readingMaterial.innerHTML = "ReadingMaterial";
	showCourses.appendChild(readingMaterial);
	
	if (isStaff != "1") {
			var quiz = document.createElement("button");
			quiz.setAttribute("id", courseDetail[value]['courseid']);
			quiz.setAttribute("class","course-button");
			quiz.setAttribute("onclick", "getQuizQuestions(" + courseDetail[value]['courseid'] + ")");
			quiz.innerHTML = "Take Quiz";
		showCourses.appendChild(quiz);
	}
}


function isRegister(courseid, staffId) {
	let courseId = courseid;
	console.log(courseid);
	var promise = new Promise(function(resolve, reject) {// study
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				resolve(xhr.responseText);
			}
		}
		xhr.open("GET", "http://localhost:8080/Course_Management/IsRegister?courseId=" + courseId + "&staffId=" + staffId);
		xhr.send();
	});
	return promise;
}

function getModules(courseid) {
	var promise = new Promise(function(resolve, reject) {
		var http = new XMLHttpRequest();
		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				resolve(http.responseText);
			}
		}
		http.open("GET", "http://localhost:8080/Course_Management/GetModules?courseid=" + courseid);
		http.send();
	});
	return promise;
}

function goBack() {
	document.getElementById("view-course").style.display = "none";
	document.getElementById("containers").style.display = "grid";
	document.getElementById("showCourse-details").style.display = "block";
	document.getElementById("quizQuestion").style.display = "none";
}


function register(courseid) {
	console.log(courseid + " register course");
	let httpreq = new XMLHttpRequest();
	httpreq.onreadystatechange = function() {
		if (httpreq.readyState == 4) {
			var response = httpreq.responseText;
			if (response == -1) {
				swal("Warning", "Please Login to Regiseter a course", "warning");
			}
			else if (response == -2) {
				swal("Error", "Already Registered", "error");
			}
			else if (response == 1) {
				swal("Register Succesfully", "success");
			}
			else {
				swal("Error", "unable to register", "error");
			}
		}
	}
	httpreq.open("GET", "http://localhost:8080/Course_Management/RegisterCourse?courseid=" + courseid);
	httpreq.send();
}


function getReadingMaterial(courseid) {
	console.log(courseid);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			result = xhr.responseText;
			if (result == "-1") {
				swal("Error", "please sign in to view Reading materials", "error");
			} else {
				window.open(result, "_blank");
			}
		}
	}
	xhr.open("GET", "http://localhost:8080/Course_Management/ReadingMaterial?courseId=" + courseid);
	xhr.send();
}

function showVedioLink(courseid, week) {
	let httpreq = new XMLHttpRequest();
	httpreq.onreadystatechange = function() {
		if (httpreq.readyState == 4) {
			let result = httpreq.responseText;
			if (result == "-1")
				swal("Error", "Please Login to view the vedio", "error");
			else if (result == "-2")
				swal("Error", "Please Register course to view the vedio", "error");
			else if (result >0) {
				swal("Error", "Vedio will Open in "+result+"  days","error");
			}
			else
				window.open(result, "", 'width=400,height=400,top=200px,left=100px,display=absolute');
		}
	}
	httpreq.open("GET", "http://localhost:8080/Course_Management/GetVedioLink?courseid=" + courseid + "&week=" + week);
	httpreq.send();

}
/* ==================================MY COURSE ==================================*/
function getMyCourse() {
	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			let result = http.responseText;
			console.log(result);
			printCourseDetail(result);
		}
	}
	http.open("GET", "http://localhost:8080/Course_Management/GetMyCourse");
	http.send();
}



/* ================================= MY PROFILE=========================*/


document.getElementById("myProfile").addEventListener('click', function() {
	document.getElementById("containers").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("PostAssignment").style.display = "none";
	document.getElementById("showMyProfile").style.display = "block";

	showMyProfile();
});

document.getElementById("staffProfile").addEventListener('click', function() {
	document.getElementById("containers").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("PostAssignment").style.display = "none";
	document.getElementById("showMyProfile").style.display = "block";
	showMyProfile();
});


function showMyProfile() {
	let http = new XMLHttpRequest();
	let myProfileDiv = document.getElementById("showMyProfile");
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			var result = http.responseText;
			var myProfile = JSON.parse(result);
			console.log(myProfile);
			/*let myProfileHeading = document.createElement("h2");
			myProfileHeading.appendChild(document.createTextNode("My Profile"));
			myProfileDiv.appendChild(myProfileHeading);*/

			document.getElementById("myName").innerHTML=myProfile['name'];
			document.getElementById("myMailId").innerHTML=myProfile['mail'];
			document.getElementById("myDob").innerHTML="DOB :"+ myProfile['dob'];
			document.getElementById("myNo").innerHTML="Phone no:"+myProfile['phoneNo'];
			document.getElementById("myQualification").innerHTML="Qualification : "+myProfile['qualification'];
			if (myProfile['option'] == "staff") {
				document.getElementById("myExperience").innerHTML="Experience : "+myProfile['experience'];
			}
			
			/*let label1 = document.createElement("label");
			label1.setAttribute("class", "myProfileLabel");
			label1.appendChild(document.createTextNode("Name :" + myProfile['name']));
			myProfileDiv.appendChild(label1);
			myProfileDiv.appendChild(document.createElement("br"));

			let label2 = document.createElement("label");
			label2.setAttribute("class", "myProfileLabel");
			label2.appendChild(document.createTextNode("Mail Id :" + myProfile['mail']));
			myProfileDiv.appendChild(label2);
			myProfileDiv.appendChild(document.createElement("br"));

			let label3 = document.createElement("label");
			label3.setAttribute("class", "myProfileLabel");
			label3.appendChild(document.createTextNode("Date-Of-Birth :" + myProfile['dob']));
			myProfileDiv.appendChild(label3);
			myProfileDiv.appendChild(document.createElement("br"));

			let label4 = document.createElement("label");
			label4.setAttribute("class", "myProfileLabel");
			label4.appendChild(document.createTextNode("Phone Number: " + myProfile['phoneNo']));
			myProfileDiv.appendChild(label4);
			myProfileDiv.appendChild(document.createElement("br"));

			if (myProfile['option'] == "staff") {
				let label5 = document.createElement("label");
				label5.setAttribute("class", "myProfileLabel");
				label5.appendChild(document.createTextNode("Experience (In years) :" + myProfile['experience']));
				myProfileDiv.appendChild(label5);
				myProfileDiv.appendChild(document.createElement("br"));
			}

			let label6 = document.createElement("label");
			label6.setAttribute("class", "myProfileLabel");
			label6.appendChild(document.createTextNode("Qualification : " + myProfile['qualification']));
			myProfileDiv.appendChild(label6);
			myProfileDiv.appendChild(document.createElement("br"));*/
			
			
		}
	}
	http.open("GET", "http://localhost:8080/Course_Management/ShowMyProfile");
	http.send();
}
/*=========================================================================================*/
/*--------------------------QUIZ QUESTIONS----------------------------------------------*/
var pageCount = 0;
var radios = document.getElementsByName("choice");
var mark = 0;
var questionAnswer;
var courseid;


function getQuizQuestions(courseid) {
	this.courseid = courseid;
	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			let result = http.responseText;
			if (result == "-1") {
				swal("Error", "Please Login to Attend Quiz", "error");
			}
			else if (result == "-2") {
				swal("Error", "Please Register to Attend Quiz", "error")
			}
			else {
				questionAnswer = JSON.parse(result);
				console.log(JSON.parse(result));
				document.getElementById("showCourse-details").style.display = "none";
				document.getElementById("quizQuestion").style.display = "block";
				test(0);
				//test(0,JSON.parse(result));
			}
		}
	}
	http.open("GET", "http://localhost:8080/Course_Management/GetQuiz?courseid=" + courseid);
	http.send();
}

/*-----------------------------------------------------------*/


function test(pageCount) {
	let questionNumber = pageCount;
	console.log(questionAnswer);
	let questionAnswerJson = this.questionAnswer;
	let question = questionAnswerJson["" + questionNumber]['question'];
	let optionsDiv = document.getElementById("Options");
	document.getElementById("Question").innerHTML = question;
	optionsDiv.innerHTML = '';
	// Loop through the fruit array and create a radio button for each option
	for (var i = 0; i < questionAnswerJson[questionNumber]['option'].length; i++) {
		// Create a label element for the option
		var label = document.createElement("div");
		// Create the radio button element
		var radio = document.createElement("input");
		label.setAttribute('id', questionAnswerJson[questionNumber]['option'][i]);
		label.setAttribute("class", "OptionsDiv");
		radio.type = "radio";
		radio.name = "choice";
		radio.value = questionAnswerJson[questionNumber]['option'][i];
		label.appendChild(radio);
		label.appendChild(document.createTextNode(questionAnswerJson[questionNumber]['option'][i]));
		optionsDiv.appendChild(label);
		optionsDiv.appendChild(document.createElement("br"));
	}
	if (pageCount == Object.keys(questionAnswerJson).length - 1) {
		document.getElementById("nextSubmit").style.display = "block";

		/*document.getElementsByClassName("quiz-submit").style.display="block";*/

		document.getElementById("nextQuestion").style.display = "none";
	}
}

console.log(radios.checked);
var next = document.getElementsByClassName('.next');
function handleClickNext() {
	document.getElementById("Options").style.backgroundColor = "white";
	if (pageCount < 4 && pageCount >= 0) {
		answerCheck();
		pageCount = pageCount + 1;
		test(pageCount);
		console.log("pagee count Next ", pageCount);
	} else {
		alert("your marks is-->" + mark);
	}
}

function answerCheck() {
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			if (radios[i].value == questionAnswer[pageCount]['answer']) {
				console.log("Excellent...")
				mark++;
				document.getElementById(questionAnswer[pageCount]['answer']).style.backgroundColor = "green";
			} else {
				console.log("Failed...")
				document.getElementById(radios[i].value).style.backgroundColor = "red";
			}
		}
	}
}

var marks;
var closeCertificate;

function submitQuiz() {
	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			console.log(http.responseText);
			let result = http.responseText;
			marks = result;
			sessionStorage.setItem("marks", result);
			sessionStorage.setItem("cer_name", pName);
			if (parseFloat(result) > 60) {
				//window.open("./Home/certificate.html");
				//sessionStorage.setItem("closeTab",closeCertificate);
				window.location.href = "./Home/certificate.html";
			}
		}
	}
	http.open("GET", "http://localhost:8080/Course_Management/QuizScore?courseid=" + this.courseid.toString() + "&mark=" + this.mark.toString() + "&totalQuestion=" + (Object.keys(this.questionAnswer).length).toString());
	http.send();
}

function downloadCertificate() {
	const certificate = document.getElementById("certificate");
	html2pdf().from(certificate).save();
	setTimeout(function() {
		location.replace("../Login.html");
	}, 1000);


}

function getCertificate() {
	var nameBtag = document.createElement("b");
	nameBtag.appendChild(document.createTextNode(sessionStorage.getItem("cer_name").toUpperCase()));
	document.getElementById("cer-name").appendChild(nameBtag);
	document.getElementById("cer-course").innerHTML = JSON.parse(sessionStorage.getItem("courseJson"))[sessionStorage.getItem('courseId')]['name'];;
	document.getElementById("totalPercent").innerHTML = sessionStorage.getItem("marks") + "%";
	let date = new Date().toUTCString().slice(5, 16);
	document.getElementById("cer-date").innerHTML = date;

}



/*------------------------- ASSIGNMENT ------------------------------------*/

document.getElementById("Assignment").addEventListener('click', function() {
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("showMyProfile").style.display = "none";
	document.getElementById("PostAssignment").style.display = "block";
	getStaffCourseDetail();
});

function getStaffCourseDetail() {
	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			console.log(http.responseText);
			let result = http.responseText;
			console.log(result);
			printStaffCourseDetail(result);
		}
	}
	http.open("GET", "http://localhost:8080/Course_Management/GetStaffCourseDetail");
	http.send();
}

function printStaffCourseDetail(courseDetailValues) {
	document.getElementById("AssignmentDiv").style.display = "none";
	document.getElementById("showMyProfile").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("containers").style.display = "grid";
	document.getElementById("containers").innerHTML = "";
	let courseDetail = JSON.parse(courseDetailValues);
	this.allCourseDetails = courseDetail;
	document.getElementById("PostAssignment").innerHTML = "";
	for (let i in courseDetail) {
		var box = document.createElement("div");
		box.setAttribute('class', 'box')
		box.setAttribute('value', courseDetail[i]['courseid']);
		var heading = document.createElement("h1");
		heading.appendChild(document.createTextNode(courseDetail[i]['name']));
		box.appendChild(heading)
		box.appendChild(document.createElement("br"));
		var showCourseDetails = document.createElement("button");
		showCourseDetails.setAttribute('onclick', "showCourseDetails(" + i + ")");
		showCourseDetails.innerHTML = "Show Course";
		box.appendChild(showCourseDetails);
		var postAssignment = document.createElement("button");
		postAssignment.setAttribute("onclick", "postAssignment()");
		postAssignment.innerHTML = "PostAssignment";
		box.appendChild(postAssignment);
		var assignmentHistory = document.createElement("button");
		assignmentHistory.setAttribute('onclick', "postAssignment()");
		assignmentHistory.innerHTML = "assignment History";
		box.appendChild(assignmentHistory);

		document.getElementById("PostAssignment").appendChild(box);
	}
}
function postAssignment() {
	document.getElementById("PostAssignment").style.display = "none";
	document.getElementById("AssignmentDiv").style.display = "block";
	document.getElementById("getQuestion").style.display = "none";
	let box = document.querySelector("#AssignmentDiv");
}
function getTotalQuestion() {
	let assignmentTopic = document.getElementById("assignmentTopic").value;

	console.log(assignmentTopic);

	if (assignmentTopic == null || assignmentTopic == "" || assignmentTopic == undefined) {
		swal("Please Enter assignment topic");
		document.getElementById("assignmentTopic").value = "";
		return;
	}
	document.getElementById("getNumberOfQuestion").style.display = "none";
	document.getElementById("getQuestion").style.display = "block";
	document.getElementById("submitAssignment").style.display = "none";
}
var questionNo=0;
var jsonQuestion;
function storeCurrentQuestion() {
	let question = document.getElementById("Question").value;
	let option1 = document.getElementById("option1").value;
	let option2 = document.getElementById("option2").value;
	let option3 = document.getElementById("option3").value;
	let option4 = document.getElementById("option4").value;
	let answer = document.getElementById("answer").value;
	if (question == "" || question == null) {

	}
	else if (option1 == "" || option1 == null) {

	}
	else if (option2 == "" || option2 == null) {

	} else if (option3 == "" || option3 == null) {

	} else if (option4 == "" || option4 == null) {

	} else if (answer == "" || answer == null) {

	}
	
}

