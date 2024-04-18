const fs = require('fs');

// File path
const filePath = 'test.txt';

// Read the content of the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Modify the content (for example, append something to it)
  const modifiedContent = 'atate';

  // Write the modified content back to the file
  fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('File modified successfully.');
  });
});
