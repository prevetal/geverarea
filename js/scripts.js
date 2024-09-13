WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Info slider
	const infoSliders = [],
		infoSlider = document.querySelectorAll('.info_slider .swiper')

	infoSlider.forEach((el, i) => {
		el.classList.add('info_slider_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		}

		infoSliders.push(new Swiper('.info_slider_s' + i, options))
	})


	// Small info slider
	const smallInfoSliders = [],
		smallInfoSlider = document.querySelectorAll('.small_info_slider .swiper')

	smallInfoSlider.forEach((el, i) => {
		el.classList.add('small_info_slider_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		}

		smallInfoSliders.push(new Swiper('.small_info_slider_s' + i, options))
	})


	// Current person
	const currentPerson = document.querySelectorAll('.persons.current_person .swiper')

	if (currentPerson) {
		var currentPersonSlider = new Swiper('.persons.current_person .swiper', {
			loop: false,
			speed: 500,
			allowTouchMove: false,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		})
	}


	// Persons
	const persons = document.querySelectorAll('.persons:not(.current_person) .swiper')

	if (persons) {
		new Swiper('.persons:not(.current_person) .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 1
				},
				768: {
					spaceBetween: 40,
					slidesPerView: 2
				},
				1024: {
					spaceBetween: 48,
					slidesPerView: 2
				},
				1280: {
					spaceBetween: 48,
					slidesPerView: 3
				},
				1900: {
					spaceBetween: 80,
					slidesPerView: 3
				}
			},
			on: {
				activeIndexChange: swiper => currentPersonSlider.slideTo(swiper.realIndex)
			}
		})
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><img src="/images/ic_close.png" alt=""></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Menu
	$('header .menu_btn, .menu .close_btn').click((e) => {
		e.preventDefault()

		$('body').toggleClass('lock')
		$('.menu').toggleClass('show')
	})


	// Mob. menu
	$('.mob_header .menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	// 'Up' button
	$('.buttonUp .btn').click((e) => {
		e.preventDefault()

		$('body, html').stop(false, false).animate({ scrollTop: 0 }, 1000)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})