import json
from t9Parser import parse
import os

def textToJsonMap(invertedMap, rel_path):
    script_dir = os.path.dirname(__file__) # absolute dir the script is in

    output = {}

    #load from this
    with open(os.path.join(script_dir, rel_path), 'r') as d:
        for l in d: #loop through every line
            k = parse(l, invertedMap) #parse the line into numbers
            output.setdefault(k, [])
            output[k].append(l.strip())

    return output

def saveMap(map, rel_path):
    script_dir = os.path.dirname(__file__) # absolute dir the script is in
    with open(os.path.join(script_dir, rel_path), "w") as o:
        json.dump(map, o, sort_keys=True, indent=4, separators=(',', ': '))
    return




def main():
    script_dir = os.path.dirname(__file__) # absolute dir the script is in
    with open(os.path.join(script_dir, '../Keymap.json'), 'r') as f:
        keymap = json.load(f)
        invertedKeyMap = {char: k for k, v in keymap.items() for char in v}

    saveMap(textToJsonMap(invertedKeyMap, "dictionary.txt"), "trueMap.json")


if __name__ == "__main__":
    main()