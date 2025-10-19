import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const res = await fetch("http://localhost:5000/api/tasks")
        if(!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json()
        setTasks(data);
      }
      catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    }
    fetchTasks()
  }, []);

  // Recalculate chartData whenever tasks change
  useEffect(() => {
    const grouped = {};
    tasks.forEach((task) => {
      const date = task.date || "Unknown";
      if (!grouped[date]) grouped[date] = { date, completed: 0, pending: 0 };
      if (task.completed) grouped[date].completed += 1;
      else grouped[date].pending += 1;
    });
    setChartData(Object.values(grouped));
  }, [tasks]);


  return (
    <div className="p-5 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">📊 Task Analytics</h2>

      {/* === Bar Chart === */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" name="✅ Completed" barSize={40} />
            <Bar dataKey="pending" fill="#f59e0b" name="🕒 Pending" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No task data found in Database.</p>
      )}

      {/* === Recent Tasks Table === */}
      {tasks.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">📝 Recent Tasks</h3>
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Time</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.slice(-10).reverse().map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-2 text-sm text-gray-800">{task.task}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {task.taskstartTime} - {task.taskendTime}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.completed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.completed ? "✅ Completed" : "🕒 Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
