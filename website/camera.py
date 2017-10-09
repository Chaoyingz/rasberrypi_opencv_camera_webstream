# coding: utf-8
import picamera
import io
import time
from base_camera import BaseCamera

# opencv models
import cv2
import numpy as np
from picamera.array import PiRGBArray

class Camera(BaseCamera):

    @staticmethod
    def frames():
        with picamera.PiCamera() as camera:

            #time.sleep(2)

            stream = io.BytesIO()
            for foo in camera.capture_continuous(stream, 'jpeg',
                                                 use_video_port=True):
                foo.seek(0)
                yield foo.read()

                foo.seek(0)
                stream.truncate()


