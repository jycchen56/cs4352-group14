# Crewly - Club Management & Event Prototype

## UI Functionality & Changes
This prototype demonstrates the core functionality of **Crewly**, a club and event management platform. The UI has been designed to allow users to seamless join clubs, create events, and manage community interactions.

### Key Features:
*   **Explore:** Browse and join available clubs and events.
*   **Club View:** Access detailed club information, including upcoming events and group chats.
*   **Event Creation:** Create new clubs or events with details like title, description, time, and location.
*   **Chat:** Real-time (simulated) chat functionality within clubs to engage with members.
*   **Management:** "My Clubs" section for managing roles and club-specific settings (Mockup).
*   **Notifications:** View upcoming event reminders (Simulated for specific users).

## Operating Instructions

### Prerequisites
*   **Node.js:** Required to run the development server.
*   **npm:** Comes with Node.js.
*   **Expo Go (Optional):** Recommended for testing on a physical mobile device (iOS/Android).

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jycchen56/cs4352-group14.git
    cd cs4352-group14
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the UI
1.  **Start the development server:**
    ```bash
    npx expo start
    ```
2.  **Open the App:**
    *   **Mobile:** Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS).
    *   **Web:** Press `w` in the terminal to open in a web browser.
    *   **Emulator:** Press `a` (Android) or `i` (iOS) if you have emulators set up.

## Test User Credentials
The system uses in-memory user management. Use the following credentials to test different personas:

| Role | Username | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Demo User** | `alex` | `alex` | **Primary Test User.** Has pre-populated club memberships and events. |
| **New User** | `you` | `you` | Empty state user for testing fresh onboarding. |
| User 3 | `sam` | `sam` | Additional member for chat simulation. |
| User 4 | `carmen` | `carmen` | Additional member for chat simulation. |

> **Note:** The login screen accepts these credentials to switch the current active user context.

## Known Limitations
*   **Data Persistence:** This is a **prototype**. All data (newly created events, messages, joined clubs) is stored **in-memory**. Reloading the app or restarting the server will reset all data to its initial state.
*   **Backend:** There is no real backend server. All logic is handled locally within the client state.
*   **Authentication:** Passwords are stored in plaintext for demonstration purposes only.
*   **Navigation:** Deep linking and some back-button behaviors are optimized for the demo flow and may not cover every edge case.

## Source & Dependencies
For a full list of external dependencies and software development kits (SDKs) used in this project, please refer to the **[Source.md](./Source.md)** document included in this repository.
