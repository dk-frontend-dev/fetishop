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
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
}); // for webP, код детектин, читает ли браузер вебп и дает бади класс webp, или no-webp.
// Создаем заранее переменные, через которых будет инициализировать слайдер

var mainScreenSlider, productSlider, productSliderSM, productsItems;

if ($(".main-screen__slider").length) {
  mainScreenSlider = new Swiper('.main-screen__slider', {
    speed: 800,
    spaceBetween: 0,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    },
    updateOnWindowResize: 1,
    allowTouchMove: false,
    pagination: {
      el: '.main-screen__dots',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      790: {
        autoplay: {
          delay: 1200
        }
      },
      892: {
        spaceBetween: 0
      }
    }
  });
}

if ($(".singleProduct").length && $(".smallProduct").length) {
  productSlider = new Swiper('.singleProduct', {
    spaceBetween: 0,
    updateOnWindowResize: 1,
    loopedSlides: 5,
    loop: 1
  });
  productSliderSM = new Swiper('.smallProduct', {
    spaceBetween: 27,
    slidesPerView: 4,
    slideToClickedSlide: 1,
    loop: 1,
    loopedSlides: 5,
    updateOnWindowResize: 1,
    breakpoints: {
      320: {
        spaceBetween: 17
      },
      579: {
        spaceBetween: 34
      },
      790: {
        spaceBetween: 34
      },
      991: {
        spaceBetween: 27
      }
    }
  });
  productSlider.controller.control = productSliderSM;
  productSliderSM.controller.control = productSlider;
}

if ($(".productsItems").length) {
  productsItems = new Swiper('.productsItems', {
    slidesPerView: 4,
    spaceBetween: 27,
    updateOnWindowResize: 1,
    navigation: {
      nextEl: '.productsItems-next',
      prevEl: '.productsItems-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      515: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      565: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 12
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1381: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  });
}

$(document).ready(function () {
  var header = document.querySelector(".header"),
      mainSectionHeight = document.querySelector(".main-screen"),
      productItems = document.querySelectorAll(".products__item"),
      searchLink = document.querySelectorAll(".account-menu__link-search"),
      searchPopupRemove = document.querySelectorAll(".search-remove"),
      burger = document.querySelector(".burger"),
      menu = document.querySelector(".menu");
  var productSingleHeart = document.querySelectorAll(".single-p__content-heart");
  var rewiewPopupBtn = document.querySelectorAll(".single-p__m-review"); // Open modal on click link "search" in header

  searchLink.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(".section-search").setAttribute("style", "display:block");
      setTimeout(function () {
        document.querySelector(".section-search").classList.add("section-search--active");
      }, 40);
      document.querySelector("body").classList.add("body--active");
      document.querySelector(".section-search").setAttribute('style', "display:block;overflow:hidden scroll");
    });
  }); // close modal on click button-close

  searchPopupRemove.forEach(function (btnRemove) {
    btnRemove.addEventListener("click", function () {
      document.querySelector(".section-search").classList.remove("section-search--active");

      try {
        document.querySelector(".review-popup").classList.remove("review-popup--active");
      } catch (e) {}

      setTimeout(function () {
        document.querySelector(".section-search").setAttribute('style', "display:none;overflow:hidden hidden");
      }, 300);
      document.querySelector("body").classList.remove("body--active");
    });
  }); // close modal on click escape

  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      document.querySelector(".section-search").classList.remove("section-search--active");

      try {
        document.querySelector(".review-popup").classList.remove("review-popup--active");
      } catch (e) {}

      setTimeout(function () {
        document.querySelector(".section-search").setAttribute('style', "display:none;overflow:hidden hidden");
      }, 300);
      burger.classList.remove("burger--active");
      menu.classList.remove("menu--active");
      document.querySelector(".st-overlay").classList.remove("st-overlay--active");
      document.querySelector("body").classList.remove("body--active");
    }
  }); // on click burger raise menu

  burger.addEventListener("click", function () {
    menu.classList.toggle("menu--active");
    burger.classList.toggle("burger--active");
    document.querySelector("body").classList.toggle("body--active");
    document.querySelector(".st-overlay").classList.toggle("st-overlay--active");
  });
  document.querySelector(".menu--active__close").addEventListener("click", function () {
    menu.classList.remove("menu--active");
    burger.classList.remove("burger--active");
    document.querySelector("body").classList.remove("body--active");
    document.querySelector(".st-overlay").classList.remove("st-overlay--active");
  });

  try {
    document.querySelector(".account-menu__btn").addEventListener("click", function () {
      document.querySelector(".account__col-info").classList.add("account__col-info--active");
      document.querySelector("body").classList.add("body--active");
      document.querySelector(".st-overlay").classList.add("st-overlay--active");
    });
    document.querySelector(".account__col-back").addEventListener("click", function () {
      document.querySelector(".account__col-info").classList.remove("account__col-info--active");
      document.querySelector("body").classList.remove("body--active");
      document.querySelector(".st-overlay").classList.remove("st-overlay--active");
    });
    document.querySelector(".account__form-delivery-link").addEventListener("click", function (e) {
      e.preventDefault();
      var is = e.currentTarget;
      document.querySelector("." + is.getAttribute("href").replace("#", "")).classList.toggle(is.getAttribute("href").replace("#", "") + "--active");
    });
  } catch (e) {} // Валидация на инпуты


  if ($(".authorization-register__input").length) {
    $(".authorization-register__input").change(function (e) {
      if (e.target.value.length > 0) {
        e.target.classList.remove("authorization-register__input--notValid");
      } else {
        e.target.classList.add("authorization-register__input--notValid");
      }
    });
  }

  function headerActive() {
    window.addEventListener('scroll', function () {
      try {
        if (pageYOffset >= mainSectionHeight.getBoundingClientRect().height - 200) {
          header.classList.remove("main-page-header");
        } else {
          header.classList.add("main-page-header");
        }
      } catch (e) {}
    });
  }

  function selects() {
    var selects = document.querySelectorAll(".selects");
    selects.forEach(function (element) {
      element.addEventListener("click", function (e) {
        var is = e.target;
        is.classList.contains("select__link--current") ? e.preventDefault() : null;

        if (is.classList.contains("select__link--current")) {
          var sibling = is.nextSibling.nextSibling;
          sibling.classList.toggle("select__drop--active");
        } else {}
      });
    });
  }

  function rewiewForm() {
    rewiewPopupBtn.forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".review-popup").classList.toggle("review-popup--active");
        document.querySelector("body").classList.toggle("body--active");
      });
    });
  } // Tabs


  function tabs() {
    try {
      var _tabs = document.querySelector(".tabs"),
          tabActiveLink = _tabs.querySelectorAll("a");

      _tabs.addEventListener("click", function (e) {
        e.preventDefault();
        var is = e.target,
            target = "";

        try {
          target = is.getAttribute("href").replace("#", "");
          tabActiveLink.forEach(function (link) {
            link.classList.remove("tabs__link--active");
          });
          is.classList.add("tabs__link--active");
          var itemsWrap = document.querySelector(".tabs__wrapper"),
              itemsAll = itemsWrap.querySelectorAll(".tab__item");
          itemsAll.forEach(function (el) {
            el.classList.contains(target) ? el.setAttribute("style", "display:block") : el.setAttribute("style", "display:none");
          });
        } catch (e) {}
      });
    } catch (err) {}
  }

  headerActive();
  tabs();
  inputNumber($('.input-number')); // Polifill for svg sprites

  svg4everybody({});
  rewiewForm();
  selects();
  $("#phoneMask").inputmask({
    "mask": "+99 (999) 999-99-99",
    "placeholder": "+XX (XXX) XXX-XX-XX"
  }); // $('.order-history__table-wrap').on('touchstart touchend', function (e) {
  //    $(this).addClass('order-history__table-wrap--active');
  // });

  $(".single-p__content-rating").on("click", function (event) {
    var id = $(this).attr('data-smoothScrollTo');
    var top = $(id).offset().top - 130;
    $('body,html').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
      $('body,html').stop();
    });
    $('body,html').animate({
      scrollTop: top
    }, 500);
  });
}); // input number (на странице продукта)

(function () {
  window.inputNumber = function (el) {
    var min = el.attr('min') || false;
    var max = el.attr('max') || false;
    var els = {};
    els.dec = el.prev();
    els.inc = el.next();
    el.each(function () {
      init($(this));
    });

    function init(el) {
      els.dec.on('click', decrement);
      els.inc.on('click', increment);

      function decrement() {
        var value = el[0].value;
        value--;

        if (!min || value >= min) {
          el[0].value = value;
        }
      }

      function increment() {
        var value = el[0].value;
        value++;

        if (!max || value <= max) {
          el[0].value = value++;
        }
      }
    }
  };
})();

function heartActive(e) {
  try {
    e.classList.toggle("heart--active");
  } catch (arr) {}
}