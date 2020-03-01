$(document).ready(function() {
  if (
    document.cookie.split(";").filter(function(item) {
      return item.trim().indexOf("userSession=") === 0;
    }).length
  ) {
    // eslint-disable-next-line prettier/prettier
    console.log("The cookie \"userSession\" exists");
  }

  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var redirect = getUrlVars().referrer;

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log(redirect);
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    if (redirect) {
      loginUser(userData.email, userData.password, redirect);
    } else {
      loginUser(userData.email, userData.password);
    }

    // If we have an email and password we run the loginUser function and clear the form

    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password, redirect) {
    console.log(redirect);
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(res) {
        console.log(redirect);
        var sessionCookie = "userID=" + res.id + "; userEmail=" + res.email;
        document.cookie = sessionCookie;
        //res.redirect(req.session.returnTo);
        if (redirect) {
          if (redirect === "home") {
            window.location.replace("/");
          } else {
            window.location.replace("/" + redirect);
          }
        } else {
          window.location.replace("/");
        }
        //window.history.back();
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }
});
