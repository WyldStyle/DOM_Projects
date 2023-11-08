import axios from "axios"
//calls the urls from backend
import fs from "fs";
//file system read write the files

async function stealLinks() {
  const outputPath = 'stolenImage.jpg'
 axios({url: "https://wallpapercave.com/wp/wp2640663.png",method: "GET",responseType:"stream"})
 .then((response) => {
    // Create a writable stream to save the image
    const fileStream = fs.createWriteStream(outputPath);
 
    // Pipe the response data to the file stream
    response.data.pipe(fileStream);
 
    // Handle the file write completion
    fileStream.on('finish', () => {
      console.log(`Image downloaded and saved as ${outputPath}`);
    });
 
    // Handle any errors during the download
    fileStream.on('error', (error) => {
      console.error('Error saving the image:', error);
    });
  })
  .catch((error) => {
    console.error('Error downloading the image:', error);
  });

//  resultImg = await resultImg.json();
}
stealLinks();
