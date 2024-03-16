const tf = require('@tensorflow/tfjs');
const cropData = require('./Data.json');

// Preprocess the crop data into tensors
const pHRanges = cropData.crops.map(crop => crop.pH_range.split(' - ').map(Number));
const cropNames = cropData.crops.map(crop => crop.name);
const pHRangeTensors = tf.tensor2d(pHRanges);

// Function to predict crops based on soil pH value
function CropDetector(soilPhValue) {
    // Convert the soil pH value to a tensor
    const inputTensor = tf.tensor1d([soilPhValue]);

    // Normalize the input tensor
    const normalizedInput = inputTensor.div(tf.scalar(10)); // Assuming pH values are between 0 and 14

    // Find crops that fall within acceptable pH range
    const acceptableCropsIndices = [];
    for (let i = 0; i < pHRanges.length; i++) {
        const [min, max] = pHRanges[i];
        if (soilPhValue >= min && soilPhValue <= max) {
            acceptableCropsIndices.push(i);
        }
    }

    // Retrieve predicted crop names
    const predictedCrops = acceptableCropsIndices.map(index => cropNames[index]);

    return predictedCrops;
}

module.exports = { CropDetector };
