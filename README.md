# klarna-exercise
A "Yellow Pages" type search app

## How to run
```
git clone git@github.com:eyalella/klarna-exercise.git
cd klarna-exercise
npm i
npm start
```

Thats it, you're good to go :D
Just open your browser @localhost:3000 and play around...

## Run dev-mode
In dev-mode you will need to run the webpack-dev-server and the API server seperatly
To do this open 2 terminal windows, in the first one run the API server
```
node server.js
```
You will see the following output:
> Server started: http://localhost:3000/

Then, on the other terminal window, run the npm dev command:
```
npm run dev
```
Just open your browser @localhost:8080 and play around...
Have fun :)
