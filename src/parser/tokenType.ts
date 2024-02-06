export enum TokenType {
    MINUS = "-",
    PLUS = "+",
    COMMA = ",",
    COLON = ":",
    SEMICOLON = ";",
    EQUALS = "=",
    LEFT_BRACKET = "(",
    RIGHT_BRACKET = ")",
    LESS_THAN = "<",
    ASTERIX = "*",
    GREATER_THAN = ">",
    // actions
    ASSIGN = "<-",
    CLONE = "*->",
    SWAP = "<->",
    MOVE = "->",
    // literals
    IDENTIFIER = "IDENTIFIER",
    NUMBER = "NUMBER",
    STRING = "STRING",
    // keywords
    TRUE = "true",
    FALSE = "false",
    ID = "id",
    TITLE = "title",
    TEXT = "text",
    DOT = "dot",
    DOTS = "dots",
    AT = "at",
    SIZE = "size",
    END = "end",
    WIDTH = "width",
    COLOR = "color",
    IDS = "ids",
    BOX = "box",
    LINE = "line",
    STEPS = "steps",
    SELECTED = "selected",
    VISIBLE = "visible"
}