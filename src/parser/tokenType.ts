export enum TokenType {
    MINUS = '-',
    PLUS = '+',
    COMMA = ',',
    COLON = ':',
    EQUALS = '=',
    LEFT_BRACKET = '(',
    RIGHT_BRACKET = ')',
    LEFT_SQUARE_BRACKET = '[',
    RIGHT_SQUARE_BRACKET = ']',
    LESS_THAN = '<',
    ASTERIX = '*',
    GREATER_THAN = '>',
    // actions
    ASSIGN = '<-',
    CLONE = '*->',
    SWAP = '<->',
    MOVE = '->',
    // literals
    IDENTIFIER = 'IDENTIFIER',
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    // keywords
    TRUE = 'true',
    FALSE = 'false',
    ID = 'id',
    TITLE = 'title',
    TEXT = 'text',
    DOT = 'dot',
    DOTS = 'dots',
    BOXES = 'boxes',
    AT = 'at',
    SIZE = 'size',
    FONT_SIZE = 'fontSize',
    END = 'end',
    WIDTH = 'width',
    COLOR = 'color',
    IDS = 'ids',
    BOX = 'box',
    LINE = 'line',
    STEP = 'step',
    DURATION = 'duration',
    SELECTED = 'selected',
    VISIBLE = 'visible',
    LAYOUT = 'layout'
}