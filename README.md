# Kigali Hospital Guidelines App

This cross-platform mobile application empowers physicians in Kigali, Rwanda, to quickly reference clinical guidelines, diagnose common diseases, and access infection protocols. It is built with an "offline-first" architecture to ensure reliability in low-connectivity environments, and features a completely autonomous Over-The-Air (OTA) update pipeline.

## Architecture & Backend

The app utilizes a headless CMS and OTA updates to allow non-technical medical staff to publish new guidelines instantly, completely bypassing App Store review cycles.

*   **Frontend:** React Native and Expo Router.
*   **Data Storage:** Local `.json` files bundled directly into the app for instant offline access.
*   **Content Management (CMS):** Decap CMS deployed via Netlify. Here is the link for updates: https://kigali-faisal-hospital.netlify.app/#/ . Note, user email must be registered by an admin in order to push changes.
*   **Authentication:** Netlify Identity (Git Gateway) provides a secure, email/password login portal for hospital staff, eliminating the need for developer GitHub accounts.
*   **Over-The-Air Updates:** Expo EAS Updates automated via GitHub Actions.

## Code Structure

The project relies on dynamic routing and automated file detection to minimize developer maintenance. 

*   `app/`: Contains the Expo Router UI files. 
    *   `index.jsx`: The main home screen.
    *   `all-guidelines.jsx`: Generates a dynamic list of buttons based on the JSON data.
    *   `guidelines/[id].jsx`: The universal dynamic template. It receives the guideline ID from the URL, parses the corresponding JSON, and renders the collapsible, searchable sections.
*   `kigali-health-info/data/`: The core data directory.
    *   Contains all individual clinical guideline `.json` files (e.g., `uti-adult.json`).
    *   `index.js`: Utilizes `require.context()` to automatically sweep the folder and export any newly created JSON files without manual code imports.
*   `.github/workflows/cms-update.yml`: The automation script that triggers an Expo EAS update to mobile devices whenever a change is merged into the `data/` folder.

## Workflow for Medical Staff

Doctors and hospital administrators manage app content entirely through a web browser.

1.  **Login:** Staff navigate to the secure Netlify CMS URL and log in using their email and password (via Netlify Identity).
2.  **Edit Content:** They use the graphical interface to create new guidelines or edit existing text, dosages, and bullet points.
3.  **Publish:** Clicking "Publish" automatically commits a new JSON file to the GitHub repository.
4.  **Silent Delivery:** The GitHub Action intercepts the commit and beams the new JSON data to Expo's cloud servers.
5.  **App Update:** The next time a doctor opens the app on their phone, it instantly loads the cached data, silently downloads the update in the background, and applies the new guidelines on the subsequent launch.

---
*Direct all general inquiries to zalmothafer@uwhealth.org and all technical inquiries to jasonschwartz2004@gmail.com*