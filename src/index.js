// https://github.com/samuelmeuli/lint-action/blob/master/LICENSE.md

const git = require('./git');
const { getContext } = require("./github/context");
const { getInput, log, run } = require("./utils/action");

function runAction() {
    log('Get inputs.')
    const context = getContext();
    const autoFix = getInput("auto_fix") === "true";
    const gitName = getInput("git_name", true);
    const gitEmail = getInput("git_email", true);
    const commitMessage = getInput("commit_message", true);

    log('Auto formatting the queries.');
    let output;
    try {
        output = run("for file in `find . -name '*.sql'`; do zetasql-formatter $file; done");
    } catch (ex) {
        output = ex.stdout;
    }

	if (context.eventName === "pull_request") {
		// Fetch and check out PR branch:
		// - "push" event: Already on correct branch
		// - "pull_request" event on origin, for code on origin: The Checkout Action
		//   (https://github.com/actions/checkout) checks out the PR's test merge commit instead of the
		//   PR branch. Git is therefore in detached head state. To be able to push changes, the branch
		//   needs to be fetched and checked out first
		// - "pull_request" event on origin, for code on fork: Same as above, but the repo/branch where
		//   changes need to be pushed is not yet available. The fork needs to be added as a Git remote
		//   first
		git.checkOutRemoteBranch(context);
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