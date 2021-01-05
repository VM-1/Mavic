	function testWebP(callback) {

var webP = new Image();
webP.onload = webP.onerror = function () {
callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

if (support == true) {
document.querySelector('body').classList.add('webp');
}else{
document.querySelector('body').classList.add('no-webp');
}
});
	let burgerMenu = document.querySelector(".header__burger");
const screenInner = document.querySelectorAll('.screen__inner');
if(burgerMenu){
	burgerMenu.addEventListener("click", function(){
		event.preventDefault()
		burgerMenu.classList.toggle('_active');
		screenInner.forEach(function(elem) {
			elem.classList.toggle('_hide');
		});
		document.querySelector(".header__nav").classList.toggle('_active');
		document.querySelector("body").classList.toggle('lock');
		document.querySelector("header").classList.toggle('_active');
	})
}
	class DynamicAdapt {
  constructor(type) {
    this.type = type;
  }

  init() {
    // массив объектов
    this.оbjects = [];
    this.daClassname = '_dynamic_adapt_';
    // массив DOM-элементов
    this.nodes = [...document.querySelectorAll('[data-da]')];

    // наполнение оbjects объктами
    this.nodes.forEach((node) => {
      const data = node.dataset.da.trim();
      const dataArray = data.split(',');
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    });

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = this.оbjects
      .map(({
        breakpoint
      }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = this.оbjects.filter(
        ({
          breakpoint
        }) => breakpoint === mediaBreakpoint
      );
      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    });
  }

  // Основная функция
  mediaHandler(matchMedia, оbjects) {
    if (matchMedia.matches) {
      оbjects.forEach((оbject) => {
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      });
    } else {
      оbjects.forEach(
        ({ parent, element, index }) => {
          if (element.classList.contains(this.daClassname)) {
            this.moveBack(parent, element, index);
          }
        }
      );
    }
  }

  // Функция перемещения
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
      return;
    }
    if (place === 'first') {
      destination.prepend(element);
      return;
    }
    destination.children[place].before(element);
  }

  // Функция возврата
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  // Функция получения индекса внутри родителя
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }
          return b.place - a.place;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  }
}
const da = new DynamicAdapt("max");  
da.init();
	const productionSwiper = new Swiper('.production-slider__inner', {
    wrapperClass: "production-slider__wrapper",
    slideClass: "production-slider__item",
    navigation: {
      nextEl: '.production-slider__next',
      prevEl: '.production-slider__prev',
    },
})

let wrapper = document.querySelector('.wrapper');

let mainSlider = new Swiper('.main', {
	wrapperClass: "main__wrapper",
	slideClass: "screen",
	direction: 'vertical',
	slidesPerView: 'auto',
	touchRatio: 0.1,
	keyboard: {
		enebled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	mousewheel: {
		sensitivity: 1,
	},
	watchOverflow: true,
	speed: 800,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	navigation: {
		nextEl: '.main__slider-btn',
	},
	init: false,
	on: {
		init: function () {
			setScrollType()
			wrapper.classList.add('_loaded');
			headerSlider();
		},
		resize: function () {
			setScrollType()
		},
		slideChange: function () {
			headerSliderRemove();
			if (mainSlider.realIndex >= 1) {
				headerLinks[mainSlider.realIndex - 1].classList.add('_active');
			}
		},
	},

})

let headerLinks = document.querySelectorAll('.header__link');


mainSlider.init();

function headerSlider() {
	if (headerLinks.length > 0) {
		if (mainSlider.realIndex >= 1) {
			headerLinks[mainSlider.realIndex - 1].classList.add('_active');
		}
		for (let i = 0; i < headerLinks.length; i++) {
			const headerLink = headerLinks[i];
			headerLink.addEventListener('click', function(e) {
				headerSliderRemove();
				mainSlider.slideTo(i + 1,800)
				e.preventDefault();
				headerLink.classList.add('_active');
			});
		}
	}
}
function headerSliderRemove() {
	let headerLinkActive = document.querySelector('.header__link._active');
	if (headerLinkActive) {
		headerLinkActive.classList.remove('_active');
	}
}


function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		mainSlider.params.freeMode = false;
	}
	for (let index = 0; index < mainSlider.slides.length; index++) {
		const pageSlide = mainSlider.slides[index];
		if (pageSlide) {
			const pageSlideHeight = pageSlide.offsetHeight;
			if (pageSlideHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				mainSlider.params.freeMode = true;
				break;
			}
		}
	}
}


function offset(el) {
	const rect = el.getBoundingClientRect(),
		scrollLetf = window.pageXoffSet || document.documentElement.scrollLetf,
		scrollTop = window.pageYoffSet || document.documentElement.scrollTop;
	return {top: rect.top + scrollTop, left: rect.left + scrollLetf }
}


	let questionsELem = document.querySelectorAll('.questions__item');
questionsELem.forEach(function(elem) {
	elem.addEventListener('click', function(e) {
		event.preventDefault();
		let questionsElemActive = this;
		let questionsText = questionsElemActive.querySelector('.questions__item-text');
		for (let i = 0; i <= questionsELem.length - 1; i++) {
			if(questionsELem[i].classList.contains('_active')) {
				if (questionsELem[i] !== questionsElemActive) {
					questionsELem[i].querySelector('.questions__item-text').style.maxHeight = null;
					questionsELem[i].classList.toggle('_active');
				}
			}
		}
		if (questionsText.style.maxHeight) {
			questionsText.style.maxHeight = null;
		}else {
			questionsText.style.maxHeight = questionsText.scrollHeight + "px";
		}
		questionsElemActive.classList.toggle('_active');
	});
});
