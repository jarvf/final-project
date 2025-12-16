Lost Data
Live version:
https://jarvisfalia.com/final-project/

Project Overview

Lost Data is a public, anonymous archive where users submit short “transmissions” such as memories, messages, or fragments. While all submissions are stored intact in the database, the archive never presents a perfectly stable version of them. Each time a user views the archive, memories are re-transmitted through an unreliable system and appear partially corrupted.

The project explores the fragility of digital memory and treats loss, error, and instability as core features rather than bugs. Instead of prioritizing clean or frictionless UX, Lost Data foregrounds uncertainty and absence as meaningful parts of the browsing experience.

Endpoints

GET /entries
Retrieves all archived entries. Entries are dynamically altered at read-time based on signal strength, resulting in different corruption patterns on each request.

POST /entries
Creates a new archive entry. Accepts title, body text, tags, and signal strength. The original text is stored intact in the database.

GET /entries/:id
Retrieves a single entry by its ID, applying the same corruption logic during retrieval.

Each endpoint includes basic error handling to account for missing data or network issues.

Technologies Used

Languages:
HTML, CSS, JavaScript

Backend:
Node.js, Express

Database:
MongoDB (MongoDB Atlas)

Templating:
Handlebars (HBS)

Hosting / Deployment:
DigitalOcean server with reverse proxy and PM2 process management

Other Tools:
GitHub for version control
PM2 for process management

Credits
Conceptual inspiration from Olia Lialina’s writing on early net art and “net.language”
Express and MongoDB documentation
General debugging references from MDN Web Docs
No third-party images, fonts, or sound assets were used. All visuals rely on system fonts and custom CSS.

Future Enhancements
Time-based decay so older memories degrade more heavily over time
A “random memory” mode for non-linear archive exploration
Visual distinction between different signal strengths
Long-term archival behavior where some entries disappear entirely

