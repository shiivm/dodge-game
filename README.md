# dodge-game

A application built in **NodeJS**, **ExpressJS**, **MongoDB** and **ReactJS**


## Getting Started

### Get Project Running
1. Clone the project from github.

2. Install dependencies.
```bash
cd dodge-game
npm install
npm run client-install
```
3. Setup environment variables. 
- Rename `.env.sample` to `.env`.

 ```bash
mv .env.sample .env
```
- Update the `.env` file with your values.


### Running the server locally.
```bash
npm run dev
```
### Running the server as production.
```bash
cd client
npm run build
cd ../
npm run start
```
