const fs = require('fs');
const csv = require('csv-parser');
const tf = require('@tensorflow/tfjs');

async function loadData() {
  const features = [];
  const labels = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream('dataseturl.csv')
      .pipe(csv())
      .on('data', (row) => {
        features.push([
          parseFloat(row.feature1), // Adjust these according to your dataset
          parseFloat(row.feature2),
          // Add more features as needed
        ]);

        labels.push(parseInt(row.label)); // Adjust according to your label column
      })
      .on('end', () => {
        const xs = tf.tensor2d(features);
        const ys = tf.tensor1d(labels, 'int32');
        resolve({ xs, ys });
      })
      .on('error', reject);
  });
}

module.exports = loadData;
