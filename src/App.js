import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {

        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        console.log(data)
        return data
    }


    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        console.log(data)
        return data
    }


    const deleteTask = async (id) => {
        // console.log('deleted',  id)
        //  setTasks(tasks.filter((task) => task.id !== id))
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        })
        const data = await res.json()

        setTasks([...tasks, data])

        /*  // console.log(task)
       const id = Math.floor(Math.random() * 10000) + 1
       const newTask = {id, ...task}
       setTasks([...tasks, newTask])*/

    }
    const toggleReminder = async (id) => {
        //   console.log('on Toggle', id)

        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }
    return (
        <Router>
            <div className="container">
                <Header showAddTask={showAddTask} onAdd={() => setShowAddTask(!showAddTask)}/>

                <Route path='/' exact render={(props) => (
                    (
                        <>
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ? (
                                    <Tasks onToggle={toggleReminder} onDelete={deleteTask} tasks={tasks}/>) :
                                (
                                    'No Task To Show'
                                )}
                        </>
                    )
                )}/>
                <Route path='/about' component={About}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
