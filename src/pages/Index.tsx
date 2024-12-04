import { useEffect, useState } from "react";
import TodoItem from "@/components/TodoItem";
import TodoInput from "@/components/TodoInput";
import { useToast } from "@/components/ui/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    toast({
      description: "Task added successfully!",
      duration: 2000,
    });
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast({
      description: "Task deleted successfully!",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
          <p className="text-gray-600">Keep track of your tasks</p>
        </div>

        <TodoInput onAdd={addTodo} />

        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;