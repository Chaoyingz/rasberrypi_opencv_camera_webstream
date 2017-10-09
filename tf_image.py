# coding: utf-8
import os

classify_path = "/home/pi/Ras/venv/lib/python3.5/site-packages/tensorflow/models/image/imagenet/classify_image.py"

model_path = "tensorflow/model"

image_path = "image-1.jpg"

print("已开始识别,请稍等....")
fouput = os.popen("python " + classify_path + " --model_dir " + model_path + " --image_file " + image_path)
result = fouput.readlines()

for i in result:
    i = i.strip('\n')
    print(i)
