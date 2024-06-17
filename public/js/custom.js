// get current year
(function () {
    var year = new Date().getFullYear();
    document.querySelector("#currentYear").innerHTML = year;
})();

// scripts.js
$(document).ready(function() {
    $('#subscribe-form').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        var email = $('#email').val();

        $.ajax({
            url: '/subscribe',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email }),
            success: function(response) {
                alert('Subscription successful!');
            },
            error: function(error) {
                alert('An error occurred: ' + error.responseText);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const blogCardsTop = document.querySelectorAll('.slide-in.top');
    const blogCardsBottom = document.querySelectorAll('.slide-in.bottom');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerTop = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const observerBottom = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    blogCardsTop.forEach(card => {
        observerTop.observe(card);
    });

    blogCardsBottom.forEach(card => {
        observerBottom.observe(card);
    });
});
$(document).ready(function() {
    // Smooth scroll to quote section when "Get A Quote" button is clicked
    $('.btn-2').click(function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        $('html, body').animate({
            scrollTop: $('#quoteForm').offset().top
        }, 1000); // Adjust the duration (in milliseconds) as needed
    });
});

// JavaScript to add animation when element enters viewport
document.addEventListener('DOMContentLoaded', function() {
    let detailBox = document.querySelector('.detail-box');

    function slideInParagraphs() {
      let paragraphs = detailBox.querySelectorAll('p');
      paragraphs.forEach(function(paragraph, index) {
        setTimeout(function() {
          paragraph.style.opacity = '1';
          paragraph.style.animation = 'slideIn 0.5s ease-out forwards';
        }, index * 1000); // Adjust delay as needed
      });
    }

    function isInViewport(element) {
      let rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function handleScroll() {
      if (isInViewport(detailBox)) {
        slideInParagraphs();
        window.removeEventListener('scroll', handleScroll);
      }
    }

    // Initial check in case element is already in viewport
    if (isInViewport(detailBox)) {
      slideInParagraphs();
    } else {
      window.addEventListener('scroll', handleScroll);
    }
  });

$(document).ready(function() {
    $('#QuoteForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        var name=   $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var message = $('#message').val();

        $.ajax({
            url: '/submitQuote',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: name, email: email,  phone: phone, message:message }),
            success: function(response) {
                alert('Quote request submitted!');
            },
            error: function(error) {
                alert('An error occurred: ' + error.responseText);
            }
        });
    });
});



function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
        modals[i].style.display = 'none';
      }
    }
  }
  

  function toggleHiddenContent(event) {
    event.preventDefault();
    
    const hiddenContent = document.querySelector('.hidden-content');
    const readMoreLink = event.target;
    
    if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
        hiddenContent.style.display = 'block';
        readMoreLink.textContent = 'Read Less';
    } else {
        hiddenContent.style.display = 'none';
        readMoreLink.textContent = 'Read More';
    }
}
