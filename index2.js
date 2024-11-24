const bcrypt = require('bcrypt-nodejs');




bcrypt.hash("N/37070", 10, (err, hash) => {
    if (err) {
        // Handle error
        return;
    }

// Hashing successful, 'hash' contains the hashed password
console.log('Hashed password:', hash);
});