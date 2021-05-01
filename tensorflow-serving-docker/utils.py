import base64
import sys
# import cv2
import numpy as np
import grpc
import nltk
import json
import requests
import pickle
# for grpc
# from protos.tensorflow_serving.apis import predict_pb2
# from protos.tensorflow_serving.apis import prediction_service_pb2_grpc
# from protos.tensorflow.core.framework import (
#     tensor_pb2,
#     tensor_shape_pb2,
#     types_pb2
# )

# from keras.preprocessing import text, sequence
from keras.preprocessing import text
from keras.preprocessing.sequence import sequence



#load tokenizer

# def load_tokenizer():    
#     with open('save_tokenizer/tokenizer1.pickle', 'rb') as handle:
#         tokenizer = pickle.load(handle)

def convert_text(string_text, to_rgb=False):
    if not isinstance(string_text, list):
        string_text = [string_text]
    with open('save_tokenizer/tokenizer3.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    string_seq = tokenizer.texts_to_sequences(string_text)
    string_pad = sequence.pad_sequences(string_seq, maxlen=686)
    text_converted = string_pad # string_seq
    
    print('Text_converted: ', text_converted)
    return text_converted


# for grpc
def grpc_infer(text_converted):
    pass
#     channel = grpc.insecure_channel("10.5.0.5:8500")
#     stub = prediction_service_pb2_grpc.PredictionServiceStub(channel)

#     request = predict_pb2.PredictRequest()
#     request.model_spec.name = "mnist-serving"
#     request.model_spec.signature_name = "serving_default"

#     # if img.ndim == 3:
#     #     img = np.expand_dims(img, axis=0)

#     tensor_shape = img.shape
#     dims = [tensor_shape_pb2.TensorShapeProto.Dim(size=dim) for dim in tensor_shape]  
#     tensor_shape = tensor_shape_pb2.TensorShapeProto(dim=dims)  
#     tensor = tensor_pb2.TensorProto(  
#                   dtype=types_pb2.DT_FLOAT,
#                   tensor_shape=tensor_shape,
#                   float_val=img.reshape(-1))
#     request.inputs['input_image'].CopyFrom(tensor)  

#     try:
#         result = stub.Predict(request, 10.0)
#         result = result.outputs["y_pred"].float_val
#         result = np.array(result).reshape((-1, 10))
#         result = np.argmax(result, axis=-1)

#         return result
#     except Exception as e:
#         print(e)
        # return None

def rest_infer(texts,
               model_name='saved_model',
               host='tf-serving',
               port=8501,
               signature_name="serving_default"):
    """checker - serving with http - RESTful API
    """

    data = json.dumps({
        "signature_name": signature_name,
        "instances": texts
    })
    headers = {"content-type": "application/json"}

    json_response = requests.post(
        'http://{}:{}/v1/models/{}:predict'.format(host, port, model_name),
        data=data,
        headers=headers
    )
    
    if json_response.status_code == 200:
        y_pred = json.loads(json_response.text)['predictions']
        y_pred = np.array(y_pred)
        print("y_pred", y_pred)
        return y_pred
    else:
        return None


       