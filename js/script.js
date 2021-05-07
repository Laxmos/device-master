//// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const daa = new DynamicAdapt("max");
daa.init();;
"use strict";

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

    new Swiper('.slider__body',{
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        simulateTouch: false,

        loop: true,



       /* autoplay:{

            dalay: 8000,

            stopOnLastSlide: false,

            disableOnInteraction: false
        }, */

        speed: 1000,


    });

    new Swiper('.slider-photo__body',{
        thumbs:{

            swiper:{
                el: '.pagination-slider-photo__body',
                slidesPerView: 'auto',
                
            }
        }
    });

    
    
    let recommendationSlider = new Swiper('.recommendation__slider-body',{

        navigation:{
            nextEl: '.navigation-slide__next',
            prevEl: '.navigation-slide__prev'
        },

        slidesPerView: 3,
        watchOverflow: true,

        pagination: {
            el: '.recommendation__bullet',
            clickable: true,
        },

        breakpoints:{
            320:{
                slidesPerView: 1,
            },
            475:{
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1180:{
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        
        
    });

    let recommendationBullet = document.querySelector('.recommendation__bullet');
    if (recommendationBullet){
        let recommendationSliderPaginationBullets = recommendationSlider.pagination.bullets.length;
        if(recommendationSliderPaginationBullets < 2){
            recommendationBullet.classList.add('_hidden');
        } else if(recommendationSliderPaginationBullets >= 2){
            recommendationBullet.classList.remove('_hidden');
        }
    }





/*let search = document.querySelectorAll('.search__body');
let searchInput = document.querySelectorAll('.search__input-adaptive');

if (search.length > 0){
    for (let index = 0; index < search.length; index++){
        const searchActive = search[index];
        searchActive.addEventListener("click", function (e){
            searchInput.classList.toggle('_active');
        })
    }
}*/
const search = document.querySelector('.search__img-link');
if(search){
    const searchActive = document.querySelector('.search__input-adaptive');
    
    search.addEventListener("click", function (e){
        let checkSearch = searchActive.classList.contains('_active');
        if(checkSearch === false){
            searchActive.classList.add('_active');
        }
        if(checkSearch === true){
            searchActive.classList.remove('_active');
        }
    });
}

const menuIconOpen = document.querySelector('.menu-icon');
const adaptiveMenu = document.querySelector('.adaptive-menu__body');
const menuIconClose = document.querySelector('.adaptive-menu__close');

if(menuIconOpen){
    menuIconOpen.addEventListener("click", function (e){
        adaptiveMenu.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    });
}
if(menuIconClose){
    menuIconClose.addEventListener("click", function (e){
        adaptiveMenu.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    });
}
adaptiveMenu.addEventListener("click", function (e){
    if(!e.target.closest('.adaptive-menu__wrapper')){
        adaptiveMenu.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    }
});


const isMobile = {
    Android: function(){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function(){
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function(){
        return(
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
        
    }

};
if(isMobile.any()){
    document.body.classList.add('_touch');
}else{
    document.body.classList.add('_pc');
}

//=========================== ID
let money = document.querySelector('.money');
let products = document.querySelectorAll('.product');

if(products.length > 0){
    for (let index=0; index < products.length; index++){
        const product = products[index];
        product.innerText = "5";
    }
}

money.innerText = "10235";
//=========================== ID


//=========================== Услуги
let services = document.querySelector('.services__body');
let servicesTitleLink = document.querySelector('.services__title');
if(servicesTitleLink){
    servicesTitleLink.addEventListener("click", function (e){
        localStorage.id = 0;
    });
}
if (services){
    let mainServicesItem = services.querySelectorAll('.services__item')
    if (mainServicesItem.length > 0){
        for (let i=0; i < mainServicesItem.length; i++){
            const meinServicesItemId = mainServicesItem[i];
            meinServicesItemId.addEventListener("click", function (e){
                localStorage.id = i;
                document.location.href = "service.html";
            });
        }
    }
}
//=========================== Услуги

//=========================== Комплектующие 

let accessories = document.querySelectorAll('.accessories-list__item');

if (accessories.length > 0){
    function accessoriesWidthElement(){
        let ListAccessories = document.querySelector('.accessories-list').offsetWidth;
        if (ListAccessories > 768){
            for (let i = 0; i < accessories.length; i++){
                accessories[i].style.maxWidth = (ListAccessories - 20 * 4) / 4 + 'px';
            }
        }
        else if(ListAccessories <= 768 &&  ListAccessories > 604){
            for (let i = 0; i < accessories.length; i++){
                accessories[i].style.maxWidth = (ListAccessories - 20 * 3) / 3 + 'px';
            }
        }
        else if(ListAccessories <= 604 &&  ListAccessories > 395){
            for (let i = 0; i < accessories.length; i++){
                accessories[i].style.maxWidth = (ListAccessories - 20 * 2) / 2 + 'px';
            }
        }
        else if(ListAccessories <= 395){
            for (let i = 0; i < accessories.length; i++){
                accessories[i].style.maxWidth = (ListAccessories - 10 * 2) / 2 + 'px';
            }
        }
    }
    setInterval(accessoriesWidthElement, 100);
}



let _slideUp = (target, duration = 500) =>{
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden'; 
    target.style.height = 0;
    target.style.paddingTop = 0; 
    target.style.paddingBottom = 0; 
    target.style.marginTop = 0; 
    target.style.marginBottom = 0; 
    window.setTimeout(() => {
        target.style.display = 'none'; 
        target.style.removeProperty('height'); 
        target.style.removeProperty('padding-top'); 
        target.style.removeProperty('padding-bottom'); 
        target.style.removeProperty('margin-top'); 
        target.style.removeProperty('margin-bottom'); 
        target.style.removeProperty('overflow'); 
        target.style.removeProperty('transition-duration'); 
        target.style.removeProperty('transition-property'); 
        target.classList.remove( '_slide');
    }, duration); 
}

let _slideDown = (target, duration = 500) =>{
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') 
        display = 'block';

    target.style.display = display; 
    let height = target.offsetHeight; 
    target.style.overflow = 'hidden'; 
    target.style.height = 0; 
    target.style.paddingTop = 0; 
    target.style.paddingBottom = 0; 
    target.style.marginTop = 0; 
    target.style.marginBottom = 0; 
    target.offsetHeight; 
    target.style.transitionProperty = 'height, margin, padding'; 
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top'); 
    target.style.removeProperty('padding-bottom'); 
    target.style.removeProperty('margin-top'); 
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration'); 
        target.style.removeProperty('transition-property');
        target.classList.remove( '_slide');   
    }, duration);
}

let _slideToggle = (target, duration = 500) =>{
    if(!target.classList.contains('_slide')){
        target.classList.add('_slide');
        if (window.getComputedStyle(target).display === 'none'){
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
        
    }
};
let infoRecallText = document.querySelectorAll('.info-recall__text');
let infoRecallButton = document.querySelectorAll('.info-recall__button');


if(infoRecallText.length>0){
    for(let i=0; i < infoRecallText.length; i++){
        const infoRecallTextIdUser = infoRecallText[i];
        if(infoRecallTextIdUser.offsetHeight > 52){
            infoRecallText[i].classList.toggle('_adaptiv');
            infoRecallButton[i].classList.toggle('_adaptiv');

            infoRecallButton[i].addEventListener("click", function(e){
                infoRecallText[i].classList.toggle('_active');
                infoRecallButton[i].classList.toggle('_active');
            });
        }
    }
};
let contentListSubtitle = document.querySelectorAll('.content-list__subtitle');
let contentListText = document.querySelectorAll('.content-list__text');
let contentListItem = document.querySelectorAll('.content-list__item');


if(contentListSubtitle.length > 0){



    for(let i=0; i < contentListSubtitle.length; i++){
        const itemID = contentListSubtitle[i];
        //const zzz = contentListSubtitle[i].offsetHeight + 'px';
        //contentListItem[i].style.maxHeight = itemID.offsetHeight + 'px';

        itemID.addEventListener("click", function(e){
            contentListItem[i].classList.toggle('_active');
        });
    }
}
/*
if(contentListSubtitle.length > 0){
    for(let i=0; i < contentListSubtitle.length; i++){
        const itemID = contentListSubtitle[i];
        const heigthItemStart = contentListItem[i].offsetHeight;
        contentListItem[i].style.height = 'auto';
        const heigthItemEnd = contentListItem[i].offsetHeight;
        contentListItem[i].style.height = heigthItemStart + 'px';
        itemID.addEventListener("click", function(e){
            let actives = querySelector('._actives');
            actives.style.height = heigthItemEnd + 'px';
            contentListItem[i].classList.toggle('_actives');

        });
    }
}*/
;
let SIC = document.querySelector('.service-information__conteiner');
//let servicesItem = document.querySelectorAll('.services__item');
let serviceTable = document.querySelectorAll('.service-table');
let servicesTitle = document.querySelector('.service-information__title');
let memoryCheck = undefined;


if(SIC){
    let servicesItem = SIC.querySelectorAll('.services__item');
    if (servicesItem.length > 0){

        servicesItem[localStorage.id].classList.add('_check');
        serviceTable[localStorage.id].classList.add('_check');
        servicesTitle.innerHTML = servicesItem[localStorage.id].textContent;
        memoryCheck = localStorage.id;
        //delete localStorage.id;

        for (let i=0; i < servicesItem.length; i++){
            const servicesItemId = servicesItem[i];
            servicesItemId.addEventListener("click", function (e){
                
                //Таблицы
                if(serviceTable.length > 0){
                    if(memoryCheck >=0){
                        serviceTable[memoryCheck].classList.remove('_check');
                    }
                    serviceTable[i].classList.add('_check');
                }

                //Меню
                if(memoryCheck >=0){
                    servicesItem[memoryCheck].classList.remove('_check');
                }
                servicesItem[i].classList.add('_check');

                //Заголовок
                const titleservicesItem = servicesItem[i].textContent;
                if(servicesTitle){
                    servicesTitle.innerHTML = titleservicesItem;
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                localStorage.id = i;
                memoryCheck = i;
             });
        }
    }
}
;
let oryol = document.getElementById("button__oryol");
let maloarkhangelsk = document.getElementById("button__maloarkhangelsk");

let contactsContent = document.querySelector('.contacts__content');

if(oryol){
oryol.onclick = function(){
    let contactsElements = document.querySelectorAll('.column-info__text');
    let contactsTitle = document.querySelector('.column-info__title');
    let mapWrapper= document.querySelector('.column-map__wrapper');
    let picturesImg= document.querySelectorAll('.column-pictures__img');
    

    //alert(elements[0].children[0]);

    //======== Заголовок ========
    contactsTitle.innerHTML = "Контакты в Орле";
    //======== #Первая колонка# ========
    //======== Первый велемент ========
    //Подзаголовок
    contactsElements[0].children[0].innerHTML = "Контакты в Орле";
    //Телефон
    contactsElements[0].children[1].innerHTML = "+7 (920) 800-44-66";
    //======== Второй велемент ========
    //Ссылка
    contactsElements[1].children[0].href="oleg@petrushin.biz";
    //Текст
    contactsElements[1].children[0].innerHTML = "oleg@petrushin.biz";
    //======== Третий велемент ========
    //Текст
    contactsElements[2].innerHTML = "Работаем с понедельника по пятницу с 9.00 до 18.00  суббота, воскресенье – выходной.";
    //======== Четвертый велемент ========
    //Текст
    contactsElements[3].innerHTML = "г. Малоархангельск, ул. Калинина, д. 13, 3 этаж, СЦ \"Девайс-Мастер\"";
    //======== Пятый велемент ========
    //Ссылка
    contactsElements[4].children[0].href="vk.com/dev_mast";
    //Текст
    contactsElements[4].children[0].innerHTML = "vk.com/dev_mast";


    //======== #Вторая колонка# ========
    mapWrapper.innerHTML = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1201.6802631187134!2d36.0701520885959!3d52.9599285319261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41321a75ccea73bb%3A0x76cd4c2836125906!2z0JTQtdCy0LDQudGBINC80LDRgdGC0LXRgA!5e0!3m2!1sru!2sua!4v1618134276884!5m2!1sru!2sua\" width=\"100%\" height=\"400\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
  

    //======== #Третья колонка# ========
    picturesImg[0].innerHTML = "<img src=\"img/contacts/img_1.jpg\" alt=\"\">";
    picturesImg[1].innerHTML = "<img src=\"img/contacts/img_2.jpg\" alt=\"\">";
}
}

if(maloarkhangelsk){
maloarkhangelsk.onclick = function(){
    let contactsElements = document.querySelectorAll('.column-info__text');
    let contactsTitle = document.querySelector('.column-info__title');
    let mapWrapper= document.querySelector('.column-map__wrapper');
    let picturesImg= document.querySelectorAll('.column-pictures__img');
    

    //alert(elements[0].children[0]);

    //======== Заголовок ========
    contactsTitle.innerHTML = "Контаты в Малоархангельске";
    //======== #Первая колонка# ========
    //======== Первый велемент ========
    //Подзаголовок
    contactsElements[0].children[0].innerHTML = "Контаты в Малоархангельске";
    //Телефон
    contactsElements[0].children[1].innerHTML = "+7 (920) 111-11-11";
    //======== Второй велемент ========
    //Ссылка
    contactsElements[1].children[0].href="dima@petrushin.biz";
    //Текст
    contactsElements[1].children[0].innerHTML = "dima@petrushin.biz";
    //======== Третий велемент ========
    //Текст
    contactsElements[2].innerHTML = "Работаем с понедельника по пятницу с 8.00 до 17.00, субота с 9.00 до 13.00, воскресенье – выходной.";
    //======== Четвертый велемент ========
    //Текст
    contactsElements[3].innerHTML = "г. Малоархангельск, ул. Калинина, д. 13, 3 этаж, СЦ \"Девайс-Мастер\"";
    //======== Пятый велемент ========
    //Ссылка
    contactsElements[4].children[0].href="vk.com/dev_mast_malArhg";
    //Текст
    contactsElements[4].children[0].innerHTML = "vk.com/dev_mast_malArhg";


    //======== #Вторая колонка# ========
    mapWrapper.innerHTML = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.4436896204343!2d36.50562684147156!3d52.40349948474344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412e23844b5501d5%3A0x2af636a94946a9bf!2sWestern%20Union!5e0!3m2!1sru!2sua!4v1618325882421!5m2!1sru!2sua\" width=\"100%\" height=\"400\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
  

    //======== #Третья колонка# ========
    picturesImg[0].innerHTML = "<img src=\"img/contacts/img_arh_1.jpg\" alt=\"\">";
    picturesImg[1].innerHTML = "<img src=\"img/contacts/img_arh_2.jpg\" alt=\"\">";
}
};
let listCatalogCategory = document.querySelectorAll('.list-catalog__category > p');
let CatalogCategoryActive = document.querySelectorAll('.list-catalog__category');
let catalogWay = document.querySelector('.catalog__way');
let catalogWayLink = document.querySelectorAll('.catalog__way > a');
let categoryItems = document.querySelectorAll('.category__items');
let categoryItem = document.querySelectorAll('.category__item > p');

//////////////////////////////////
//=============================//
//////////////////////////////////


let mass = ['<a>Главная</a>'];

let memoryCheckСatalog;
let memoryCheckСatalogItem;



function SavingHistory(){
    let text = '';
    for(let i=0; i<mass.length; i++){
        text += mass[i];
    }
    catalogWay.innerHTML = text;
}


function LinkHistory(){
    catalogWayLink = document.querySelectorAll('.catalog__way > a');
    if(catalogWayLink.length>0){
        for (let i=0; i < catalogWayLink.length; i++){
            catalogWayLink[i].addEventListener("click", function(e){
                console.log(i);
                
                if(i === 0){
                    _slideUp(categoryItems[memoryCheckСatalog]);
                    //listCatalogCategory[memoryCheckСatalog].classList.remove('_active');
                    let checking;
                    checking = document.querySelector('._active');
                    if(checking){
                        checking.classList.remove('_active');
                    }
                    checking = document.querySelector('._focus');
                    if(checking){
                        checking.classList.remove('_focus');
                    }
                    checking = document.querySelector('._active-item');
                    if(checking){
                    checking.classList.remove('_active-item');
                    }
                    mass.length = 1;
                    SavingHistory();
                }
                if(i === 1){
                    let checking = document.querySelector('._active-item');
                    if(checking){
                        checking.classList.remove('_active-item');
                    }
                    mass.length = 2;
                    SavingHistory();
                }
                LinkHistory();
            });
        }
    }

}



if (listCatalogCategory.length > 0){
    for (let i=0; i < listCatalogCategory.length; i++){
        const categoruId = listCatalogCategory[i];
        categoruId.addEventListener("click", function(e){
       
            if (memoryCheckСatalog === undefined){
                _slideDown(categoryItems[i]);
                listCatalogCategory[i].classList.add('_active');
                CatalogCategoryActive[i].classList.add('_focus');
            } else if(memoryCheckСatalog == i){
                _slideToggle(categoryItems[i]);
                listCatalogCategory[i].classList.toggle('_active');
                CatalogCategoryActive[i].classList.toggle('_focus');
            } else if(memoryCheckСatalog >= 0){
                _slideUp(categoryItems[memoryCheckСatalog]);
                listCatalogCategory[memoryCheckСatalog].classList.remove('_active');
                CatalogCategoryActive[memoryCheckСatalog].classList.remove('_focus');
                _slideDown(categoryItems[i]);
                listCatalogCategory[i].classList.add('_active');
                CatalogCategoryActive[i].classList.add('_focus');
            } 
            memoryCheckСatalog = i;
        });
    }

}

//////////////////////////////////
//=============================//
//////////////////////////////////


// Работа с Элементами каталога ////////////////////////=>
// Текст //
let ItemText = document.querySelectorAll('.product-item__text');
function textСontrol(maxSymbol){
    if (ItemText){
        for(let i = 0; i < ItemText.length; i++){
            let arr = ItemText[i].textContent.split('');
            if(arr.length >= maxSymbol){
                arr.length = maxSymbol-1;
                arr.push('...');
            }
            ItemText[i].innerHTML = arr.join('');
        }
    }
}
textСontrol(99);
// Позиционирование //
let ItemPositionList = document.querySelector('.view-menu__list'); 
let ItemPositionMatrix = document.querySelector('.view-menu__matrix');

let productsList = document.querySelector('.products-list');
let productItem = document.querySelectorAll('.product-item');

let productItemImg = document.querySelector('.product-item__img');

if(ItemPositionList){
    ItemPositionList.addEventListener("click", function(e){
        productsList.classList.remove('_matrix');
        productsList.classList.add('_list');
        for(let i=0; i<productItem.length; i++){
            productItem[i].classList.remove('_matrix');
            productItem[i].classList.add('_list');

            let column = productItem[i].querySelector('.product-item__column');
            let columnInfo = productItem[i].querySelector('.product-item__column-info');
            let img = productItem[i].querySelector('.product-item__img');
            let title = productItem[i].querySelector('.product-item__title');
            let text = productItem[i].querySelector('.product-item__text');
            let price = productItem[i].querySelector('.product-item__price');
            let buttons = productItem[i].querySelector('.product-item__buttons-list');

            column.insertBefore(img, column.children[0]);
            column.insertBefore(buttons, column.children[1]);

            columnInfo.insertBefore(title, columnInfo.children[0]);
            columnInfo.insertBefore(text, columnInfo.children[1]);
            columnInfo.insertBefore(price, columnInfo.children[2]);

        }


        textСontrol(185);
    });
}
if(ItemPositionMatrix){
    ItemPositionMatrix.addEventListener("click", function(e){
        productsList.classList.remove('_list');
        productsList.classList.add('_matrix');
        for(let i=0; i<productItem.length; i++){
            productItem[i].classList.remove('_list');
            productItem[i].classList.add('_matrix');


            let column = productItem[i].querySelector('.product-item__column');
            let columnInfo = productItem[i].querySelector('.product-item__column-info');
            
            let img = column.querySelector('.product-item__img');
            let title = columnInfo.querySelector('.product-item__title');
            let text = columnInfo.querySelector('.product-item__text');
            let price = columnInfo.querySelector('.product-item__price');
            let buttons = column.querySelector('.product-item__buttons-list');

            productItem[i].insertBefore(img, productItem[i].children[0]);
            

            productItem[i].insertBefore(title, productItem[i].children[1]);
            productItem[i].insertBefore(text, productItem[i].children[2]);
            productItem[i].insertBefore(price, productItem[i].children[3]);

            productItem[i].insertBefore(buttons, column.children[4]);

        }
        textСontrol(99);
    });
}

// Расчет растояния от элемента до начала страницы////////////////////////=>

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
let listCatalog = document.querySelector('.list-catalog');
if(listCatalog){
let scrollCatalog = offset(listCatalog);
let catalogFixedList = document.querySelector('.catalog__fixed-list');


window.addEventListener('scroll', function() {
    let screenWidth = window.screen.width;
    if(screenWidth > 768){
        if(pageYOffset >= (scrollCatalog.top - 10)){
            listCatalog.classList.add('_fixed');
            catalogFixedList.style.minWidth = listCatalog.offsetWidth + 'px';
        }

        if(pageYOffset < scrollCatalog.top - 10){
            listCatalog.classList.remove('_fixed');
            catalogFixedList.style.minWidth = '0px';
    
        }
    }

  });

}
// Каталог для адаптивной страницы ////////////////////////=>
let catalogMenuIcon = document.querySelector('.catalog-menu__icon');
let catalogMenuBody = document.querySelector('.catalog-menu__body');
if (catalogMenuIcon){
    catalogMenuIcon.addEventListener("click", function(e){
        _slideToggle(catalogMenuBody);
        catalogMenuIcon.classList.toggle('_active');;
    });

}

let VMFilter = document.querySelector('.view-menu__filter');
let VMswitchesAdaptiv = document.querySelector('.view-menu__switches-adaptiv');

if (VMFilter){
    VMFilter.addEventListener("click", function(e){
        _slideToggle(VMswitchesAdaptiv);
        VMFilter.classList.toggle('_active');;
    });

}

// Сравнение товаров ////////////////////////=>
let С_ProductsList = document.querySelector('.products-list');
if(С_ProductsList){
    let С_ProductItem = С_ProductsList.querySelectorAll('.product-item');
    let C_mass = [];
    if (С_ProductItem.length > 0){
        for(let i=0; i < С_ProductItem.length; i++){
            let compare = С_ProductItem[i].querySelector('.buttons-list__compare');
            compare.addEventListener("click", function(e){
                C_mass.push(С_ProductItem[i].getAttribute('data-id'));
                console.log(C_mass);
            });
        }
    }
}


;
let subtitleSection = document.querySelectorAll('.item-content__subtitle-section > p');
let tabContent = document.querySelectorAll('.tab-content > div');
if(subtitleSection.length > 0){
    let checking = 0;
    for(let i=0; i<subtitleSection.length; i++){
        subtitleSection[i].addEventListener("click", function(e){
            for(let i = 0; i<subtitleSection.length; i++){
                if(subtitleSection[i].classList.contains('_active')){
                    checking = i;
                }
            }
            subtitleSection[checking].classList.remove('_active');
            subtitleSection[i].classList.add('_active');
            tabContent[checking].classList.remove('_active');
            tabContent[i].classList.add('_active');

            //rating.classList.contains('stars_set')
            //if(subtitleSection[i])
            /*
            if(checking>=0){
                subtitleSection[checking].classList.remove('_active');
                subtitleSection[i].classList.add('_active');
                tabContent[checking].classList.remove('_active');
                tabContent[i].classList.add('_active');

            } else {
                subtitleSection[i].classList.add('_active');
                tabContent[i].classList.add('_active');
            }
            checking = i;
            */

        });
    }
}



// Коментарии =>///////////////////////////////
let linkFeedback = document.querySelector('.tab-reviews__link-feedback');
let reviewForm = document.querySelector('.tab-reviews__review-form');

if(linkFeedback){
    let checking;
    linkFeedback.addEventListener("click", function(e){

        if(reviewForm.classList.contains('_active')){
            checking = true;
        }else{
            checking = false;
        }
        if(checking == false){
            _slideDown(reviewForm);
            linkFeedback.innerHTML = "Закрыть";
            reviewForm.classList.add('_active');
        } else if (checking == true){
            _slideUp(reviewForm);
            linkFeedback.innerHTML = "Оставить отзыв";
            reviewForm.classList.remove('_active');
        }
        /*
        if(checking == false){
            _slideDown(reviewForm);
            linkFeedback.innerHTML = "Закрыть";
            checking = true;
        } else if (checking == true){
            _slideUp(reviewForm);
            linkFeedback.innerHTML = "Оставить отзыв";
            checking = false;
        }
        */
    });
}

// Ссылки на блоке item-tovar__info =>///////////////////////////////
let RevInfoLink = document.querySelectorAll('.reviews-info__links > p');
if (RevInfoLink.length > 0){
    for(let i=0; i<RevInfoLink.length; i++){
        RevInfoLink[i].addEventListener("click", function(e){
            if (i == 0){
                subtitleSection[0].classList.remove('_active');
                subtitleSection[1].classList.add('_active');
                tabContent[0].classList.remove('_active');
                tabContent[1].classList.add('_active');
            } else if (i == 1){
                subtitleSection[0].classList.remove('_active');
                subtitleSection[1].classList.add('_active');
                tabContent[0].classList.remove('_active');
                tabContent[1].classList.add('_active');
                if(!reviewForm.classList.contains('_active')){
                    _slideDown(reviewForm);
                    linkFeedback.innerHTML = "Закрыть";
                    reviewForm.classList.add('_active');
                }
            }
        });
    }
}
;
"use strict"

const ratings = document.querySelectorAll('.stars');
let ratingAll = 4; //Общий рейтинг
if(ratings.length > 0){
    initRatings();
}

//Функция рейтинга

function initRatings(){
    let ratingActive, ratingValue;
    for(let i = 0; i < ratings.length; i++){
        const rating =  ratings[i];
        initRating(rating);
    }


    function initRating(rating){
        initRatingVars(rating);
        

        if(!rating.classList.contains('stars-general')){
            setRatingActiveWidth();
        } else {
            setRatingActiveWidthAll();
        }

        if(rating.classList.contains('stars_set')){
            setRating(rating);
        }
    }

    function initRatingVars(rating){
        ratingActive = rating.querySelector('.stars__active');
        ratingValue = rating.querySelector('.stars__value');
    }

    function setRatingActiveWidth(i = ratingValue.innerHTML){
        const RatingActiveWidth = i / 0.05;
        ratingActive.style.width = `${RatingActiveWidth}%`;
    }

    function setRatingActiveWidthAll(){
        if (ratingAll > 0){
            const RatingActiveWidth = ratingAll / 0.05;
            ratingActive.style.width = `${RatingActiveWidth}%`;
        }
    }

    //Возможность указывать оценку
    function setRating(rating){
        const ratingItems = rating.querySelectorAll('.stars__item');
        for(let i = 0; i < ratingItems.length; i++){
            const ratingItem =  ratingItems[i];
            ratingItem.addEventListener("mouseenter", function(e){
                //Обновление переменых
                initRatingVars(rating);

                //Обновление обновление активных звезд
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function(e){
                //Обновление обновление активных звезд
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function(e){
                //Обновление переменых
                initRatingVars(rating);

                if (rating.dataset.ajax){ //Отправить на сервер при нажатии на звезду
                    // "Отправить" на сервер
                    setRatingValue(ratingItem.value, rating);
                } else { //Обычный выбор 
                    // Отобразить указаную оценку
                    ratingValue.innerHTML = i + 1;
                    RatingActiveWidth();
                }
            });
        }
    }
};