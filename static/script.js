function summarize() {
    // Get the input text from the textarea
    const inputText = document.getElementById("input-text").value;

    // Create a new FormData object and add the paragraph field
    const formData = new FormData();
    formData.append("paragraph", inputText);

    // Make an asynchronous POST request to the Flask backend
    fetch("/", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Display the summarized text in the output box
        const outputBox = document.getElementById("output-box");
        outputBox.innerText = data.summarized_text;

        // Update word count for input and output sections
        updateInputWordCount();
        updateOutputWordCountAndReduction();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function clearText() {
    // Clear the input and output textareas
    document.getElementById("input-text").value = "";
    document.getElementById("output-box").innerText = "";

    // Update word count to 0 after clearing text
    updateInputWordCount();
    updateOutputWordCountAndReduction();
}

function countWords(text) {
    return text.trim().split(/\s+/).length;
}

function updateInputWordCount() {
    const inputText = document.getElementById("input-text").value;
    const inputWordCount = countWords(inputText);
    const inputWordCountElement = document.getElementById("input-word-count");
    inputWordCountElement.textContent = `Word count: ${inputWordCount}`;
}

function updateOutputWordCountAndReduction() {
    const outputText = document.getElementById("output-box").textContent;
    const outputWordCount = countWords(outputText);
    const outputWordCountElement = document.getElementById("output-word-count");
    outputWordCountElement.textContent = `Word count: ${outputWordCount}`;

    const inputText = document.getElementById("input-text").value;
    const inputWordCount = countWords(inputText);
    const percentageReduction = ((inputWordCount - outputWordCount) / inputWordCount) * 100;
    const percentageReductionElement = document.getElementById("percentage-reduction");
    percentageReductionElement.textContent = `Percentage Reduction: ${percentageReduction.toFixed(2)}%`;
}
