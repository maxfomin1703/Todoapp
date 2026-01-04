import { Todo } from "./TodoItem";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return (
    <div className="flex gap-6 justify-center text-sm text-gray-600">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold text-blue-600">{total}</span>
        <span>Всего</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold text-orange-600">{active}</span>
        <span>Активных</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold text-green-600">{completed}</span>
        <span>Выполнено</span>
      </div>
    </div>
  );
}
