#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
var readlineSync = require('readline-sync');
var encryptor = require('file-encryptor');

var readFile = (fs.readFileSync("pass.txt")).toString();

yargs.command({
    command: 'init',
    describe: 'Start application',
    handler: function () {
        var readFile = (fs.readFileSync("pass.txt")).toString();
        console.log(chalk.blue.bold("Pass"));
        console.log("Password manager using the terminal");
        let user = readlineSync.question("Username: ");
        let pass = readlineSync.question("Password: ");
        let object = {username: user, password: pass};
        let JSONdata = JSON.stringify(object);
        fs.writeFileSync('pass.txt', JSONdata);
    }
})

yargs.command({
    command: 'add',
    describe: 'Add new password',
    builder: {
    },
    handler: function (argv) {
        console.log(chalk.blue.bold("Pass"));
        var readFile = (fs.readFileSync("pass.txt")).toString();
        let data = JSON.parse(readFile);
        let pass = readlineSync.question("Password: ");
        if (pass == data.password) {
            console.log();
            console.log(chalk.bold("Hello " + data.username))
            console.log(chalk.blue.bold("New Password"))
            let newApplication = readlineSync.question("Application: ");
            let newPassword = readlineSync.question("Password: ");
            data[newApplication] = newPassword;
            let JSONdata = JSON.stringify(data);
            fs.writeFileSync('pass.txt', JSONdata);
            console.log(chalk.green("New password added"))
        } else (
            console.log(chalk.red("Incorrect password"))
        )
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove password',
    builder: {
    },
    handler: function (argv) {
        let options = ['Add', 'Remove', 'View']
        let option = readlineSync.question(options, "Which option");
    }
})


yargs.parse()
