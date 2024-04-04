
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright (c) 2014-2023 Richard Hull and contributors
# See LICENSE.rst for details.
# PYTHON_ARGCOMPLETE_OK

"""
Color rendering demo.
"""

import math
import time
import random
from pathlib import Path
from demo_opts import get_device
from luma.core.render import canvas
from PIL import Image
import RPi.GPIO as GPIO
import socket

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.connect(('169.254.75.7', 1647))




def main():
    i = 0

    ##### a changer ################
    img_path = str(Path(__file__).resolve().parent.joinpath('images', 'logo.png'))
    Logo = Image.open(img_path) \
        .transform(device.size, Image.AFFINE, (1, 0, 0, 0, 1, 0), Image.BILINEAR) \
        .convert(device.mode)
    rButton= 10
    lButton= 8
    select= 12
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(select, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(rButton, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(lButton, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    # cards=["R1","G2","B3","Y4","V5","R6","G7"]
    colors = ["black", "white", "red", "orange", "yellow", "green", "blue", "indigo", "violet"]

    # Image display
    device.display(Logo)
    time.sleep(1)
    data = socket.recv(1024)
    print(data.decode())
    colors.append(data.decode())
    while True:
        print("LET'S GO")
        # Cycle through some primary colours
        # length = len(colors)
        """"
        try:
            with canvas(device, dither=True) as draw:
                print(colors[i])

                draw.rectangle(device.bounding_box, outline="white", fill="black")
                # measure
                left, top, right, bottom = draw.textbbox((0, 0), colors[i])
                size = right - left, bottom - top

                # draw
                left = (device.width - size[0]) // 2
                top = (device.height - size[1]) // 2
                right = left + size[0]
                bottom = top + size[1]
                draw.rectangle((left - 1, top, right, bottom), fill="black")
                draw.text((left, top), text=colors[i], fill="white")
                # print(colors[i])
                time.sleep(0.5)
        except:
            print("Erreur")
        else:
            draw.rectangle(device.bounding_box, outline="white", fill="black")
            draw.text((left, top), text=colors[i], fill="white")
         """  
        with canvas(device, dither=True) as draw:
            
            draw.rectangle(device.bounding_box, outline="white", fill="black")
            draw.text((30, 20), text=colors[i], fill="white")
            print(colors[i])

        while(GPIO.input(rButton) == True | GPIO.input(select) == True | GPIO.input(lButton) == True):
                if GPIO.input(select)== 0:
                    time.sleep(0.5) 
                    # print (color)
                    socket.send(colors[i].encode())
                    data = socket.recv(1024)
                    print(data.decode())
                    break
                if GPIO.input(lButton)== 0:
                    time.sleep(0.5)
                    if i == 0:
                        i = len(colors) - 1
                    else:
                        i -= 1
                    print(colors[i])
                    break
                if GPIO.input(rButton) == 0:
                    time.sleep(0.5)
                    if i != len(colors) - 1:
                        i += 1
                    else:
                        i = 0
                    print(colors[i])
                    break   
        print("I am OUT!")         

        time.sleep(0.5)

    
            
            
               
                    

if __name__ == "__main__":
    try:
        device = get_device()
        main()


        
    except KeyboardInterrupt:
        pass

