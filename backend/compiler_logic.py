import sys

# ==========================================
# PART 1: LEXICAL ANALYZER
# ==========================================
class LexicalAnalyzer:
    def __init__(self, source_code):
        self.source = source_code
        self.cursor = 0
        self.length = len(source_code)
        self.keywords = {
            "if": "IF", "else": "ELSE", "then": "THEN",
            "int": "INT", "float": "FLOAT", "return": "RETURN"
        }

    def is_alpha(self, char):
        return 'a' <= char <= 'z' or 'A' <= char <= 'Z'

    def is_digit(self, char):
        return '0' <= char <= '9'

    def peek(self):
        if self.cursor < self.length:
            return self.source[self.cursor]
        return None

    def get_char(self):
        if self.cursor < self.length:
            char = self.source[self.cursor]
            self.cursor += 1
            return char
        return None

    def get_next_token(self):
        state = 0
        lexeme = ""
        while True:
            char = self.peek()
            if state == 0:
                if char is None: return None
                if char in [' ', '\n', '\t']:
                    self.get_char()
                    continue
                elif self.is_alpha(char): state = 1
                elif self.is_digit(char): state = 2
                elif char in ['<', '>', '=']: state = 3
                else:
                    self.get_char()
                    return ("SYMBOL", char)
            elif state == 1:
                if char is not None and (self.is_alpha(char) or self.is_digit(char)):
                    lexeme += self.get_char()
                else:
                    if lexeme in self.keywords: return (self.keywords[lexeme], "-")
                    return ("ID", lexeme)
            elif state == 2:
                if char is not None and self.is_digit(char):
                    lexeme += self.get_char()
                else:
                    return ("NUM", lexeme)
            elif state == 3:
                first = self.get_char()
                if self.peek() == '=':
                    self.get_char()
                    return ("RELOP", first + "=")
                else:
                    return ("RELOP", first)

# ==========================================
# PART 2: PREDICTIVE PARSER WITH EVALUATION
# ==========================================
class PredictiveParser:
    def __init__(self):
        self.input_str = ""
        self.index = 0
        self.lookahead = ''
        self.mode = "POSTFIX"

    def start_parsing(self, input_string, conversion_mode):
        # Clean input
        clean_str = ""
        for char in input_string:
            if char != ' ': clean_str += char
            
        self.input_str = clean_str + "$"
        self.index = 0
        self.lookahead = self.input_str[self.index]
        self.mode = conversion_mode
        
        try:
            result_str = self.E()
            
            if self.lookahead == '$':
                # NEW: Calculate the math result
                math_value = self.evaluate(result_str, conversion_mode)
                return {
                    "string": result_str,
                    "value": math_value,
                    "status": "Success"
                }
            else: 
                return {"status": "Error", "msg": "Unexpected characters at end."}
        except Exception as e: 
            return {"status": "Error", "msg": str(e)}

    # --- Evaluation Logic ---
    def evaluate(self, expr_str, mode):
        try:
            if mode == "POSTFIX":
                return self.evaluate_postfix(expr_str)
            else:
                return self.evaluate_prefix(expr_str)
        except:
            return "Could not evaluate (Variables used?)"

    def evaluate_postfix(self, postfix):
        stack = []
        for char in postfix:
            if '0' <= char <= '9':
                stack.append(int(char))
            elif char in "+-*/^":
                val2 = stack.pop()
                val1 = stack.pop()
                if char == '+': stack.append(val1 + val2)
                elif char == '-': stack.append(val1 - val2)
                elif char == '*': stack.append(val1 * val2)
                elif char == '/': stack.append(val1 / val2)
                elif char == '^': stack.append(val1 ** val2)
        return stack[0] if stack else 0

    def evaluate_prefix(self, prefix):
        stack = []
        # Prefix is evaluated backwards
        for char in reversed(prefix):
            if '0' <= char <= '9':
                stack.append(int(char))
            elif char in "+-*/^":
                val1 = stack.pop()
                val2 = stack.pop()
                if char == '+': stack.append(val1 + val2)
                elif char == '-': stack.append(val1 - val2)
                elif char == '*': stack.append(val1 * val2)
                elif char == '/': stack.append(val1 / val2)
                elif char == '^': stack.append(val1 ** val2)
        return stack[0] if stack else 0

    # --- Parsing Logic ---
    def match(self, token):
        if self.lookahead == token:
            self.index += 1
            if self.index < len(self.input_str): self.lookahead = self.input_str[self.index]
            else: self.lookahead = ''
        else: raise Exception(f"Expected {token} but found {self.lookahead}")

    def E(self):
        t_val = self.T()
        return self.E_prime(t_val)

    def E_prime(self, inherited_val):
        if self.lookahead == '+':
            self.match('+')
            t_val = self.T()
            new_val = ("+" + inherited_val + t_val) if self.mode == "PREFIX" else (inherited_val + t_val + "+")
            return self.E_prime(new_val)
        elif self.lookahead == '-':
            self.match('-')
            t_val = self.T()
            new_val = ("-" + inherited_val + t_val) if self.mode == "PREFIX" else (inherited_val + t_val + "-")
            return self.E_prime(new_val)
        else: return inherited_val

    def T(self):
        f_val = self.F()
        return self.T_prime(f_val)

    def T_prime(self, inherited_val):
        if self.lookahead == '*':
            self.match('*')
            f_val = self.F()
            new_val = ("*" + inherited_val + f_val) if self.mode == "PREFIX" else (inherited_val + f_val + "*")
            return self.T_prime(new_val)
        elif self.lookahead == '/':
            self.match('/')
            f_val = self.F()
            new_val = ("/" + inherited_val + f_val) if self.mode == "PREFIX" else (inherited_val + f_val + "/")
            return self.T_prime(new_val)
        else: return inherited_val

    def F(self):
        p_val = self.P()
        return self.F_prime(p_val)

    def F_prime(self, inherited_val):
        if self.lookahead == '^':
            self.match('^')
            f_val = self.F()
            return ("^" + inherited_val + f_val) if self.mode == "PREFIX" else (inherited_val + f_val + "^")
        else: return inherited_val

    def P(self):
        if self.lookahead == '(':
            self.match('(')
            e_val = self.E()
            self.match(')')
            return e_val
        elif '0' <= self.lookahead <= '9':
            val = self.lookahead
            self.match(self.lookahead)
            return val
        else: raise Exception("Expected number or '('")

# ==========================================
# PART 3: API WRAPPERS (Updated return format)
# ==========================================
def run_lexer(code):
    lexer = LexicalAnalyzer(code)
    tokens = []
    while True:
        token = lexer.get_next_token()
        if token is None: break
        tokens.append({"type": token[0], "value": token[1]})
    return tokens

def run_parser(expression, mode):
    parser = PredictiveParser()
    result = parser.start_parsing(expression, mode)
    # Format output for string representation
    if result["status"] == "Success":
        return f"Converted: {result['string']}  |  Evaluated: {result['value']}"
    else:
        return result["msg"]

# ==========================================
# PART 4: CLI MENU (EXACT FLOW REQUESTED)
# ==========================================
def main():
    parser = PredictiveParser()
    
    while True:
        print("\n========================================")
        print(" COMPILER CONSTRUCTION: PARSER & EVALUATOR")
        print("========================================")
        
        # STEP 1: Ask Infix Expression
        expr = input("1. Enter Infix Expression (or 'exit'): ")
        if expr.lower() == 'exit': break

        # STEP 2: Ask Method
        print("\n2. Select Method:")
        print("   a) Syntax Directed Definition (SDD)")
        print("   b) Translation Scheme (SDT)")
        method = input("   Choice (a/b): ")
        
        # STEP 3: Ask Conversion
        print("\n3. Select Conversion:")
        print("   a) Infix to Prefix")
        print("   b) Infix to Postfix")
        conv = input("   Choice (a/b): ")

        # Set Mode
        mode = "PREFIX" if conv == 'a' else "POSTFIX"
        method_name = "SDD" if method == 'a' else "SDT"

        # Execute
        print(f"\n--- Output ({method_name}) ---")
        result = parser.start_parsing(expr, mode)
        
        if result["status"] == "Success":
            print(f"Converted Expression: {result['string']}")
            print(f"Evaluated Answer:     {result['value']}")
        else:
            print(f"Error: {result['msg']}")
            
        print("-" * 40)

if __name__ == "__main__":
    main()