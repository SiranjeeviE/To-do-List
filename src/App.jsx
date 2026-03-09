import React, { useState, useEffect, useCallback } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import CodeEditorWrapper from './components/CodeEditorWrapper';
import Auth from './components/Auth';
import TodoApp from './components/TodoApp';

const API_BASE = 'http://localhost:5000/api';

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('currentUser'));
    const [loading, setLoading] = useState(false);

    const fetchTasks = useCallback(async (username) => {
        if (!username) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/tasks/${username}`);
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchTasks(currentUser);
            localStorage.setItem('currentUser', currentUser);
        } else {
            localStorage.removeItem('currentUser');
            setTasks([]);
        }
    }, [currentUser, fetchTasks]);

    const handleLogin = (username) => {
        setCurrentUser(username);
    };

    const handleSignup = async (username, password) => {
        try {
            const res = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                // Login after signup
                setCurrentUser(username);
            } else {
                const data = await res.json();
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error('Signup error:', err);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleAddTask = async (task) => {
        try {
            const res = await fetch(`${API_BASE}/tasks/${currentUser}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Add task error:', err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const res = await fetch(`${API_BASE}/tasks/${currentUser}/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Delete task error:', err);
        }
    };

    const handleEditTask = async (id, updatedTask) => {
        try {
            const res = await fetch(`${API_BASE}/tasks/${currentUser}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Edit task error:', err);
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <AnimatedBackground />
            <div className="relative z-10 px-4 py-8">
                <CodeEditorWrapper title={currentUser ? `todo_list_${currentUser}.js` : "auth.js"}>
                    {currentUser ? (
                        <TodoApp
                            currentUser={currentUser}
                            onLogout={handleLogout}
                            tasks={tasks}
                            onAddTask={handleAddTask}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                            loading={loading}
                        />
                    ) : (
                        <Auth 
                            onLogin={handleLogin} 
                            onSignup={handleSignup} 
                            isBackend={true}
                        />
                    )}
                </CodeEditorWrapper>
            </div>
            <div className="fixed bottom-4 right-4 text-xs font-mono text-[#484f58] select-none">
                UTF-8 | Global Platform | Ln 1, Col 1
            </div>
        </div>
    );
}

export default App;
