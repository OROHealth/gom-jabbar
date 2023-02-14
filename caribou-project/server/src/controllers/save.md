// @Desc     Display the current User
// @Method   GET
// @Route    /api/v1/users/current
// function currentUser(req, res) {
//   let currentUser = req.user;
//   res.status(200).json({ user: currentUser });
// }

// TODO Email and Password Login Start

// @Desc    login a user with email and password
// @Method  POST
// @Route   /api/v1/users/login
async function loginUser(req, res, next) {
  console.log('Request data', req.body);

  const { email, password } = req.body;
  const errors = [];
  const success = [];

  if (!email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    console.log('Errors', errors);

    res.json({ msg: errors }).end();
  } else {
    await UserModel.findOne({ email: email }).then(async user => {
      if (!user) {
        errors.push({ msg: 'User does not exist' });
        res.json({ msg: errors }).end();
      } else {
        // we want to authenticate the user in our database
        // we pass in an object, if the login is successful, redirect to the dashboard
        console.log('The User that want to Login', user);
        // passport.authenticate('local')
        next();
        // await passport.authenticate(
        // 	'local',
        // 	(err, user, info) => {
        // 		console.log('The User Inside Passport - Login', user)
        // 		if (err) {
        // 			errors.push({ msg: 'Authentication Error, Please try again' })
        // 			return res.json({ msg: errors })
        // 		}
        // 	},
        // 	{
        // 		session: true,
        // 	}
        // )

        // req.LogIn(user, (err) => {
        // 	if (err) {
        // 		errors.push({ msg: 'Login Error, Please try again' })
        // 		return res.json({ msg: errors })
        // 	}
        // 	console.log('passed Passport')
        // 	return next()
        // })

        // next()
        // {
        //   successRedirect: '/dashboard',
        //   failureRedirect: '/',
        //   session: true,
        //   failWithError: true,
        // }
      }
    });
  }
}

// @Desc    register a user with email and password
// @Method  POST
// @Route   /api/v1/users
async function registerUser(req, res) {
  const { email, password, repeatPassword } = req.body;
  let errors = [];
  let success = [];

  // Check required fields
  if (!email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check that passwords match
  // if (password !== repeatPassword) {
  //   errors.push({ msg: 'Passwords are not the same' });
  // }

  // Check that passwords at least 6 characters
  if (password.length < 6) {
    errors.push({ msg: 'Passwords should be atleast 6 characters' });
  }

  // if errors.length is greater than 0, that means we have an issue
  if (errors.length > 0) {
    // if there is an issue then I want to rerender the registration form
    // then we want to pass the errors in and also the data
    res.json({ msg: errors });
  } else {
    // we want to see if there is a match with the email in the database comparing it to the email that the registered user submitted.
    // [] Check if user already exists in the database
    await UserModel.findOne({ email: email }).then(async user => {
      if (user) {
        // User Exists.
        // then we push a new error object with a key 'msg' for message and the actual error as a key in the variable above to be displayed in the frontend
        errors.push({ msg: "I'm sorry this user already exist!" });
        res.json({ msg: errors });
      } else {
        // We will hash the password before saving it to the database
        // [] Encrypt password
        // we need to generate a salt in order to create a hash
        // const salt = await bcrypt.genSalt(12)
        // const hashedPassword = await bcrypt.hash(password, salt) // returns the encrypted password, of the newUser that just registered.

        // we created a new instance of user, but we haven't saved it yet
        const newUser = new UserModel({
          firstName,
          lastName,
          email,
          // password: hashedPassword,
        });

        //Passport setting to ign up user
        // using passport to register the users data
        // we don't store the password in the newUser but instead add it as a second parameter. Passport will automatically hash that password.
        // next we pass a callback for error and user
        // summary: Simply we register the user with the UserModel.register, then we pass the user data from the form submitted as the first parameter, as the second parameter we pass the password the user submitted from the form and passport will automatically encrypt this password and save it in the database. then we respond with an error or success message.
        UserModel.register(newUser, password, (err, user) => {
          if (err) {
            errors.push({ msg: err });
            res.json({ msg: errors });
            // res.redirect('/auth')
          }
          passport.authenticate('local')(req, res, () => {
            success.push({ msg: 'Account created successfully' });
            res.json({ successMsg: success });
            // res.redirect('/auth) // the login page
          });
        });

        // set the new user's password to the encrypted password version
        // newUser.password = hashedPassword

        // save the newUser to the database
        // newUser
        // 	.save()
        // 	.then((userSaved) => {
        // 		console.log(req.body)
        // 		console.log('user', userSaved)
        // 		// if the user gets saved we want to redirect to the login page
        // 		// res.redirect('/dashboard')
        // 		req.login(newUser, function (err) {
        // 			if (err) {
        // 				return next(err)
        // 			}
        // 			return res.status(301).redirect('/dashboard')
        // 		})
        // 	})
        // 	.catch((err) => {
        // 		console.log('Error Saving newUser:', err)
        // 	})
      }
    });
  }
}
// TODO Email and Password Login End
