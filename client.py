[2:38 PM] Achi, Christian Emman
import RPi.GPIO as GPIO
import time
import socket


server_ip = '192.168.137.1'
server_port = 1647


message = 'Hello, server UNO!'
# Create a TCP socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


# Connect to the server
client_socket.connect((server_ip, server_port))

# Send the message
client_socket.sendall(message.encode())

# Close the socket
#client_socket.close()

# Set GPIO mode
GPIO.setmode(GPIO.BOARD)

# Define the GPIO pin for the button
button1_pin = 18
button2_pin = 15


# Set up the button pin as input with pull-up resistor enabled
GPIO.setup(button1_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(button2_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Define a callback function to handle button events
def button_callback1(channel):
    message = 'HI BTN_1'
    client_socket.sendall(message.encode())

def button_callback2(channel):
   message = 'HI BTN_2'
   client_socket.sendall(message.encode())


# Add event detection for the falling edge of the button signal
GPIO.add_event_detect(button1_pin, GPIO.FALLING, callback=button_callback1, bouncetime=500)
GPIO.add_event_detect(button2_pin, GPIO.FALLING, callback=button_callback2, bouncetime=500)

try:
    while True:
        # Your main program loop here
        # You can perform other tasks while waiting for button events
        time.sleep(0.5)

except KeyboardInterrupt:
    # Clean up GPIO on exit
    GPIO.cleanup()
