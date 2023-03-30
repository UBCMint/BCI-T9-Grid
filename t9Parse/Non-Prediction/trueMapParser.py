import json
from wordToT9Parse import parse
import os

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

with open(os.path.join(script_dir, '../../Keymap.json'), 'r') as f:
    keymap = json.load(f)
    invertedKeyMap = {char: k for k, v in keymap.items() for char in v}


def textToJsonMap():

    output = {}

    #load from this
    with open(os.path.join(script_dir, '../testDict.txt'), 'r') as d:
        for l in d:
            k = parse(l, invertedKeyMap)
            output.setdefault(k, [])
            output[k].append(l)

    return output

print(repr(textToJsonMap()))

