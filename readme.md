![image](https://github.com/savagearush/CodeTonic--Realtime-Chat-App/assets/34159015/864acc27-df6c-4e15-b8fa-b08aab30c13f)

Key Features are :

[✔️] Setup Firebase Account

[✔️] Setup Registration of User

[✔️] Login implementation

[✔️] Search Users

[✔️] Fetch Chats

[✔️] implement Live chatting

[✔️] Responsive Design

[✔️] Live Status of Current Chat

**CodeTonic Realtime Chat Application**

How to Contribute and Run CodeTonic:

**Prerequisites:**

Node.js installed on your system.
Git installed on your system.
A Firebase project with Firestore and Authentication set up (You can follow Firebase documentation for this).

**Clone the Repository:**

Open your terminal/command prompt.
Run the following command to clone the CodeTonic repository to your local machine:
  bash
  Copy code
  git clone https://github.com/yourusername/CodeTonic.git
Change "yourusername" to your GitHub username.

**Install Dependencies:**

Navigate to the project directory using the terminal:
  bash
  Copy code
  cd CodeTonic
  Install the necessary dependencies by running:
  Copy code
  npm install

**Firebase Configuration:**
Go to your Firebase project console and obtain the Firebase config credentials (apiKey, authDomain, databaseURL, projectId, etc.).
Create a new file named firebaseConfig.js inside the src folder.

Add the Firebase config details to the firebaseConfig.js file as follows:
Copy code
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
export default firebaseConfig;

Replace the placeholders with your actual Firebase config details.

**Start the Application:**
To run the application locally, use the following command:
  sql
  Copy code
  npm start

The development server will start, and the application will open in your default web browser at http://localhost:3000.


**Contributing:**
If you want to contribute to CodeTonic, you can make changes to the code in your local repository.
After making changes, add and commit your changes using Git:
  sql
  Copy code
  git add .
  git commit -m "Your descriptive commit message"

Push the changes to your GitHub repository:
css
Copy code
  git push origin main

Finally, create a pull request on the original CodeTonic repository to submit your changes for review.
Please Note: Ensure you have the necessary access rights to the original repository for creating pull requests.

With these steps, users can clone the repository, run the application locally, and contribute to CodeTonic by adding new features or fixing issues. Always ensure you thoroughly test your changes before submitting a pull request to maintain a stable and reliable chat application. Happy coding!
