const tf = require('@tensorflow/tfjs');

async function loadModel() {
  return await tf.loadLayersModel('file://./my-model/model.json');
}

async function predict(urlFeatures) {
  const model = await loadModel();
  
  const input = tf.tensor2d([urlFeatures]);
  const prediction = model.predict(input);
  
  prediction.print(); // Print the probability of phishing
}

// Example usage
const urlFeatures = [/* your feature values */];
predict(urlFeatures);
