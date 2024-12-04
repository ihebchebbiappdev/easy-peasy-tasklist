import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors duration-200"
          disabled={!text.trim()}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default TodoInput;