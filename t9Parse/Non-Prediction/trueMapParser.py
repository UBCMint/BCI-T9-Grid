import json
from t9Parser import parse
import os

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

with open(os.path.join(script_dir, '../../Keymap.json'), 'r') as f:
    keymap = json.load(f)
    invertedKeyMap = {char: k for k, v in keymap.items() for char in v}


def textToJsonMap(rel_path):

    output = {}

    #load from this
    with open(os.path.join(script_dir, rel_path), 'r') as d:
        for l in d: #loop through every line
            k = parse(l, invertedKeyMap) #parse the line into numbers
            output.setdefault(k, [])
            output[k].append(l.strip())

    return output

def saveMap(map, rel_path):
    with open(os.path.join(script_dir, rel_path), "w") as o:
        o.truncate(o)
        json.dump(map, o)



