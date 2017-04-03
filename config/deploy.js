'user strict';

const shell = require('shelljs');
const deployInfo = require('../package').deploy;
require('dotenv').config();

// Suppress all command output
// since we do not need it
shell.config.silent = true;

const helpers = {
    log: function() {
        const chalk = require('chalk');
        const output = function(message, textColor, bgColor, noOutput) {
            const print = bgColor ? chalk[bgColor][textColor] : chalk[textColor];
            return noOutput ? print(message) : console.log(print(message));
        }
        return {
            error: function(m) { return output(m, 'red'); },
            fatal: function(m) { return output(m, 'black', 'bgRed'); },
            info: function(m) { return output(m, 'blue'); },
            success: function(m) { return output(m, 'green'); },
            white: function(m) { return output(m, 'white', null, true) }
        };
    },
    getExec: function(command) {
        return ''+((shell.exec(command).output).replace("\n", "")).replace(/\\/g, '/');
    },
    isGitDirty: function() {
        return !!(helpers.getExec('git status --porcelain -uno'));
    },
    isMasterBranch: function() {
        console.log(helpers.getExec('git rev-parse --abbrev-ref HEAD').trim());
        return (helpers.getExec('git rev-parse --abbrev-ref HEAD').trim() === 'master');
    },
    appendValToArrayEl: function(array, val) {
        return array.map(function(el){ return val+el });
    },
    getRsycnCommand: function(conf) {
        const argsToString = function(args, strToAppend) {
            return helpers.appendValToArrayEl(args, strToAppend).join(' ');
        }
        return `rsync ${conf.src} --rsync-path="mkdir -p ${conf.dest} && rsync" ${conf.user}@${conf.host}:${conf.dest} --rsh "ssh -p 2222" ${argsToString(conf.args, '--')} ${argsToString(conf.exclude, '--exclude=')}` ;
    }
};
const log = helpers.log();
const user = process.env.RSYNC_USER;

if (!user) {
    return log.fatal('Please set RSYNC_USER in your /.env file or as an ENV var. Aborting.');
}
if (helpers.isGitDirty()) {
    log.error("Please make sure you committed everything. Deployment is not possible because it creates inconsistency between the repo and the files on production.")
    return log.fatal('No dirty pushing is allowed! Aborting.');
}
if (!helpers.isMasterBranch()) {
    return log.fatal('Pushing to production is only allowed from the master branch! Aborting.');
}

deployInfo.user = user;

const command = helpers.getRsycnCommand(deployInfo);

log.info(`rsyncing ${deployInfo.src} >>>> ${deployInfo.host}:${deployInfo.dest}\n`);
log.info(`executing: ${log.white(command)}\n`);

// show rsync output once everything is set up
shell.config.silent = false;

const exec = shell.exec(command);
if (exec.code !== 0) {
    log.fatal(`\nDeployment failed!`);
    exit(1);
    return;
}

log.success('\nDEPLOY SUCCESS!\n');
