// Handle form submission
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const soilPhValue = formData.get('soilPh');

    // Send soil pH value to server for prediction
    const response = await fetch(`/predict?soilPh=${soilPhValue}`);
    const predictedCrops = await response.json();

    // Display prediction results
    const predictionResults = document.getElementById('predictionResults');
    predictionResults.innerHTML = `<p>Crops predicted to grow well in soil with pH ${soilPhValue}:</p>`;
    const cropList = document.createElement('ul');
    predictedCrops.forEach(crop => {
        const listItem = document.createElement('li');
        listItem.textContent = crop;
        cropList.appendChild(listItem);
    });
    predictionResults.appendChild(cropList);
});
