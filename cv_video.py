from picamera.array import PiRGBArray
from picamera import PiCamera

import time
import io
import multiprocessing as mp

import cv2


class Camera():

    def get_frame(self):
        with PiCamera() as camera:

            camera.resolution = (640, 480)
            camera.framerate = 32
            rawCapture = PiRGBArray(camera, size=(640, 480))

            face_cascade = cv2.CascadeClassifier("/home/pi/Ras/opencv_data/haarcascade_frontalface_alt.xml")
            time.sleep(0.1)

            t_start = time.time()
            fps = 0

            for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):

                img = frame.array

                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray)
                for (x, y, w, h) in faces:
                    cv2.rectangle(img, (x,y), (x+w, y+h), (255, 255, 255), 1)

                fps = fps + 1
                sfps = fps / (time.time() - t_start)
                cv2.putText(img, "FPS:" + str(int(sfps)), (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

                jpeg = cv2.imencode('.jpg', img)[1]

                rawCapture.seek(0)
                return jpeg.tobytes()

                rawCapture.truncate(0)
