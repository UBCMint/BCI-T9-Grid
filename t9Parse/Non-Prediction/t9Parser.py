import json



def parse(word, invertedMap):
    '''
    Parses an alphabetic word into a string of numbers based on a T9 Gridmap
    Assumes loose typing, 1 keypress can represent multiple values

    :param str word: alphabetic word to be parsed
    :param Dict invertedMap: map with char: number pairs to parse
    :raises TypeError: if message is not a string

    :return number sequence corresponding to the numbers pressed to type word 
    :rtype str
    '''

    if not isinstance(word, str):
        raise TypeError("Invalid Input Type")


    w = word.lower()
    w = w.replace('\n', '')
    parsedWord = ''

    for c in w:
        if c in invertedMap.keys():
            parsedWord += invertedMap.get(c)
    return parsedWord



def main():

    with open('../../Keymap.json', 'r') as f:
        keymap = json.load(f)

    inverted_keymap = {char: k for k, v in keymap.items() for char in v}

    print(parse("Carson", inverted_keymap))

if __name__ == "__main__":
    main()