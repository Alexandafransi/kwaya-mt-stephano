// Client-side "light deterrent" password for the internal dashboard.
//
// IMPORTANT: this is NOT real security. The site has no backend, so this
// value ships inside the JS bundle and anyone who opens dev tools can read
// it or bypass the check entirely. It only keeps casual visitors out.
// If real access control is ever needed, this must be replaced with a
// server-side login backed by a database.
export const DASHBOARD_PASSWORD = "kipawa1975";
export const DASHBOARD_SESSION_KEY = "kwaya-dashboard-unlocked";
