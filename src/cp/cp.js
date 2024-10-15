import { spawn } from "child_process";

const spawnChildProcess = async (args) => {
  const childProcess = spawn("node", ["src/cp/files/script.js", ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess(["someArgument1", "someArgument2"]);
