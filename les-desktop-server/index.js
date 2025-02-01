const bonjour = require('bonjour')();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

bonjour.publish({
  name: 'Media Server',
  type: 'http',
  host: 'les.local',
  port: port,
  txt: { txt: 'Media Streaming Server' }
});

// Define the root media folder path
const mediaFolderPath = path.join('C:', 'Users', 'vukkumsp', 'Downloads', '0. Movies');

// Serve static files from the media folder
app.use('/media', express.static(mediaFolderPath));

// Function to list directory contents (files + folders)
function listDirectory(dirPath, relativePath = '') {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject('Unable to scan directory');
      }

      const fileDetails = files.map(file => {
        const fullPath = path.join(dirPath, file);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        const ext = path.extname(file).toLowerCase();

        // If it's a directory, create a folder link
        if (isDirectory) {
          return {
            name: file,
            type: 'folder',
            path: `/folder/${encodeURIComponent(path.join(relativePath, file))}`
          };
        } 
        // If it's a video file, create a file link
        else if (['.mp4', '.mkv', '.avi', '.webm', '.mov', '.flv', '.ogv'].includes(ext)) {
          return {
            name: file,
            type: 'file',
            path: `/video/${encodeURIComponent(path.join(relativePath, file))}`
          };
        }
      }).filter(item => item !== undefined); // Remove undefined items

      resolve(fileDetails);
    });
  });
}

// Route to display the root folder's contents
app.get('/', (req, res) => {
  listDirectory(mediaFolderPath)
    .then(fileDetails => {
      let fileLinks = `<h1>Contents of ${mediaFolderPath}</h1>`;
      
      fileDetails.forEach(item => {
        if (item.type === 'folder') {
          fileLinks += `<p>📁 <a href="${item.path}">${item.name}</a></p>`;
        } else if (item.type === 'file') {
          fileLinks += `<p>🎬 <a href="${item.path}">${item.name}</a></p>`;
        }
      });

      res.send(fileLinks);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Route to display subfolder contents
app.get('/folder/*', (req, res) => {
  const relativePath = decodeURIComponent(req.params[0]);
  const folderPath = path.join(mediaFolderPath, relativePath);

  listDirectory(folderPath, relativePath)
    .then(fileDetails => {
      let fileLinks = `<h1>Contents of ${folderPath}</h1>`;
      fileLinks += `<p><a href="/">⬅ Back to Home</a></p>`; // Add a back button

      fileDetails.forEach(item => {
        if (item.type === 'folder') {
          fileLinks += `<p>📁 <a href="${item.path}">${item.name}</a></p>`;
        } else if (item.type === 'file') {
          fileLinks += `<p>🎬 <a href="${item.path}">${item.name}</a></p>`;
        }
      });

      res.send(fileLinks);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Route to serve video files with correct Content-Type
app.get('/video/*', (req, res) => {
  const relativePath = decodeURIComponent(req.params[0]);
  const filePath = path.join(mediaFolderPath, relativePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('File not found');
    }

    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream'; // Default for unknown files

    switch (ext) {
      case '.mp4': contentType = 'video/mp4'; break;
      case '.mkv': contentType = 'video/x-matroska'; break;
      case '.avi': contentType = 'video/x-msvideo'; break;
      case '.webm': contentType = 'video/webm'; break;
      case '.mov': contentType = 'video/quicktime'; break;
      case '.flv': contentType = 'video/x-flv'; break;
      case '.ogv': contentType = 'video/ogg'; break;
    }

    res.set('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes'); // Allow video seeking
    res.setHeader('Content-Disposition', 'inline'); // Forces inline playback

    const range = req.headers.range;
    if (!range) {
      // If no range request, send the entire file
      res.setHeader('Content-Length', stats.size);
      return fs.createReadStream(filePath).pipe(res);
    }

    // Handle range-based streaming
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
    const chunkSize = end - start + 1;

    res.status(206); // Partial content for streaming
    res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`);
    res.setHeader('Content-Length', chunkSize);

    const videoStream = fs.createReadStream(filePath, { start, end });
    videoStream.pipe(res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
