
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

//////SLIDER///////////////


var swiper = new Swiper('.swiper-container', {
	autoHeight: true,
	loop: true,
	spaceBetween: 700,
	simulateTouch: true,
	speed: 1000,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true,
	},
});



//////SLIDER///////////////


//////action///////////////
let sliderBtn = document.querySelector('.slider-inner__btn');
let phone = document.querySelector('.phone__container');

sliderBtn.onclick = function () {
	phone.classList.toggle('active');

}


let inv = document.querySelector('.video__btn-item-inv');
let exp = document.querySelector('.video__btn-item-exp');

let invInner = document.querySelector('.inner-video-inv');
let expInner = document.querySelector('.inner-video-exp');

inv.onclick = function () {
	invInner.classList.remove('hide');
	expInner.classList.remove('active');

}

exp.onclick = function () {
	invInner.classList.add('hide');
	expInner.classList.add('active');

}




var element = document.getElementById('phone-mask-1');
var element2 = document.getElementById('phone-mask-2');

var maskOptions = {
	mask: '+{7}(000)000-00-00'
};

var maskOptions2 = {
	mask: '+{7}(000)000-00-00'
};


IMask(element, maskOptions2);
IMask(element2, maskOptions);









//////action///////////////


//////LINK///////////////

const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const blockID = anchor.getAttribute('href')

		document.querySelector(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}



//////LINK///////////////








//////GSAP+Locomotiv///////////////
const locoScroll = new LocomotiveScroll({
	el: document.querySelector(".scrollContainer"),
	smooth: true
});



// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)



locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".scrollContainer", {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	}, // we don't have to define a scrollLeft because we're only scrolling vertically.
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
	pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".header",   // pin the trigger element while active
		scroller: ".scrollContainer",
	}
});


if (window.innerWidth > 737) {
	tl.from(".header__rocket", { duration: 2.3, ease: "power4.out", opacity: 0, y: 650 }, "+=0.5")
		.from(".header__sand", { duration: 2.3, ease: "power4.out", opacity: 0, }, "-=2")
		.from(".header__circle", { duration: 2.3, rotation: 280, ease: "power4.out", opacity: 0, }, "-=1.6")
		.from(".bottom-header__min", { duration: 1.3, ease: "power4.out", opacity: 0, x: -250 }, "-=0.4")
		.from(".bottom-header__title", { duration: 1.45, ease: "power4.out", opacity: 0, x: -250 }, "-=0.8")
		.from(".bottom-header__text", { duration: 1.3, ease: "power4.out", opacity: 0, x: -250 }, "-=0.8")
		.from(".bottom-header__btn", { duration: 1.3, ease: "power4.out", opacity: 0, x: -250 }, "-=0.8")
} else {
	tl.from(".bottom-header__min", { duration: 1.5, ease: "power4.out", opacity: 0, x: -250 }, "+=0.5")
		.from(".bottom-header__title", { duration: 1.3, ease: "power4.out", opacity: 0, x: -250 }, "-=0.8")
		.from(".bottom-header__text", { duration: 1.3, ease: "power4.out", opacity: 0, x: -250 }, "-=0.8")
		.from(".bottom-header__btn", { duration: 1.3, ease: "power4.out", opacity: 0, x: -250 }, "-=0.8")
}

let tl1 = gsap.timeline({
	scrollTrigger: {
		trigger: ".slider",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",
	}
});

tl1.from(".slider__title", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")




// let tl2 = gsap.timeline({
// 	scrollTrigger: {
// 		trigger: ".phone",   // pin the trigger element while active
// 		scroller: ".scrollContainer",
// 		start: "top center",
// 	}
// });

// tl2.from(".phone__bg-app", { duration: 1.3, ease: "power4.out", opacity: 0, y: 100 }, "-=.3")
// 	.from(".phone__title", { duration: 1.3, ease: "power4.out", opacity: 0, y: -50 }, "-=.6")



let tl3 = gsap.timeline({
	scrollTrigger: {
		trigger: ".video__title",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center"
	}
});

tl3.from(".video__title", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")


let tl5 = gsap.timeline({
	scrollTrigger: {
		trigger: ".after",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",
	}
});


if (window.innerWidth > 737) {

	tl5.from(".after__title ", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 },)
		.from(".inner-after__item-group-1", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-group-2", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-group-3", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-group-4", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
} else {
	tl5.from(".after__title ", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 },)
		.from(".inner-after__item-1", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-2", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-3", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-4", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-5", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-6", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-7", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-8", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-9", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
		.from(".inner-after__item-10", { duration: 0.7, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
}






let tl6 = gsap.timeline({
	scrollTrigger: {
		trigger: ".author",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",
	}
});


tl6.from(".author__title-first", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")
	.from(".text-author__item-1", { duration: 1, ease: "power4.out", opacity: 0, x: 150 }, "-=.6")
	.from(".text-author__item-2", { duration: 1, ease: "power4.out", opacity: 0, x: 150 }, "-=.6")
	.from(".text-author__item-3", { duration: 1, ease: "power4.out", opacity: 0, x: 150 }, "-=.6")


let tl7 = gsap.timeline({
	scrollTrigger: {
		trigger: ".author__time ",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});

tl7.from(".author__title-second ", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")



let tl8 = gsap.timeline({
	scrollTrigger: {
		trigger: ".invest",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});





tl8.from(".invest__title", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.3")


let tl9 = gsap.timeline({
	scrollTrigger: {
		trigger: ".wrap-invest__item-1",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});

tl9.from(".wrap-invest__box-1", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "+=.1")
	.from(".wrap-invest__title-1", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")
	.from(".wrap-invest__text-1", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")



let tl10 = gsap.timeline({
	scrollTrigger: {
		trigger: ".wrap-invest__item-2",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});

tl10.from(".wrap-invest__box-2", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "+=.1")
	.from(".wrap-invest__title-2", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")
	.from(".wrap-invest__text-2", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")






let tl11 = gsap.timeline({
	scrollTrigger: {
		trigger: ".wrap-invest__item-3",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});

tl11.from(".wrap-invest__box-3", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "+=.1")
	.from(".wrap-invest__title-3", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")
	.from(".wrap-invest__text-3", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")






let tl12 = gsap.timeline({
	scrollTrigger: {
		trigger: ".wrap-invest__item-4",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});

tl12.from(".wrap-invest__box-4", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "+=.1")
	.from(".wrap-invest__title-4", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")
	.from(".wrap-invest__text-4", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 }, "-=.4")




let tl13 = gsap.timeline({
	scrollTrigger: {
		trigger: ".access",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",

	}
});

tl13.from(".access__title", { duration: 1.3, ease: "power4.out", opacity: 0, y: 50 })





let iv1 = gsap.timeline({
	scrollTrigger: {
		trigger: ".inner-video__item-1",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",


	}
});
iv1.from(".inner-video__dop-1", { duration: 1.3, ease: "power4.out", opacity: 0, y: 100 })


let iv2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".inner-video__item-2",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",


	}
});
iv2.from(".inner-video__dop-2", { duration: 1.3, ease: "power4.out", opacity: 0, y: 100 })


let iv3 = gsap.timeline({
	scrollTrigger: {
		trigger: ".inner-video__item-3",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",


	}
});
iv3.from(".inner-video__dop-3", { duration: 1.3, ease: "power4.out", opacity: 0, y: 100 })


let iv4 = gsap.timeline({
	scrollTrigger: {
		trigger: ".inner-video__item-4",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",


	}
});
iv4.from(".inner-video__dop-4", { duration: 1.3, ease: "power4.out", opacity: 0, y: 100 })


let iv5 = gsap.timeline({
	scrollTrigger: {
		trigger: ".inner-video__item-5",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",


	}
});
iv5.from(".inner-video__dop-5", { duration: 1.3, ease: "power4.out", opacity: 0, y: 100 })



let accdop = gsap.timeline({
	scrollTrigger: {
		trigger: ".access__container",   // pin the trigger element while active
		scroller: ".scrollContainer",
		start: "top center",


	}
});
accdop.from(".access__dop-2", { duration: 2, ease: "elastic.out(1, 0.5)", opacity: 0, y: -150, }, "+=1.5")








/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


//////GSAP+Locomotiv///////////////












