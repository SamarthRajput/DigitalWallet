## Digital Wallet App

Created a Digital Wallet App.  

It has the following features:-
- User Sign in: Secure login and credentials gets hashed before storing them in the database.
- On ramp: Users can easily on-ramp funds from their bank accounts.
- Transfer: Send money to friends directly through phone number-based transfers (p2p).
- Recent Transactions: Keep track of all your recent transactions.

**Tech Stack used** :
- Turbo Repo: Organizing the project into separate apps—merchant, user, and bank webhook server.
- CI: Integrated Continuous Integration for automated testing.
- Frontend: Next.js with Tailwind CSS for a stylish and responsive UI.
- Backend: Next.js for the user-app, merchant-app and express.js for bank-webhook server.
- Language: TypeScript for type safety.
- Authentication: Next Auth to ensure secure user sessions.
- Database: Postgres for efficient data storage and retrieval.
- ORM: Prisma with connection pooling for smooth database interactions.

**Starting the Project Locally**
1. Go to packages/db and replace the original database url in the .env file with your own database url respectively.
2. Run the following command 
    - ` npx prisma migrate dev ` to migrate the schema
    - ` npx prisma generate ` to generate the client
    - ` npx prisma db seed ` to seed the database

3. Now go to the apps/user-app folder
    - ` cd apps/user-app `
4. Run the following command to start the application locally
    - ` npm run dev `
5. Go to the apps/bank-webhook folder to start the bank webhook locally
    -  ` cd apps/bank-webhook `
    -  ` npm run dev `

# Contributing to the repositry will be appreciated

