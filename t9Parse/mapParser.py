import json
from t9Parser import parse
import os

def textToJsonMap(invertedMap, rel_path): #NO SAVED FREQUENCY
    script_dir = os.path.dirname(__file__) # absolute dir the script is in

    output = {}

    #load from this
    with open(os.path.join(script_dir, rel_path), 'r', encoding = 'cp850') as d:
        i = 0
        for l in d: #loop through every line
            if not ('#' in l or '!' in l): 
                k = parse(l, invertedMap) #parse the line into numbers TODO: ADD EXCEPTION HANDLING
                output.setdefault(k, []) #add array as value if key dne
                word = l.lower().strip()
                
                if not any(word == w[0] for w in output[k]):    
                    output[k].append([word, i]) #gets rid of \n
                    i += 1

    return output

def saveMap(map, rel_path):
    script_dir = os.path.dirname(__file__) # absolute dir the script is in
    with open(os.path.join(script_dir, rel_path), "w") as o:
        json.dump(map, o, sort_keys=True, indent=4, separators=(',', ': '))
    return



def findWorst(map):
    max = 0
    index = 0
    for k in map.keys():
        if len(map[k]) > max:
            max = len(map[k])
            index = k
    return max, index



def main():
    script_dir = os.path.dirname(__file__) # absolute dir the script is in
    with (
        open('Keymap.json', 'r') as km,
        #open('Data/trueMap.json', 'r') as tm
    ):
        keymap = json.load(km)
        #truemap = json.load(tm)
        invertedKeyMap = {char: k for k, v in keymap.items() for char in v}

    saveMap(textToJsonMap(invertedKeyMap, "Data/100k2005.txt"), "Data/100k2005.json")

    # print(findWorst(truemap))


if __name__ == "__main__":
    main()