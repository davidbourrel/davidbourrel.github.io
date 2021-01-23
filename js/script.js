const MyAPP = function(){
	"use strict";
	/* /////////// CLICK BUTTONS \\\\\\\\\\\ */

	const hamburger = document.getElementById("hamburger");
	const navUL = document.getElementById("nav-ul");
	hamburger.addEventListener("click", function () {
		navUL.classList.toggle("show");
		hamburger.classList.toggle("show");
	});

	const deroulant = document.getElementById("deroulant");
	const dropdown = document.getElementById("dropdown-1");
	const chevron = document.querySelector("#deroulant .fa-chevron-down");
	deroulant.addEventListener("click", function (e) {
		e.preventDefault();
		dropdown.classList.toggle("show");
		if(window.matchMedia("(min-width: 950px)").matches){
			chevron.classList.add("fa-chevron-down");
			chevron.classList.remove("fa-chevron-up")
			dropdown.classList.remove('show');
		} else {
			chevron.classList.toggle("fa-chevron-up");
		};
	});

	const deroulant2 = document.getElementById("deroulant-2");
	const dropdown2 = document.getElementById("dropdown-2");
	const chevron2 = document.querySelector("#deroulant-2 .fa-chevron-down");
	deroulant2.addEventListener("click", function (e) {
		e.preventDefault();
		dropdown2.classList.toggle("show");
		if(window.matchMedia("(min-width: 950px)").matches){
			chevron2.classList.add("fa-chevron-down");
			chevron2.classList.remove("fa-chevron-up")
			dropdown2.classList.remove('show');
		} else {
			chevron2.classList.toggle("fa-chevron-up");
		};
	});



	/* ////////////// UP BUTTON \\\\\\\\\\\\\ */

	const upButton = document.createElement("div");
	const chevronUp = document.createElement("i");
	upButton.classList.add("upButton");
	chevronUp.classList.add("fas", "fa-chevron-up");
	upButton.append(chevronUp);
	document.body.append(upButton);

	window.addEventListener("scroll", function() {
		if (window.scrollY > 500) {
			upButton.style.cssText = "opacity: 0.8;";
			upButton.addEventListener('click', function() {
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			});
		} else {
			upButton.style.cssText = "opacity: 0;";
		};	
	});

	/* /////////////// ANIMATIONS \\\\\\\\\\\\\\\ */

	const threshold = .2;
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: threshold
	};

	const callbackLEFT = function(entries, observer) {
		entries.forEach(function(entry) {
			if(entry.intersectionRatio > threshold) {
				entry.target.classList.add("reveal-show-left");
				observer.unobserve(entry.target);
			};
		});
	};
	const callbackBOTTOM = function(entries, observer) {
		entries.forEach(function(entry) {
			if(entry.intersectionRatio > threshold) {
				entry.target.classList.add("reveal-show-bottom");
				observer.unobserve(entry.target);
			};
		});
	};

	const observerLEFT = new IntersectionObserver(callbackLEFT, options);
	document.querySelectorAll(".reveal-left").forEach(function(elements){ 
		observerLEFT.observe(elements);
	});
	const observerBOTTOM = new IntersectionObserver(callbackBOTTOM, options);
	document.querySelectorAll(".reveal-bottom").forEach(function(elements){ 
		observerBOTTOM.observe(elements);
	});


	/* //////////////// QUIZ \\\\\\\\\\\\\\\\\\\\\ */

	const form = document.querySelector(".quiz");
	const result = document.querySelector(".result");

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		let score = 0;
		const userAnswers = [
			form.q1.value,
			form.q2.value,
			form.q3.value,
			form.q4.value,
			form.q5.value,
			form.q6.value,
			form.q7.value,
			form.q8.value,
			form.q9.value,
			form.q10.value
		];

		let checks = document.querySelectorAll(".question-icon.fa-check");
		let crosses = document.querySelectorAll(".question-icon.fa-times");
		userAnswers.forEach((answer, index) => {
			if (answer.includes("right")) {
				score+=10;
				checks[index].classList.add("show");
				crosses[index].classList.remove("show");
			}else{
				crosses[index].classList.add("show");
				checks[index].classList.remove("show");
			};
		});
	
		let radioCustoms = document.querySelectorAll(".radio-custom");
		let radioCustomLabel = document.querySelectorAll(".radio-custom-label");
		radioCustoms.forEach((radioCustom, index) => {
			if (radioCustom.value.includes("right")){
				radioCustomLabel[index].style.cssText ="color:#046b26; font-weight: bold;";
			};
		});

		let submitButton = document.querySelector("#submit-btn");
		submitButton.style.cssText ="display: none";
		radioCustoms.forEach((radioCustom) => {
			radioCustom.disabled = true;
		});

		window.scrollTo({
			top: 450,
			behavior: "smooth"
		});
		
		result.classList.remove("d-none");

		let output = 0;
		const timer = setInterval(() => {
			result.querySelector("span").textContent = `${output}%`;
			if (output === score) {
				clearInterval(timer);
			} else {
				output++;
			}
		}, 15);

		let quizComment = document.getElementById("quiz-comment");	
		if(score <= 29) {
			quizComment.textContent = ("N'hésite pas à revoir les cours si besoin !");
		} else if (score >= 30 && score <= 49){
			quizComment.textContent = ("Continue t'es efforts !");
		} else if (score >= 50 && score <= 69){
			quizComment.textContent = ("Super ! Tu commence à bien comprendre le cours!");
		} else if (score >= 70 && score <= 99){
			quizComment.textContent = ("Bravo ! Très bon travail !");
		} else {
			quizComment.textContent = ("Parfait ! Tu as fais aucune faute !");
		};


		/* /////////////// QUIZ RESET \\\\\\\\\\\\\\\ */
		let resetButton = document.getElementById("resetButton");
		resetButton.addEventListener("click", function() {
			userAnswers.forEach((answer, index) => {
				score = 0;
				checks[index].classList.remove("show");
				crosses[index].classList.remove("show");
			});
			radioCustoms.forEach((radioCustom, index) => {
				if (radioCustom.value.includes("right")){
					radioCustomLabel[index].style.cssText ="color: rgba(20, 20, 20, 0.801); font-weight: inherit;";
				};
			});
			submitButton.style.cssText ="display: inline";
			radioCustoms.forEach((radioCustom) => {
				radioCustom.disabled = false;
				radioCustom.checked = false;
			});
			result.classList.add("d-none");
		});
	});
};
MyAPP();

