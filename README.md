# SGPA Calculator

Hey there! Welcome to the SGPA Calculator. I built this project because manually calculating grades at the end of the semester is always a bit of a headache. This tool makes it simple to plug in marks, instantly get the exact SGPA, and save the results for later.

It is designed with a lightweight, efficient backend so it stays responsive even when a lot of students are rushing to calculate their scores right after results drop.

## What It Does Right Now

- **Instant Calculation:** Enter your marks for all core subjects and labs (DSDV, EPC, NA, COA, Math, ADSDL, LPL, SCR) and get your SGPA immediately.
- **Secure Storage:** Saves the calculated SGPA along with the Name and USN in the database.
- **Organized Records:** Every submission automatically generates a unique ID behind the scenes to keep the database clean and organized.

## Built With

- **Backend:** Node.js & Express.js
- **Database:** MySQL (Hosted on TiDB Cloud / Aiven)
- **Deployment:** Render

## What's Coming Next (Future Updates)

Calculating your own score is great, but knowing how you did compared to the rest of the batch is even better.

- **The "See Where You Stand" Feature:** In an upcoming update, I will be rolling out a ranking system. Once enough data is in the system, you will be able to check your percentile and see exactly where your SGPA places you among your peers.

## How to Run It Locally

Want to tinker with the code? Here is how to get it running on your own machine:

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up your environment variables:**

4. **start the server**

```bash
    node index.js
```

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h gateway01.ap-southeast-1.prod.aws.tidbcloud.com -P 4000 -u 39WvbtjbyHR2nGK.root -p"
