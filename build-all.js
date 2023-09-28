const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

checkInDir(`${process.cwd()}/server-data/resources`, "skye-");

function containsScriptFiles(dir) {
    return fs.existsSync(path.join(dir, 'package.json')) && fs.existsSync(path.join(dir, 'fxmanifest.lua'));
}

function runNpmInstallAndNpmBuild(dir) {
    exec('npm i', { cwd: dir }, (npmError, npmStdout) => {
        if (npmError) return console.error(`Error installing dependencies in ${dir}: ${npmError}`);
        console.log(`Install output in ${dir}: ${npmStdout}`);

        exec('npm run build', { cwd: dir }, (buildError, buildStdout) => {
            if (buildError) return console.error(`Error building in ${dir}: ${buildError}`);
            console.log(`Build output in ${dir}: ${buildStdout}`);
        });
    });
}

function checkInDir(directory, startsWith = "") {
    const dirs = fs.readdirSync(directory);
    
    dirs.forEach((dir) => {
        const dirPath = path.join(directory, dir);

        if (fs.statSync(dirPath).isDirectory() && containsScriptFiles(dirPath) && dir.startsWith(startsWith)) {
            runNpmInstallAndNpmBuild(dirPath);
        } else if (fs.statSync(dirPath).isDirectory()) {
            checkInDir(dirPath);
        }
    });
}