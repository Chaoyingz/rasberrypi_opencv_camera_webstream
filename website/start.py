#coding: utf-8
from flask import Flask, render_template, jsonify, Response
from flask_socketio import SocketIO, emit
import psutil
import os
import serial
from camera import Camera

app = Flask(__name__)
socketio = SocketIO(app)
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)

# 硬件信息 JSON
@app.route('/server_info', methods=['GET', 'POST'])
def server_info():
    cpu_percent = psutil.cpu_percent(0) + 40
    memory_percent = psutil.virtual_memory().percent + 40
    server_info = {'cpu_percent': cpu_percent, 'memory_percent': memory_percent}
    return jsonify(server_info)

# 网络IO JSON
@app.route('/net_info', methods=['GET', 'POST'])
def net_info():
    bt_sent = psutil.net_io_counters()[0]
    bt_recv = psutil.net_io_counters()[1]
    net_info = {'bt_sent': bt_sent, 'bt_recv': bt_recv}
    return jsonify(net_info)

# 逐帧推送画面
def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# 直播流
@app.route('/video_feed')
def video_feed():
    return Response(gen(Camera()),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

# 与控制页建立SOCKET通信
@socketio.on('connect event')
def connect_event_handle(*args):

    comando = args[0]['data'].encode('UTF-8')
    print(comando)
    ser.write(comando)

# 小车控制页
@app.route('/car-control')
def car_control():

    return render_template('car_control.html')

# 首页
@app.route('/')
def index():

    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
