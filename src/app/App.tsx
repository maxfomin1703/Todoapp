import { useState } from "react";
import { TodoInput } from "./components/TodoInput";
import { TodoItem, Todo } from "./components/TodoItem";
import { TodoStats } from "./components/TodoStats";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Создать список задач", completed: true },
    { id: "2", text: "Добавить новую задачу", completed: false },
    { id: "3", text: "Отметить выполненную задачу", completed: false },
  ]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl">Список Задач</h1>
          </div>
          <p className="text-gray-600">Управляйте своими задачами эффективно</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <TodoStats todos={todos} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="completed">Выполненные</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Нет задач</p>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-3">
              {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Нет активных задач</p>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Нет выполненных задач</p>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
