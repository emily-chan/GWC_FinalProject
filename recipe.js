$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
})

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
});

function doIt() { //outputs recipe data
	
	var output = $.ajax({
	url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	data: {
		ingredients:document.getElementById("mytext").value,
		number:5,
		ranking:2
	}, // Additional parameters here
	dataType: 'json',
	success: function(data) {
		//
		//Change data.source to data.something , where something is whichever part of the object you want returned.
		//To see the whole object you can output it to your browser console using:
		console.log(data);
		document.getElementById("output").innerHTML=""; //clears results from last search
		var i;
		for (i=0;i<data.length;i++){ //i is the i-th object in the data array that we get from the API
			var id = data[i]["id"];
			var para = document.createElement("p"); //creates a paragraph element
			var a = document.createElement("a");
			var node = document.createTextNode(data[i]["title"]); //creates text element
			a.innerHTML = data[i]["title"];
			a.href = data[i]["image"].replace("/recipeImages/", "/").replace(".jpg", "");
			a.target = "_blank";
		
			para.appendChild(a); //puts the text elem in the paragraph elem	
			var img = document.createElement('img'); //creates an image element
			img.src = data[i]["image"]; //sets image
			img.id = "image";
			var div = document.createElement('div'); //output is an empty div where we put all the recipe title/info
			div.className="divs";
			var innerdiv = document.createElement('div');
			innerdiv.id = 'recipe'+i;
			innerdiv.className = 'crop thumbnail';
			innerdiv.appendChild(img); //appends image element into div
			div.appendChild(para); //appends the paragraph element into the div
			div.appendChild(innerdiv);
			document.getElementById("output").appendChild(div);
		}},
	error: function(err) { alert(err); },
	beforeSend: function(xhr) {
	xhr.setRequestHeader("X-Mashape-Authorization", "XptQA26zqnmsh6mMAtakOfUkCHt4p1OWihUjsn47fsHxNZSBD8"); // Enter here your Mashape key
	}
});
}