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


def predict(sequence, sequenceMap, depth):
    '''
    Predicts potential words given an encoded t9 sequence

    :param str sequence: sequence to be decoded
    :param Dict sequenceMap: map with [number: [words...]] pairs to predict
    :param int depth: how many chars ahead should the prediction return
    :raises TypeError: if sequence is not a valid string
    
    :return list of potential words
    :rtype list<string>
    '''

    if not isinstance(sequence, str):
        raise TypeError("Invalid Input Type")
    
    if not sequence in sequenceMap:
        return []

    output = sequenceMap[sequence]

    if depth <= 0:
        return output


  
    for i in range(1,9):
        output += predict(sequence + str(i), sequenceMap, depth - 1)

    return output



def main():
    with (
        open('../Keymap.json', 'r') as km,
        open('trueMap.json', 'r') as tm
    ):
        keymap = json.load(km)
        wordmap = json.load(tm)
        

    invkeymap = {char: k for k, v in keymap.items() for char in v} #flip index and values

    #print(parse("jockey", inverted_keymap)) #test string

    print(predict(parse("aa", invkeymap), wordmap, 5))
    #print(predict("11626", wordmap, 0))
if __name__ == "__main__":
    main()