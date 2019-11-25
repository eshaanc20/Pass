#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
var readlineSync = require('readline-sync');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('key');

yargs.command({
    command: 'init',
    describe: 'Initializing the module',
    handler: function () {
        fs.writeFileSync('pass.txt');
        var readFile = (fs.readFileSync("pass.txt")).toString();
        console.log(chalk.blue.bold("Pass"));
        console.log("Password manager using the terminal");
        let user = readlineSync.question("Username: ");
        let pass = readlineSync.question("Password: ");
        let object = {username: user, password: pass};
        let JSONdata = JSON.stringify(object);
        const encryptedString = cryptr.encrypt(JSONdata);
        fs.writeFileSync('pass.txt', encryptedString);
    }
})

yargs.command({
    command: 'add',
    describe: 'Add new password',
    builder: {
    },
    handler: function () {
        console.log(chalk.blue.bold("Pass"));
        if (!fs.existsSync('./pass.txt')) {
            console.log("Run the command pass init")
        } else {
            var readFile = (fs.readFileSync("pass.txt")).toString();
            const decryptedString = cryptr.decrypt(readFile);
            let data = JSON.parse(decryptedString);
            let pass = readlineSync.question("Password: ", {hideEchoBack: true});
            if (pass == data.password) {
                console.log();
                console.log(chalk.bold("Hello " + data.username + ", which new password do you want to add?"))
                let newApplication = readlineSync.question("Application: ");
                let newPassword = readlineSync.question("Password: ");
                data[newApplication] = newPassword;
                let JSONdata = JSON.stringify(data);
                const encryptedString = cryptr.encrypt(JSONdata);
                fs.writeFileSync('pass.txt', encryptedString);
                console.log(chalk.green("New password added"))
            } else (
                console.log(chalk.red("Incorrect password"))
            )
        }
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove password',
    builder: {
    },
    handler: function () {
        console.log(chalk.blue.bold("Pass"));
        if (!fs.existsSync('./pass.txt')) {
            console.log("Run the command pass init")
        } else {
            var readFile = (fs.readFileSync("pass.txt")).toString();
            const decryptedString = cryptr.decrypt(readFile);
            let data = JSON.parse(decryptedString);
            let pass = readlineSync.question("Password: ", {hideEchoBack: true});
            if (pass == data.password) {
                console.log();
                console.log(chalk.bold("Hello " + data.username + ", which password do you want to remove?"))
                let application = readlineSync.question("Application: ");
                if (data[application] == undefined) {
                    console.log(chalk.red("Password does not exist"));
                } else {
                    delete data[application]
                    let JSONdata = JSON.stringify(data);
                    const encryptedString = cryptr.encrypt(JSONdata);
                    fs.writeFileSync('pass.txt', encryptedString);
                    console.log(chalk.red("Password removed"))
                }
            } else (
                console.log(chalk.red("Incorrect password"))
            )
        }
    }
})

yargs.command({
    command: 'get',
    describe: 'Get password',
    builder: {
    },
    handler: function () {
        console.log(chalk.blue.bold("Pass"));
        if (!fs.existsSync('./pass.txt')) {
            console.log("Run the command pass init")
        } else {
            var readFile = (fs.readFileSync("pass.txt")).toString();
            const decryptedString = cryptr.decrypt(readFile);
            let data = JSON.parse(decryptedString);
            let pass = readlineSync.question("Password: ", {hideEchoBack: true});
            if (pass == data.password) {
                console.log();
                console.log(chalk.green("Hello " + data.username + ", which password do you want to get?"))
                let application = readlineSync.question("Application: ");
                if (data[application] == undefined) {
                    console.log(chalk.red("Password does not exist"));
                } else {
                    console.log("Password: " + data[application]);
                }
            } else (
                console.log(chalk.red("Incorrect password"))
            )
        }
    }
})

yargs.command({
    command: 'view',
    describe: 'View all applications',
    builder: {
    },
    handler: function (argv) {
        console.log(chalk.blue.bold("Pass"));
        if (!fs.existsSync('./pass.txt')) {
            console.log("Run the command pass init")
        } else {
            var readFile = (fs.readFileSync("pass.txt")).toString();
            const decryptedString = cryptr.decrypt(readFile);
            let data = JSON.parse(decryptedString);
            let pass = readlineSync.question("Password: ", {hideEchoBack: true});
            if (pass == data.password) {
                console.log();
                console.log(chalk.bold("Hello " + data.username + ", the following are all the application you have added."));
                let applications = Object.keys(data);
                applications.map((application, index) => {
                    if (index != 0 && index != 1) {
                        console.log(application);
                    }
                })
            } else (
                console.log(chalk.red("Incorrect password"))
            )
        }
    }
})

yargs.parse()
