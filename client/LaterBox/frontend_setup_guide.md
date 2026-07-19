>> Project Creation <<
- npm create vite@latest ProjectName

>> Optional Dependencies <<
- reac-router-dom
- lucide-react (react icons)
- axios

>> Setup axios <<
- install axios
- create a utility file
- inside that file use axios.create() then inside: 
    { 
        baseURL: "http://localhost:3000",
        withCredentials: true 
    }
- then export and use in the http methods like base.get

>> Tailwind CSS <<
- npm install tailwindcss @tailwindcss/vite
- inside the vite.config.js import the tailwindcss then insert it in the plugins
- add a resolve property and inside it is dedupe property containing an array ['react', 'react-dom']

>> Github Pages Deployment Setup <<
- vite config
    - add a base property with your web app base name '/LaterBox/'

- package.json
    - add these inside the script property:
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
    - add a homepage property  
        ex. "homepage": "https://andwehehe.github.io/LaterBox",

>> Github Actions Deployment Setup <<
- same steps as Github Pages Deployment Setup
- additional steps:
    - create a new folder inside the project folder named .github
    - inside .github, create another folder named workflows
    - inside workflows create a file named deploy.yml
    - inside deploy.yml paste these:
        name: Deploy Vite site to GitHub Pages

        on:
        push:
            branches:
            - main

        permissions:
        contents: read
        pages: write
        id-token: write

        concurrency:
        group: pages
        cancel-in-progress: true

        jobs:
        build:
            runs-on: ubuntu-latest

            steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
                with:
                node-version: 22
                cache: npm

            - run: npm install

            - run: npm run build

            - uses: actions/upload-pages-artifact@v3
                with:
                path: ./dist

        deploy:
            environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}

            needs: build

            runs-on: ubuntu-latest

            permissions:
            pages: write
            id-token: write

            steps:
            - id: deployment
                uses: actions/deploy-pages@v4
    
    - go to your repository > settings > pages
    - under build and deployment, select github actions

>> Commit and push code to Github <<
- First Commit
    - git init
    - git add .
    - git commit -m "commit message"
    - git branch -M main
    - git remote add origin >repo link<
    - git push -u origin main

- Future Commits
    - git add .
    - git commit -m "commit message"
    - git push -u origin main