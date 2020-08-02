const git = require('./git');
const { getInput, log, run } = require("./utils/action");

function runAction() {
    log('Get inputs.')
    const autoFix = getInput("auto_fix") === "true";
    const gitName = getInput("git_name", true);
    const gitEmail = getInput("git_email", true);
    const commitMessage = getInput("commit_message", true);

    log('Auto formatting the queries.');
    let output;
    try {
        output = run('./src/format_all_sql_files.sh');
    } catch (ex) {
        output = ex.stdout;
    }

    log('If the queries are formatted, push them.');
    if (autoFix) {
        if (git.hasChanges()) {
            git.setUserInfo(gitName, gitEmail);
            git.commitChanges(commitMessage);
            git.pushChanges();
        }
    }
}

runAction();