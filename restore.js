import fs from "fs";
import path from "path";
import readline from "readline";
import unzipper from "unzipper";

const __dirname = process.cwd();
const backupDir = path.join(__dirname, "backups");

// Ensure backup folder exists
if (!fs.existsSync(backupDir)) {
    console.error("❌ No 'backups' folder found. Make sure you've run a backup first.");
    process.exit(1);
}

// List all available backups
const backups = fs.readdirSync(backupDir).filter(file => file.endsWith(".zip"));

if (backups.length === 0) {
    console.error("❌ No backups found in 'backups' folder.");
    process.exit(1);
}

console.log("📦 Available backups:\n");
backups.forEach((file, i) => console.log(`${i + 1}. ${file}`));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("\nEnter the number of the backup to restore: ", async (answer) => {
    const index = parseInt(answer) - 1;
    if (isNaN(index) || index < 0 || index >= backups.length) {
        console.error("❌ Invalid choice. Exiting...");
        rl.close();
        process.exit(1);
    }

    const selectedBackup = backups[index];
    const backupPath = path.join(backupDir, selectedBackup);

    console.log(`\n🔄 Restoring backup: ${selectedBackup}`);

    fs.createReadStream(backupPath)
        .pipe(unzipper.Extract({ path: __dirname }))
        .on("close", () => {
            console.log("✅ Restore complete!");
            rl.close();
        })
        .on("error", (err) => {
            console.error("❌ Restore failed:", err);
            rl.close();
        });
});
