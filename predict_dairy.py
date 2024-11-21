import pandas as pd
import numpy as np
import pickle
import json
import sys
from sklearn.preprocessing import LabelEncoder

# Load the model
with open('models/milkqty-0.1.0.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the label encoder
with open('models/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Parse input data
try:
    input_data = json.loads(sys.argv[1])
    
    # Prepare the input in the required format for the model
    features = {
        'PH': [float(input_data['ph'])],
        'Temperature': [float(input_data['temperature'])],
        'Taste': [float(input_data['taste'])],
        'Odor': [float(input_data['odor'])],
        'Fat': [float(input_data['fat'])],
        'Turbidity': [float(input_data['turbidity'])],
        'Colour': [float(input_data['colour'])]
    }
    
    # Convert features to a DataFrame
    features_df = pd.DataFrame(features)
    
    # Make prediction
    prediction = model.predict(features_df)
    
    # Decode the result
    predicted_grade = label_encoder.inverse_transform(prediction)
    
    # Output the prediction
    print(predicted_grade[0])
except Exception as e:
    print(f"Error: {e}")