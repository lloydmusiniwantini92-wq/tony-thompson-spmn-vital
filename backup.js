import fs from "fs";
import path from "path";
import archiver from "archiver";

// ✅ Prevent automatic runs during dev/build unless explicitly called
if (process.env.MANUAL_BACKUP !== "true") {
    process.exit(0); // silent skip — no message clutter
}

const rootDir = process.cwd();
const backupDir = path.join(rootDir, "backups");

// Ensure backups folder exists
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

// === Create new backup ===
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupFile = path.join(backupDir, `backup-${timestamp}.zip`);

const output = fs.createWriteStream(backupFile);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
    console.log(`\x1b[35m✅ Backup created: ${backupFile}\x1b[0m`);
    console.log(`📦 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
});

archive.on("error", (err) => {
    throw err;
});

archive.pipe(output);

// === Include directories and files ===
const includeDirs = ["src", "public"];
const includeFiles = [
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "package.json",
    "package-lock.json",
];

includeDirs.forEach((dir) => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
        archive.directory(dirPath, dir);
    }
});

includeFiles.forEach((file) => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
    }
});

await archive.finalize();

// === Auto-delete backups older than 7 days ===
const now = Date.now();
const sevenDays = 7 * 24 * 60 * 60 * 1000;

fs.readdirSync(backupDir)
    .filter((file) => file.endsWith(".zip"))
    .forEach((file) => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        const age = now - stats.mtimeMs;
        if (age > sevenDays) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted old backup: ${file}`);
        }
    });
