// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');
//     }
//     next();
// });

const COOKIE_ACCESS_ALLOWED_ID = process.env.COOKIE_ACCESS_ALLOWED_ID;

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  console.log('sessionChecker... req.session:', req.session, ' | req.cookies', req.cookies);
  const authenticationStatus = req.cookies && req.cookies.accessToken === COOKIE_ACCESS_ALLOWED_ID ? 'Authenticated' : 'Unauthorized';
  if (authenticationStatus !== 'Authenticated') {
    res.clearCookie('accessToken');
    // res.redirect('/'); // default logged in page
    res.status(400).send('Unauthorized');
    // next();
  } else {
    next();
  }
};

const sampleMiddleware = {
  sessionChecker,
};

module.exports = sampleMiddleware;
