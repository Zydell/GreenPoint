
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, item):
        self.stack.append(item)

    def pop(self):
        if len(self.stack) < 1:
            return None
        return self.stack.pop()

    def sort_and_push(self, item):
        if not self.stack:
            self.push(item)
        else:
            temp_stack = []
            while self.stack and self.stack[-1] < item:
                temp_stack.append(self.stack.pop())
            self.push(item)
            while temp_stack:
                self.push(temp_stack.pop())

# Example usage:
stack = Stack()
stack.sort_and_push('XD')
stack.sort_and_push('DSA')

while stack.stack:
    print(stack.pop())