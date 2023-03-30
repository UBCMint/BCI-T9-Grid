import json

with open('../../Keymap.json', 'r') as f:
    keymap = json.load(f)

inverted_keymap = {char: k for k, v in keymap.items() for char in v}

def parse(word, invertedMap):
    if not isinstance(word, str):
        raise TypeError("Invalid Input Type")

    w = word.lower()
    w = w.replace('\n', '')
    parsedWord = ''

    for c in w:
        if c in inverted_keymap.keys():
            parsedWord += inverted_keymap.get(c)
    return parsedWord

def main():
    print(parse("Carson", inverted_keymap))

if __name__ == "__main__":
    main()