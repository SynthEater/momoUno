# Projet Manette UNO
# 
# Samuel Barros
# 
# 


"""
Color rendering demo.
"""
import time
import RPi.GPIO as GPIO
import socket


socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection_serv = socket.connect(('192.168.1.1', 1647))
rButton= 10
lButton= 8
select= 12
LEDRouge = 5
LEDVert = 3
LEDJaune = 7
GPIO.setmode(GPIO.BOARD)
GPIO.setup(select, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(rButton, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(lButton, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(LEDRouge, GPIO.OUT)
GPIO.setup(LEDVert, GPIO.OUT)
GPIO.setup(LEDJaune, GPIO.OUT)

try:
    connection_serv
    GPIO.setup(LEDVert, GPIO.HIGH)
except:
    print('Pas capable de se connecter')


def main():
    i = 0
    cards = ['pige']
    #choixQ = ['Qv', 'Qr', 'Qj', 'Qb']
    #choixC = ['Qv', 'Qr', 'Qj', 'Qb']
    # Image display
    # device.display(Logo)
    # time.sleep(1)
    data = socket.recv(1024)
    
    print(data.decode())
    #cards.append(data.decode())
    #print(cards)
    #print(cards[i])
    
    for i in range(7):
        data = socket.recv(1024)
        data1 = data.decode()
        data1 = data1[:2]
        print(data1)
        cards.append(data1)
        cards.sort()
        print(cards)
 
    while True:
        i = 0
        GPIO.setup(LEDRouge, GPIO.LOW)
        print("waiting for turn or card")
        data = socket.recv(1024)
        datadecode = data.decode()
        print(datadecode)
        print(cards[i])

        if datadecode != '*':
            cards.append(datadecode)
            print(cards)
        else:
            GPIO.setup(LEDRouge, GPIO.HIGH)
            endturn = False
            while endturn == False: #notendturn
                #GPIO.setup(LEDRouge, GPIO.HIGH) 
                while(GPIO.input(rButton) == True | GPIO.input(select) == True | GPIO.input(lButton) == True):
                    if GPIO.input(select)== 0:
                        time.sleep(0.5) 
                        # print (color)
                        carte = cards[i]

                        socket.send(carte.encode())
                        response = socket.recv(1024)
                        if carte == 'pige':
                            cards.append(response.decode())
                            cards.sort()
                            print(cards)
                            break
                        #if carte[0] == 'Q':
                            #print()
                            
                        print(response.decode())
                        print(cards)
                        if response.decode() == "oui":
                            cards.remove(cards[i])
                            endturn = True
                        elif response.decode() == "non":
                            print('cette carte ne peut pas etre jouer')
                            break
                        print(cards)
                        break
                    if GPIO.input(lButton)== 0:
                        time.sleep(0.5)
                        if i == 0:
                            i = len(cards) - 1
                        else:
                            i -= 1
                        print(cards[i])
                        break
                    if GPIO.input(rButton) == 0:
                        time.sleep(0.5)
                        if i != len(cards) - 1:
                            i += 1
                        else:
                            i = 0
                        print(cards[i])
                        break 

                
        

            time.sleep(0.5)
    
        
        

    
            
            
               
                    

if __name__ == "__main__":
    try:
        # device = get_device()
        main()
            
    except KeyboardInterrupt:
        GPIO.setup(LEDVert, GPIO.LOW)
        GPIO.setup(LEDRouge, GPIO.LOW)
        pass

