import { useState } from 'react'
import './App.css'



type TaskStatus = 'To do' | 'In progress' | 'Done'
type TaskPriority = 'Low' | 'Medium' | 'High'

type Task = {
  id: string
  title: string
  owner: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Gather project requirements',
    owner: 'Somesh',
    status: 'Done',
    priority: 'High',
    dueDate: '2026-10-12',
  },
  {
    id: 'task-2',
    title: 'Design dashboard layout',
    owner: 'Somesh',
    status: 'In progress',
    priority: 'Medium',
    dueDate: '2026-10-15',
  },
  {
    id: 'task-3',
    title: 'Connect business data',
    owner: 'Unassigned',
    status: 'To do',
    priority: 'High',
    dueDate: '2026-10-20',
  },
]

const statuses: TaskStatus[] = ['To do', 'In progress', 'Done']

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const completedCount = tasks.filter(
    (task) => task.status === 'Done',
  ).length

  const inProgressCount = tasks.filter(
    (task) => task.status === 'In progress',
  ).length

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100)

  function changeTaskStatus(taskId: string, status: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      ),
    )
  }

  return (
    <main>
      <header>
        <h1>Project Planning Dashboard</h1>
        <p>Track your team’s work and project progress.</p>
      </header>

      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading">Project summary</h2>

        <p>Total tasks: {tasks.length}</p>
        <p>In progress: {inProgressCount}</p>
        <p>Completed: {completedCount}</p>
        <p>Completion: {completionPercentage}%</p>
      </section>

      <section aria-labelledby="board-heading">
        <h2 id="board-heading">Task board</h2>

        {statuses.map((status) => {
          const columnTasks = tasks.filter(
            (task) => task.status === status,
          )

          return (
            <section key={status}>
              <h3>
                {status} ({columnTasks.length})
              </h3>

              {columnTasks.length === 0 ? (
                <p>No tasks in this column.</p>
              ) : (
                columnTasks.map((task) => (
                  <article key={task.id}>
                    <h4>{task.title}</h4>

                    <p>Owner: {task.owner}</p>
                    <p>Priority: {task.priority}</p>
                    <p>
                      Due: <time dateTime={task.dueDate}>
                        {task.dueDate}
                      </time>
                    </p>

                    <label htmlFor={`status-${task.id}`}>
                      Task status
                    </label>{' '}

                    <select
                      id={`status-${task.id}`}
                      value={task.status}
                      onChange={(event) =>
                        changeTaskStatus(
                          task.id,
                          event.target.value as TaskStatus,
                        )
                      }
                    >
                      {statuses.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </article>
                ))
              )}
            </section>
          )
        })}
      </section>
    </main>
  )
}

export default App