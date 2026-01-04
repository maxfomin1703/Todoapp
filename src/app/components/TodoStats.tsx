import { Todo } from "./TodoItem";
import { ListTodo, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      icon: ListTodo,
      value: total,
      label: "Всего задач",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Clock,
      value: active,
      label: "В процессе",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      icon: CheckCircle2,
      value: completed,
      label: "Выполнено",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgColor} p-4 shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-md`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Прогресс выполнения</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {completionRate}%
            </span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
