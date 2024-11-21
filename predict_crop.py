import sys
import json
import pandas as pd
import numpy as np
import pickle

# Load the model
with open('models\crop_recommendation.pkl', 'rb') as f:
    clf_loaded = pickle.load(f)

# Parse input data
try:
    input_data = json.loads(sys.argv[1])
    
    # Prepare the input in the required format for the model
    features = [
        float(input_data['nitrogen']),
        float(input_data['phosphorus']),
        float(input_data['potassium']),
        float(input_data['temperature']),
        float(input_data['humidity']),
        float(input_data['ph']),
        float(input_data['rainfall'])
    ]

    # Convert features to DataFrame with appropriate column names
    feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    features_df = pd.DataFrame([features], columns=feature_names)

    # Make prediction
    prediction = clf_loaded.predict(features_df)[0]

    # Convert prediction to standard Python type (int or str)
    if isinstance(prediction, (np.int32, np.int64)):
        prediction = int(prediction)

    # Print the prediction as JSON
    print(json.dumps(prediction))

except Exception as e:
    # Handle potential errors gracefully
    error_message = {'error': str(e)}
    print(json.dumps(error_message))
