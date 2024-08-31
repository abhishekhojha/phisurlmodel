const tf = require('@tensorflow/tfjs');
const loadData = require('./data');

async function createModel() {
  const model = tf.sequential();

  // Define model architecture
  model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [/* number of features */] }));
  model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}

async function trainModel() {
  const { xs, ys } = await loadData();
  const model = await createModel();

  await model.fit(xs, ys, {
    epochs: 10,
    validationSplit: 0.2,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss' }),
  });

  console.log('Model trained');
  await model.save('file://./my-model');
}

trainModel();
