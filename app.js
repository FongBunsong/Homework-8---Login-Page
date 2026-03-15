require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;
const users = {
  admin: {
    username: 'admin',
    password: 'password123',
    fullName: 'System Administrator',
    role: 'Head of IT Operations',
    location: 'Phnom Penh, Cambodia',
    status: 'Super Admin',
    email: 'admin@university.edu',
    bio: 'Managing the campus network infrastructure.',
    interest: 'Network reliability, infrastructure security, and IT service management.',
    skills: 'Skills: Linux server administration, network monitoring, incident response, and team coordination.',
    highlights: [
      'Maintains stable campus systems for daily academic operations.',
      'Coordinates IT support to reduce downtime during peak hours.',
      'Implements practical security controls for internal services.'
    ],
    projects: [
      {
        name: 'Campus Uptime Dashboard',
        summary: 'Operational dashboard for monitoring service health and outages.',
        tech: 'Node.js, Monitoring Tools, Reporting'
      },
      {
        name: 'Secure Access Rollout',
        summary: 'Policy and deployment plan for stronger internal access control.',
        tech: 'IT Policy, Access Management, Security'
      }
    ],
    photo: '/images/admin-profile-photo.png'
  },
  student_dev: {
    username: 'student_dev',
    password: 'dev_password',
    fullName: 'Jane Developer',
    role: 'Junior Web Developer',
    location: 'Phnom Penh, Cambodia',
    status: 'Newbie',
    email: 'jane.d@student.edu',
    bio: 'Full-stack enthusiast and coffee drinker.',
    interest: 'Frontend design, backend APIs, and building portfolio projects.',
    skills: 'Skills: JavaScript, HTML/CSS, Express.js basics, and Git workflow.',
    highlights: [
      'Built a login page with session-based authentication.',
      'Practices responsive layout design for mobile and desktop.',
      'Continuously improving problem-solving through mini projects.'
    ],
    projects: [
      {
        name: 'Study Planner App',
        summary: 'Simple planner to track assignments and deadlines.',
        tech: 'JavaScript, Express, Handlebars'
      },
      {
        name: 'Personal Portfolio',
        summary: 'Portfolio website showcasing projects and technical growth.',
        tech: 'HTML, CSS, JavaScript'
      }
    ],
    photo: '/images/student-dev-profile-photo.png'
  },
  fong_bunsong: {
    username: 'fong_bunsong',
    password: 'bunsong@123',
    fullName: 'Fong Bunsong',
    role: 'Senior Student, IT Management and Computer Science',
    location: 'Phnom Penh, Cambodia',
    status: 'Open to internship opportunities',
    email: '2023276fong@aupp.edu.kh',
    bio: 'Senior Student in Information Technology Management and Computer Science.',
    interest: 'Web development, secure backend engineering, and problem solving with algorithms.',
    favoriteFood: 'Favorite Food: grilled beef lok lak, chicken rice, and iced coffee.',
    skills: 'Skills: JavaScript, Node.js, Express.js, Git/GitHub, and responsive UI styling.',
    highlights: [
      'Built a session-based authentication flow with protected routes.',
      'Designed responsive page layouts with light and dark theme support.',
      'Practices version control workflow using Git and GitHub.'
    ],
    projects: [
      {
        name: 'Campus Portal Auth',
        summary: 'Session-based login portal with profile route protection.',
        tech: 'Node.js, Express, Handlebars'
      },
      {
        name: 'Lost and Found System',
        summary: 'Web system for reporting lost items, listing found items, and matching claims.',
        tech: 'Node.js, Express, Handlebars, CSS'
      }
    ],
    coursesCompleted: 'Courses Completed: General Educations,Programming Fundamentals, Database Systems, Web Development, and Computer Networks.',
    photo: '/images/fong-bunsong-photo.png'
  },
  superman: {
    username: 'superman',
    password: 'KalEl@Metropolis88',
    fullName: 'Clark Kent (Superman)',
    role: 'Investigative Reporter and City Protector',
    location: 'Metropolis, USA',
    status: 'On active duty',
    email: 'clark.kent@dailyplanet.com',
    bio: 'Reporter by day and protector of Metropolis by night.',
    interest: 'Saving lives, investigative journalism, and keeping peace in Metropolis.',
    skills: 'Skills: Flight, super strength, heat vision, and leadership under pressure.',
    highlights: [
      'Leads emergency response efforts during large-scale city incidents.',
      'Works with local teams to reduce risk and improve public safety.',
      'Balances journalistic ethics with real-time crisis support.'
    ],
    projects: [
      {
        name: 'Metropolis Shield Initiative',
        summary: 'Rapid response coordination model for critical threats.',
        tech: 'Strategy, Crisis Response, Team Leadership'
      },
      {
        name: 'Daily Planet Impact Reports',
        summary: 'Investigative reporting focused on accountability and transparency.',
        tech: 'Research, Field Reporting, Analysis'
      }
    ],
    rivals: 'Lex Luthor, General Zod, and Brainiac.',
    photo: '/images/superman-profile-photo.png'
  },
  batman: {
    username: 'batman',
    password: 'Wayne@Midnight77',
    fullName: 'Bruce Wayne',
    role: 'Strategic Crime Analyst and Tactical Responder',
    location: 'Gotham City, USA',
    status: 'Night operations active',
    email: 'batman@gothamcity.com',
    bio: 'Night-time problem solver and strategist focused on protecting Gotham.',
    interest: 'Detective work, tactical planning, and advanced gadget engineering.',
    skills: 'Skills: Investigation, leadership, martial arts, and applied technology.',
    highlights: [
      'Developed high-precision threat analysis methods for urban environments.',
      'Coordinates resources across multiple teams during critical incidents.',
      'Specializes in prevention-focused security planning.'
    ],
    projects: [
      {
        name: 'Gotham Watch Program',
        summary: 'Data-informed patrol and prevention framework for high-risk zones.',
        tech: 'Forensics, Surveillance, Tactical Planning'
      },
      {
        name: 'Wayne Security Lab',
        summary: 'Prototype development of field tools for non-lethal response.',
        tech: 'Applied Technology, Product Design, Operations'
      }
    ],
    rivals: 'The Joker, Bane, and Ra\'s al Ghul.',
    photo: '/images/batman-profile-photo.png'
  }
};


// intentional fallback secrets for cookie and session signing just to be safe, so the app won't crash when freshly cloned
const COOKIE_SECRET =
  process.env.COOKIE_SECRET || 'song_cookie_secret_t9Kf4pL2vM8xQ3nB6rS1wY7zA5dU0hCx2Rj8Pq6Nv4Wm1Gy';
const SESSION_SECRET =
  process.env.SESSION_SECRET || 'song_session_secret_L8mN2qR5tV7xZ1cB4kP9sD3jF6gH0yWe5Tk3Xu9Fa7Bz';

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views'));
hbs.registerHelper('eq', (left, right) => left === right);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    name: 'connect.sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use((req, res, next) => {
  const storedTheme = req.signedCookies.theme;
  const theme = storedTheme === 'dark' ? 'dark' : 'light';

  res.locals.theme = theme;
  res.locals.user = req.session.user || null;
  res.locals.error = req.query.error || '';
  next();
});

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }
  return res.redirect('/login');
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }

  return res.render('layout', {
    pageTitle: 'Login',
    page: 'login'
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const account = users[username];

  if (!account || account.password !== password) {
    return res.redirect('/login?error=Invalid%20username%20or%20password');
  }

  req.session.user = {
    username: account.username,
    fullName: account.fullName,
    role: account.role,
    location: account.location,
    status: account.status,
    email: account.email,
    bio: account.bio,
    interest: account.interest,
    favoriteFood: account.favoriteFood,
    skills: account.skills,
    highlights: account.highlights,
    projects: account.projects,
    rivals: account.rivals,
    coursesCompleted: account.coursesCompleted,
    photo: account.photo || '/images/default-profile-photo.png'
  };

  return res.redirect('/profile');
});

app.get('/profile', requireAuth, (req, res) => {
  return res.render('layout', {
    pageTitle: 'Your Profile',
    page: 'profile'
  });
});

app.get('/toggle-theme', (req, res) => {
  const currentTheme = req.signedCookies.theme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  res.cookie('theme', nextTheme, {
    signed: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30
  });

  const referer = req.get('referer');
  return res.redirect(referer || (req.session.user ? '/profile' : '/login'));
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    return res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
