import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2, Circle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
        todo.completed 
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200" 
          : "bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-md"
      }`}>
        <button
          onClick={() => onToggle(todo.id)}
          className="flex-shrink-0 transition-transform hover:scale-110"
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 hover:text-blue-500" />
          )}
        </button>
        
        <label
          className={`flex-1 cursor-pointer transition-all duration-300 ${
            todo.completed 
              ? "line-through text-gray-400" 
              : "text-gray-800"
          }`}
        >
          {todo.text}
        </label>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
