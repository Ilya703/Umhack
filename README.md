# UmHack 🐻

While working as a tutor at Umschool, I had an idea to create an app that would check homework for me. This project is written in Node.js using Puppeteer. It opens a new browser session, logs in, and accesses the homework pool. Then, it checks each homework and compares the answers in special fields with the correct answers from a local database

If a homework has zero or one mistake, UmHack goes down the page and writes a prepared comment to sum up the results. All you have to do is to start the main.js file, wait a couple of minutes, and see how much you have earned in the report.txt file

### 🚀 Installation

1. Clone the repository:

```cmd
git clone https://github.com/Ilya703/Umhack.git
```

2. Install the dependencies:

```cmd
npm install
```

3. Start the application:

```
Set needed parameters in main.js and run this file
```

### 🛠️ Built With:

* JavaScript (ES6)
  * DOM API
  * Promises
  * npm
* Puppeteer
* Node.js
