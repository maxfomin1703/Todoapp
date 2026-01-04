import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex gap-3 p-2 rounded-2xl transition-all duration-300 ${
        isFocused 
          ? "bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg" 
          : "bg-gray-50"
      }`}>
        <div className="relative flex-1">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Что нужно сделать сегодня?"
            className="w-full border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
          />
          {isFocused && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={!text.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5 mr-1" />
          Добавить
        </Button>
      </div>
    </motion.form>
  );
}
