import PySimpleGUI as sg
import json

sg.theme('DarkAmber')

layout = [
            [sg.Text('Pergunta: '), sg.InputText(key='pergunta')],
            [sg.Text('Opção 1: '), sg.InputText(key='opc1')],
            [sg.Text('Opção 2: '), sg.InputText(key='opc2')],
            [sg.Text('Opção 3: '), sg.InputText(key='opc3')],
            [sg.Text('Opção 4: '), sg.InputText(key='opc4')],
            [sg.Text('Correta: '), sg.InputOptionMenu(['1', '2', '3', 4], default_value='1', key='correta')],
            [sg.Button('Ok')] 
]

window = sg.Window('Se você errar, leva spoiler', layout)
perguntas = []

try:
    with open('./servidor/perguntas.json', 'r', encoding='UTF8') as file:
        perguntas = json.loads(file.read())

except:
    with open('./servidor/perguntas.json', 'w', encoding='UTF8') as file:
        file.write('[]')

while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED:
        break
    if event == 'Ok':
        obj_pergunta = {}

        obj_pergunta["pergunta"] = window['pergunta'].get()
        obj_pergunta["opcoes"] = []

        for i in range(4):
            if(i+1 == int(values['correta'])):
                obj_pergunta['opcoes'].append({"opcao": values[f'opc{i+1}'],"correta": True})
            else:
                obj_pergunta['opcoes'].append({"opcao": values[f'opc{i+1}'],"correta": False})
        
        perguntas.append(obj_pergunta)

        with open('./perguntas.json', 'w', encoding='UTF8') as file:
            file.write(json.dumps(perguntas))

        print(f'Pergunta: {obj_pergunta["pergunta"]}')
        for i in range(4):
            print(f'Opção {i+1}: {obj_pergunta["opcoes"][i]["opcao"]}')
        print('')