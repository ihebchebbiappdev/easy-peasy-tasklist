import { Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="todo-item group flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(id)}
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
            completed
              ? "bg-primary border-primary"
              : "border-gray-300 hover:border-primary"
          )}
        >
          {completed && <Check className="w-3 h-3 text-white" />}
        </button>
        <span
          className={cn(
            "text-gray-700 transition-all duration-200",
            completed && "line-through text-gray-400"
          )}
        >
          {text}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-destructive transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;