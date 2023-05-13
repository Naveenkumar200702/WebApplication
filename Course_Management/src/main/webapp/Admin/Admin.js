
function findSession(){
	var user=sessionStorage.getItem('user');
	if(user=="admin"){
		adminMenu();
	}
}
var username = document.getElementById("loginusername");

username.addEventListener('blur', function() {
	let userName = document.getElementById("loginusername").value;
	if (userName.length > 0) {
		document.getElementById("erUsername").style.display = "none";
	} else {
		document.getElementById("erUsername").style.display = "block";
		document.getElementById("erUsername").innerHTML = "Please Enter Username";
	}
});

document.getElementById("loginpassword").addEventListener('blur', function() {
	let password = document.getElementById("loginpassword").value;
	if (password.length > 0) {
		document.getElementById("erPassword").style.display = "none";
	} else {
		document.getElementById("erPassword").style.display = "block";
		document.getElementById("erPassword").innerHTML = "Please Enter Password";
	}
});


function login() {
	let password = document.getElementById("loginpassword").value;
	let userName = document.getElementById("loginusername").value;
	userName = userName.trim();
	console.log(userName + "  " + password);
	var flag = 0;
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
		if (result == "1") {// Admin Login
			alert("login Succesfully");
			adminMenu();
			sessionStorage.setItem("user","admin");	
		}
		else {// invalid credentials
			alert("Invalid UserDetails");
		}
	});
}

function ajaxCall(url, requestMethod) {
	let username = document.getElementById("loginusername").value;
	let password = document.getElementById("loginpassword").value;
	console.log(username);
	console.log(password);
	username = username.trim();
	let choice = "Admin";
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



function adminMenu(){
	document.getElementById("staffRequestMenu").style.display="none";
	document.getElementById("LoginWindow").style.display="none";
	document.getElementById("adminMenu").style.display="block";
	
}


//-------------------------- STAFF REQUEST -------------------------
document.getElementById("staffRequest").addEventListener("click",function(){
	document.getElementById("adminMenu").style.display="none";
	document.getElementById("staffRequestMenu").style.display="block";
	let http=new hXMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
			
		}
	}
	http.open("GET", "http://localhost:8080/Course_Management/");
	http.send();
});

document.getElementById("goBack").addEventListener('click',function(){
	adminMenu();
});
