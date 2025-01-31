const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   console.log("inside root endpoint")
//   console.log(__dirname);
//   res.status(200);
//   res.json({
//     "message": "success"
//   })
// });

// app.get('/media/:filename', (req, res) => {
//     //test path: GET http://localhost:3000/media/watchmenI.mp4
//   const filePath = path.join(__dirname, 'media', req.params.filename);
//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;

//   if (range) {
//     const [start, end] = range.replace(/bytes=/, '').split('-');
//     const startByte = parseInt(start, 10);
//     const endByte = end ? parseInt(end, 10) : fileSize - 1;

//     res.status(206);
//     res.set({
//       'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': endByte - startByte + 1,
//       'Content-Type': 'video/mp4',
//     });

//     const fileStream = fs.createReadStream(filePath, { start: startByte, end: endByte });
//     fileStream.pipe(res);
//   } else {
//     res.set('Content-Length', fileSize);
//     res.set('Content-Type', 'video/mp4');
//     fs.createReadStream(filePath).pipe(res);
//   }
// });

// app.listen(port, () => {
//   console.log(`Media server running at http://localhost:${port}`);
// });



// // Serve static files from the media folder (for direct access)
// app.use('/media', express.static(path.join(__dirname, 'media')));

// // Route to list files in the /media directory
// app.get('/', (req, res) => {
//   // const mediaFolderPath = path.join(__dirname, 'media');
//   const mediaFolderPath = path.join('C:', 'Users', 'vukkumsp', 'Downloads', '0. Movies');
//   fs.readdir(mediaFolderPath, (err, files) => {
//     if (err) {
//       return res.status(500).send('Unable to scan directory');
//     }

//     // Filter out non-video files if necessary, or you can list all files
//     const videoFiles = files.filter(file => {
//       const ext = path.extname(file).toLowerCase();
//       return ['.mp4', '.mkv', '.avi', '.webm', '.mov', '.flv', '.ogv'].includes(ext);
//     });

//     // Build HTML with clickable links to video files
//     let fileLinks = '<h1>Video Files</h1>';
//     videoFiles.forEach(file => {
//       const filePath = path.join('/media', file);
//       fileLinks += `<p><a href="/video/${file}">${file}</a></p>`;
//     });

//     res.send(fileLinks);
//   });
// });

// // Route to serve video files with correct Content-Type
// app.get('/video/:file', (req, res) => {
//   const fileName = req.params.file;
//   const filePath = path.join(__dirname, 'media', fileName);

//   fs.stat(filePath, (err, stats) => {
//     if (err || !stats.isFile()) {
//       return res.status(404).send('File not found');
//     }

//     const ext = path.extname(fileName).toLowerCase();
//     let contentType = 'application/octet-stream'; // Default for non-video files

//     switch (ext) {
//       case '.mp4':
//         contentType = 'video/mp4';
//         break;
//       case '.mkv':
//         contentType = 'video/x-matroska';
//         break;
//       case '.avi':
//         contentType = 'video/x-msvideo';
//         break;
//       case '.webm':
//         contentType = 'video/webm';
//         break;
//       case '.mov':
//         contentType = 'video/quicktime';
//         break;
//       case '.flv':
//         contentType = 'video/x-flv';
//         break;
//       case '.ogv':
//         contentType = 'video/ogg';
//         break;
//     }

//     res.set('Content-Type', contentType);
//     fs.createReadStream(filePath).pipe(res);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// Path to the new media folder on your PC (Windows example)
// const mediaFolderPath = path.join('C:', 'Users', 'vukkumsp', 'Downloads', '0. Movies');

// // Serve static files from the custom media folder
// app.use('/media', express.static(mediaFolderPath));

// // Function to recursively list files and folders
// function listDirectory(dirPath) {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dirPath, (err, files) => {
//       if (err) {
//         reject('Unable to scan directory');
//       }

//       const fileDetails = files.map(file => {
//         const fullPath = path.join(dirPath, file);
//         const ext = path.extname(file).toLowerCase();
//         const isDirectory = fs.statSync(fullPath).isDirectory();
        
//         // If it's a directory, we return it as a folder link
//         if (isDirectory) {
//           return {
//             name: file,
//             type: 'folder',
//             path: fullPath
//           };
//         } 
//         // If it's a video file, return it as a file link with content type
//         else if (['.mp4', '.mkv', '.avi', '.webm', '.mov', '.flv', '.ogv'].includes(ext)) {
//           return {
//             name: file,
//             type: 'file',
//             path: `/video/${file}`
//           };
//         }
//       }).filter(item => item !== undefined); // Remove undefined items

//       resolve(fileDetails);
//     });
//   });
// }

// // Route to display the contents of a directory
// app.get('/folder/*', (req, res) => {
//   const folderPath = decodeURIComponent(req.params[0]);
//   listDirectory(folderPath)
//     .then(fileDetails => {
//       let fileLinks = `<h1>Contents of ${folderPath}</h1>`;
      
//       fileDetails.forEach(item => {
//         if (item.type === 'folder') {
//           fileLinks += `<p><a href="/folder/${encodeURIComponent(item.path)}">${item.name}</a></p>`;
//         } else if (item.type === 'file') {
//           fileLinks += `<p><a href="${item.path}">${item.name}</a></p>`;
//         }
//       });
      
//       res.send(fileLinks);
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// // Route to serve video files with correct Content-Type
// app.get('/video/:file', (req, res) => {
//   const fileName = req.params.file;
//   const filePath = path.join(mediaFolderPath, fileName);

//   fs.stat(filePath, (err, stats) => {
//     if (err || !stats.isFile()) {
//       return res.status(404).send('File not found');
//     }

//     const ext = path.extname(fileName).toLowerCase();
//     let contentType = 'application/octet-stream'; // Default for non-video files

//     switch (ext) {
//       case '.mp4':
//         contentType = 'video/mp4';
//         break;
//       case '.mkv':
//         contentType = 'video/x-matroska';
//         break;
//       case '.avi':
//         contentType = 'video/x-msvideo';
//         break;
//       case '.webm':
//         contentType = 'video/webm';
//         break;
//       case '.mov':
//         contentType = 'video/quicktime';
//         break;
//       case '.flv':
//         contentType = 'video/x-flv';
//         break;
//       case '.ogv':
//         contentType = 'video/ogg';
//         break;
//     }

//     res.set('Content-Type', contentType);
//     fs.createReadStream(filePath).pipe(res);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//------------------------------------------------------------------------------------

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
