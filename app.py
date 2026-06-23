from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "AI Soil Analyzer API is running."

@app.route("/predict", methods=["POST"])
def predict():
    return {
        "moisture": "Moist",
        "soil_type": "Loamy",
        "quality": "Good",
        "confidence": 95,
        "crops": ["Rice", "Wheat", "Tomato"]
    }

if __name__ == "__main__":
    app.run(debug=True)
