
# Lung Cancer Prediction API 🚀

## 📋 Project Description
This project is a **Lung Cancer Prediction API** built using Flask and a machine learning model. It predicts the risk of lung cancer based on various input features such as age, smoking habits, chronic lung disease history, and other medical attributes. The aim is to provide a tool for early detection of lung cancer to help with timely intervention.

## 🚀 Features
- **Prediction API**: Provides lung cancer risk prediction based on input parameters.
- **ML Model**: A trained machine learning model that uses patient data to predict lung cancer risk.
- **Flask Backend**: A lightweight backend framework serving the prediction API.
- **Interactive Frontend**: A user-friendly interface built with React and Tailwind CSS for making predictions.
- **Responsive Design**: Ensures a smooth experience on both desktop and mobile devices.

## 🛠 Tech Stack
- **Backend**: Flask, Python
- **Frontend**: React, Tailwind CSS, Motion
- **Machine Learning**: Scikit-learn, Pandas, NumPy
- **Deployment**: Localhost for development

## 📂 Project Structure
```
├── backend
│   ├── app.py
│   ├── model.pkl
│   ├── requirements.txt
│   ├── utils.py
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── PredictionForm.js
│   │   │   └── ResultCard.js
│   │   ├── App.js
│   │   └── index.js
│   └── public
│       └── index.html
├── README.md
└── .gitignore
```

## ⚙️ Installation

### Prerequisites
- Python 3.x
- Node.js
- npm / yarn
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/RAGAV-24/lung-cancer-prediction.git
cd lung-cancer-prediction
```

### 2. Backend Setup
Navigate to the `backend` folder and install the required Python packages.

```bash
cd backend
pip install -r requirements.txt
```

### 3. Run the Flask Backend
```bash
python app.py
```

The backend server will start at:
- Local: `http://127.0.0.1:5000`
- Network: `http://192.168.x.x:5000` (Replace with your network IP if needed)

### 4. Frontend Setup
Navigate to the `frontend` folder and install the dependencies.

```bash
cd ../frontend
npm install
```

### 5. Run the Frontend
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

## 🌐 API Endpoints
### POST `/predict`
Predict the risk of lung cancer based on patient data.

#### Request
```json
POST /predict
Content-Type: application/json

{
  "age": 55,
  "smoking": 1,
  "yellow_fingers": 0,
  "anxiety": 1,
  "peer_pressure": 1,
  "chronic_disease": 1,
  "fatigue": 0,
  "allergy": 0,
  "wheezing": 1,
  "alcohol_consuming": 0,
  "coughing": 1,
  "shortness_of_breath": 1,
  "swallowing_difficulty": 1,
  "chest_pain": 1
}
```

#### Response
```json
{
  "prediction": "High Risk",
  "guidance": "Immediate medical consultation is advised."
}
```

## 🐞 Troubleshooting
- **CORS Error**: Ensure the `CORS` is configured in `app.py`:
  ```python
  from flask_cors import CORS
  CORS(app)
  ```
- **400 Bad Request**: Check if the input payload format is correct when sending requests to the API.

## 📝 Requirements
Create a `requirements.txt` in the `backend` folder with the following content:
```
flask
flask-cors
scikit-learn
pandas
numpy
```

Install the requirements:
```bash
pip install -r requirements.txt
```

## 📈 Future Enhancements
- **Deployment**: Plan to deploy on cloud platforms like AWS, Azure, or Heroku.
- **Enhanced Model**: Improve the model with more features and a larger dataset.
- **Additional Features**: Add user authentication, data visualization, and downloadable reports.

## 🤝 Contribution
Feel free to contribute to this project by creating issues or submitting pull requests.
