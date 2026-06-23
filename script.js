// Select elements
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

// Image Preview
imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);

});

// Analyze Button
async function analyzeSoil() {

    const file = imageInput.files[0];

    if (!file) {
        alert("Please select a soil image.");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none";

    const formData = new FormData();
    formData.append("image", file);

    try {

        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("loading").style.display = "none";
        document.getElementById("result").style.display = "block";

        document.getElementById("moisture").textContent = data.moisture;
        document.getElementById("soilType").textContent = data.soil_type;
        document.getElementById("quality").textContent = data.quality;
        document.getElementById("confidence").textContent = data.confidence + "%";

        const crops = document.getElementById("crops");
        crops.innerHTML = "";

        data.crops.forEach(crop => {
            const li = document.createElement("li");
            li.textContent = crop;
            crops.appendChild(li);
        });

    } catch (error) {

        document.getElementById("loading").style.display = "none";

        alert("Unable to connect to the AI server.");

        console.error(error);

    }

}
