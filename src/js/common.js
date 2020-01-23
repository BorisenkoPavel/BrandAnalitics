$(document).ready(function () {
	
	svg4everybody({});

	Modernizr.on('webp', function(result) {
		if (result) {
			// supported
		} else {
			// not-supported
		}
	});

	$(".hamburger").on("click", function () {
		$(this).toggleClass('is-active')
		$('body').toggleClass('is-active')
	})

	$(window).resize(function(){
		if($(window).width() > 999) {
			$(this).removeClass('is-active')
			$('body').removeClass('is-active')
		}
	})

	$(".go-top").on("click", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body, html').animate({
			scrollTop: top
		}, 350);
	});
	
	var slider= new Swiper('.swiper-container', {
		slidesPerView: 3,
		spaceBetween: 55,
		autoplay: true,
		speed: 400,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			700: {
				slidesPerView: 1,
				spaceBetween: 25
			},
			999: {
				slidesPerView: 2,
				spaceBetween: 25
			},
			1366: {
				spaceBetween: 25
			}
		}
});

	$.ajax({url: "../webApi.json",})
		.done(function(result){
			if(result.status){
				var htmlResult = "";
				result.payload.cards.forEach(element => {
					var clone = document.importNode(document.getElementById('card').content, true);
					if(element.image_url) {
						clone.querySelector('.card__img').setAttribute('src', element.image_url);
					} else {
						clone.querySelector('.card').removeChild(clone.querySelector('.card__img'));
					}
					clone.querySelector('.card__title').textContent = element.title;
					clone.querySelector('.card__text').textContent = element.description;
					clone.querySelector('.card__date').textContent = element.date;
					$(".swiper-wrapper").append(clone);
				});
				slider.update()
			}
		})
		.fail(function(){
			$(".swiper-wrapper").text('Ошибка получения данных!')
	})

  $('.subscribe-input').focus(function(){
    $(this).addClass('is-active')
  })

  $('.subscribe-input').blur(function(e){
    if (e.target.value == '') {
    $(this).removeClass('is-active')
  }
  })

	var header = $('header'),
	scrollPrev = 0;
	
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
	
		if ( scrolled > $('.section-banner .btn.btn-lg').offset().top && scrolled > scrollPrev) {
			header.addClass('fixed');
		} else {
			header.removeClass('fixed');
		}
		scrollPrev = scrolled;
	});




})