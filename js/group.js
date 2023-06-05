document.addEventListener('DOMContentLoaded', function() {
  // console.log(); находит в js-ce ошибку. Deftools


  //Слайдер product d-31
  const swiperOpr = document.querySelector(".product")// Для обёртки if
  if (swiperOpr) { // Обёртка if. Спасение Gulp-а от null в браузере
    const productSwiper = new Swiper('.product__swiper-container', {
      // Дополнительные параметры
      direction: 'horizontal',
      loop: false,

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },

      //slidesPerView: 'auto',
      slidesPerGroup: 1,//Одна картинка - один шаг
      spaceBetween: 12,


      //Кнопки навигации
      navigation: {
        nextEl: '.product__btn_next',
        prevEl: '.product__btn_prev',
        disabledClass: 'product__btn-disabled',
      },

      breakpoints: {
        320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 17,
        },

        580: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
        },

        768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
        },

        999: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
        },

        1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
        },
      
        1225: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 25,
        },
      },


      /*//Бесконечное листание страниц
      speed: 3000,//Интервал ожидания

      autoplay: {
        delay: 5000,//Интервал ожидания
        disableOnInteraction: false,      
      }*/

	  });
	}; 


  // inputmask - Телефон main-form
  const form = document.querySelector('.main-form__form_js');
  if (form) {// Обёртка if. Спасение Gulp-а от null в браузере 
    const telSelector = form.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    new window.JustValidate('.main-form__form_js', {
      rules: {
        name: {
			  required: true,
			  minLength: 2,
			  maxLenght: 10,
			  strength: {
				custom: '^[а-яёЁ\s]+$'//только по русски текст
        //custom: '^[a-yeO\s]+$'только по английски текст
			  }
        },  
        tel: {
          required: true,
          function: () => {
            const phone = telSelector.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          }
        },
        checkbox: { // Обязательная галка
        required: true
        }
      },
      colorWrong: '#ff6972',
      messages: {
        name: {
          required: 'Введите ваше имя',
          minLength: 'Введите 3 и более символов',
          maxLength: 'Запрещено вводить более 15 символов',
          strength: 'Текст только по русски'
          //strength: 'Текст только по английски'
        },
        email: {
          email: 'Недопустимый формат',
          required: 'Введите email'
        },
        tel: {
          required: 'Введите ваш телефон',
          function: 'Здесь должно быть 10 символов без +7'
        },
        checkbox: {
          required: 'Поставьте галочку',
          function: 'Здесь должна быть галка'
        }
      },

      submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        }


            
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        thisForm.reset();
      }
    })
  };

  
  
  // Модальное окно для нескольких окон. Модалка не прокручиваеться.//
  const activeClass = "modal-active";
  const buttons = document.querySelectorAll(".modalBtn-js");

  for (let button of buttons) {
    modalEvent(button);
  }
  
  function closeModal (modal) {
	 modal.classList.remove(activeClass);
	 document.body.style.overflow  = '';
  }
	  
  function modalEvent(button) {
    button.addEventListener("click", (e) => {//(e) - дефолт - чтобы при нажитие на модального окна, модалка не улетала вверх.
      e.preventDefault();

      const trigger = button.getAttribute("data-modal-trigger");
      const modal = document.querySelector(`[data-modal=${trigger}]`);
      const modalContent = modal.querySelector(".modal-container");
      const close = modal.querySelector(".modal-close");
           
      /* --Cтили body при открытие модального окна-- */
      modal.classList.add('modal-active');		 
      if (modal.classList.contains(activeClass)) {
        document.body.style.overflow  = 'hidden';
      }

      close.addEventListener("click", () =>  {
		 closeModal (modal); 
	  });
      modal.addEventListener("click", () => {
		 closeModal (modal); 
	  });
      modalContent.addEventListener("click", (e) => e.stopPropagation());
      
    });
  }; 
   


  //*Плавный скролл по якорям. В любое место можно кинуть.*//
  $(function(){
    $('a[href^="#"]').click(function(){
      var target = $(this).attr('href');
      $('html, body').animate({scrollTop: $
    (target).offset().top},800);
      return false;
    })
  });
  
});