const { exec } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Commit message: ", (message) => {
    if (!message) {
        console.log("Commit message cannot be empty.");
        rl.close();
        return;
    }

    const commands = [
        `git add .`,
        `git commit -m "${message}"`,
        `git push origin main --force`,
        `git push dev main --force`
    ];

    console.log("\nStarting deployment process...\n");

    const runCommand = (index) => {
        if (index >= commands.length) {
            console.log("\n✅ Deployment successful to all remotes!");
            rl.close();
            return;
        }

        const command = commands[index];
        console.log(`Running: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Error executing: ${command}`);
                console.error(stderr);
                rl.close();
                return;
            }
            console.log(stdout);
            runCommand(index + 1);
        });
    };

    runCommand(0);
});
