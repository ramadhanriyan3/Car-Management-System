import bcrypt from "bcryptjs";

async function checkPassword(encryptedPassword: string, password: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      password,
      encryptedPassword,
      (err, isPasswordCorrect: boolean) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(isPasswordCorrect);
      }
    );
  });
}

module.exports = { checkPassword };
