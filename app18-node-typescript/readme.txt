1. npm install --save typescript (to install typescript)
2. npx tsc --init   (to initialize tsconfig.json file)
3. tsc  (this command will compile the js files to ts)
but we cannot do this process of compiling again and again manually hence we do,
4. npm install -D ts-node 
5. in package.json scripts add: "start": "ts-node-dev --respawn src/index.ts"  
npm run start
(this will watch our files and if we make any changes it will run automatically)

same thing can be done with package called nodemon:

6. npm install -D nodemon
7. in package.json scripts add:  "dev": "nodemon --exec ts-node src/index.ts"
npm run dev
