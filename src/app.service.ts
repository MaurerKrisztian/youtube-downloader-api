import { Injectable } from '@nestjs/common';
const { exec } = require('child_process');

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  runInCommandLine(command: string) {
    return new Promise(async (resolve, reject) => {
      await exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout ${stdout}`);
        resolve(stdout);
      });
    });
  }
}
