import bcrypt from "bcryptjs";
function encryptPassword(password: string): Promise<string> {
  const saltRounds: number = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, encryptedPassword: string) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

module.exports = { encryptPassword };
