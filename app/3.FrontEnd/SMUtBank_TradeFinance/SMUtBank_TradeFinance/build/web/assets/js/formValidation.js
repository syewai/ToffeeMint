function applicationFormValidation(){
    (function() {
    'use strict';

    window.addEventListener('load', function() {
      var form = document.getElementById('loginForm');
      form.addEventListener('button', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    }, false);
  })();
}


