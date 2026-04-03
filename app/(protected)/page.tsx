"use client";

import { createTask, deleteTask, updateTask } from "@/utils/services/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useTasks } from "../_hooks/useTasks";
import { useProvider } from "../_components/_contexts/AppContext";
import { logout } from "@/utils/services/auth";
// import { FaSpinner } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { usePagination } from "../_hooks/usePagination";

const priorities = ["low", "medium", "high"];
const statuses = ["todo", "in-progress", "done"];
const limits = [3, 5, 10, 20, 50];

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  _id?: string;
  createdBy?: string;
}

export default function App() {
  const { user } = useProvider();

  const [form, setForm] = useState<Task>({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "todo",
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [limit, setLimit] = useState<number>(3);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = "/login";
    },
  });

  const { mutate: deleteTaskById, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const {
    data,
    isPending: isFetchingTasks,
    fetchNextPage,
    isFetchingNextPage,
  } = useTasks({ ...filter, limit }, [filter.status, filter.priority, limit]);

  const ref = usePagination(fetchNextPage, isFetchingNextPage);

  const filteredTasks = data?.pages.flatMap((cur) => cur.data.data);
  console.log({ activeTask });

  return (
    <div className="min-h-screen bg-gray-100">
      {activeTask && (
        <EditModal task={activeTask} setActiveTask={setActiveTask} />
      )}
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Task Manager</h1>
        <button
          disabled={isLoggingOut}
          onClick={() => logoutUser()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Form */}

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow flex gap-4">
          <select
            value={filter.status}
            onChange={(e) => setLimit(+e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="2">Limit</option>
            {limits.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="p-2 border rounded-lg"
          >
            <option value="">All Status</option>
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="p-2 border rounded-lg"
          >
            <option value="">All Priority</option>
            {priorities.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-3 max-h-100 overflow-scroll">
          <h2 className="text-xl font-bold">Tasks</h2>

          {filteredTasks?.length === 0 && !isFetchingTasks && (
            <p className="text-gray-500">No tasks found</p>
          )}

          <>
            {isFetchingTasks ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin size-fit">
                  <ImSpinner2 size="2rem" />
                </div>
              </div>
            ) : (
              filteredTasks?.map((task) => (
                <div key={task._id} className="border p-4 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span className="text-sm capitalize">{task.status}</span>
                  </div>

                  <p className="text-sm text-gray-600">{task.description}</p>

                  <div className="text-sm flex justify-between">
                    <span>Due: {task.dueDate || "N/A"}</span>
                    <span className="capitalize">{task.priority}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTask(task)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        deleteTaskById(task._id || "");
                      }}
                      disabled={isDeleting}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
            {isFetchingNextPage && (
              <div className="flex items-center justify-center">
                <div className="animate-spin size-fit">
                  <ImSpinner2 size="1rem" />
                </div>
              </div>
            )}
            <div className="h-4" ref={ref}></div>
          </>
        </div>

        <form
          // onSubmit={handleSubmit}
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              ...form,
              createdBy: user?._id,
            });
          }}
          className="bg-white p-6 rounded-2xl shadow space-y-4"
        >
          <h2 className="text-xl font-bold">Create Task</h2>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded-lg"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-lg"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 border rounded-lg col-span-2"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={isPending}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

function EditModal({
  task,
  setActiveTask,
}: {
  task: Task;
  setActiveTask: React.Dispatch<SetStateAction<Task | null>>;
}) {
  const [form, setForm] = useState<Task>(
    task
      ? { ...task }
      : {
          title: "",
          description: "",
          dueDate: "",
          priority: "low",
          status: "todo",
        },
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedTask: Task) => updateTask(updatedTask, task._id || ""),
    onSuccess: () => {
      setActiveTask(null);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="fixed backdrop-blur-[3px] top-0 left-0 size-full bg-[rgba(0,0,0,0.3)]"
        onClick={() => {
          console.log("test");
          setActiveTask(null);
        }}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-1/2 rounded-lg w-[50%] h-[80%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              ...form,
            });
          }}
          className="bg-white p-6 rounded-2xl shadow space-y-4"
        >
          <h2 className="text-xl font-bold">Update Task</h2>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded-lg"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-lg"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 border rounded-lg col-span-2"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={isPending}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
