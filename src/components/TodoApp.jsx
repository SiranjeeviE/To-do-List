import React, { useState } from 'react';
import { Trash2, Edit2, LogOut, PlusSquare, Code2, ClipboardCopy, CheckCircle2, Save, X, Terminal } from 'lucide-react';

const TodoApp = ({ currentUser, onLogout, tasks, onAddTask, onDeleteTask, onEditTask, loading }) => {
    const [taskInput, setTaskInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [catInput, setCatInput] = useState('General');
    const [codeContent, setCodeContent] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    // Inline Editing State
    const [editingId, setEditingId] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editCat, setEditCat] = useState('');
    const [editCode, setEditCode] = useState('');

    const [statusToast, setStatusToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setStatusToast({ msg, type });
        setTimeout(() => setStatusToast(null), 3000);
    };

    const handleAdd = () => {
        if (!taskInput.trim()) return;
        onAddTask({ 
            text: taskInput, 
            date: dateInput, 
            cat: catInput, 
            code: codeContent.trim() 
        });
        setTaskInput('');
        setDateInput('');
        setCodeContent('');
        setShowCodeInput(false);
        showToast('Commit pushed to global repository');
    };

    const startEditing = (task) => {
        setEditingId(task._id);
        setEditTaskText(task.text);
        setEditDate(task.date || '');
        setEditCat(task.cat);
        setEditCode(task.code || '');
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    const saveEdit = () => {
        if (!editTaskText.trim()) return;
        onEditTask(editingId, {
            text: editTaskText,
            date: editDate,
            cat: editCat,
            code: editCode
        });
        setEditingId(null);
        showToast('Module updated successfully');
    };

    const handleDelete = (id) => {
        onDeleteTask(id);
        showToast('Resource deleted from global repo', 'warning');
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        showToast('Code copied to local buffer');
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Toast Notification */}
            {statusToast && (
                <div className={`fixed top-10 right-10 z-[100] p-4 rounded-lg shadow-2xl border font-mono text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${statusToast.type === 'success' ? 'bg-[#0d1117] border-teal-500/50 text-teal-400' : 'bg-[#0d1117] border-red-500/50 text-red-400'}`}>
                    <Terminal size={14} className={statusToast.type === 'success' ? 'text-teal-500' : 'text-red-500'} />
                    <span>{statusToast.msg}</span>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-current animate-progress-shrink w-full`} style={{ animationDuration: '3000ms' }} />
                </div>
            )}
            
            <div className="flex justify-between items-center border-b border-[#30363d] pb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-mono text-teal-400">
                        <span className="text-purple-400">const</span> user = <span className="text-yellow-200">"{currentUser}"</span>;
                    </h2>
                    {loading && (
                        <div className="flex items-center gap-2">
                             <Terminal size={14} className="text-teal-500 animate-pulse" />
                             <span className="text-[10px] text-teal-500 font-mono italic">// sync_global_data...</span>
                        </div>
                    )}
                </div>
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-red-400 transition-colors font-mono"
                >
                    <LogOut size={16} /> Logout();
                </button>
            </div>

            {/* Creation Form */}
            <div className="flex flex-col gap-4 bg-[#0d1117] p-5 rounded-lg border border-[#30363d] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/20 group-hover:bg-teal-500/50 transition-all" />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <label className="text-[10px] text-[#484f58] font-mono block mb-1 uppercase tracking-tighter tracking-wider font-bold"># Activity Title</label>
                        <input
                            placeholder="Pushing a new snippet..."
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            className="w-full p-2 bg-[#161b22] border border-[#30363d] rounded text-[#c9d1d9] outline-none focus:border-teal-500 font-mono text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] text-[#484f58] font-mono block mb-1 uppercase tracking-tighter"># Timestamp</label>
                        <input
                            type="date"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            className="w-full p-2 bg-[#161b22] border border-[#30363d] rounded text-[#c9d1d9] outline-none focus:border-teal-500 font-mono text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] text-[#484f58] font-mono block mb-1 uppercase tracking-tighter"># Namespace</label>
                        <select
                            value={catInput}
                            onChange={(e) => setCatInput(e.target.value)}
                            className="w-full p-2 bg-[#161b22] border border-[#30363d] rounded text-[#c9d1d9] outline-none focus:border-teal-500 cursor-pointer font-mono text-sm appearance-none"
                        >
                            <option value="General">General</option>
                            <option value="Code Snippet">Code Snippet</option>
                            <option value="Production">Production</option>
                            <option value="Research">Research</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setShowCodeInput(!showCodeInput)}
                        className={`flex items-center gap-2 text-[10px] font-mono px-4 py-1.5 rounded-md border transition-all uppercase tracking-tighter ${showCodeInput ? 'bg-teal-500 text-[#0d1117] border-teal-500 font-bold' : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:border-teal-400/50'}`}
                    >
                        <Code2 size={12} /> {showCodeInput ? 'git_stash_pop();' : 'git_stash();'}
                    </button>
                    {showCodeInput && (
                         <span className="text-[10px] text-teal-500/80 font-mono italic font-bold tracking-widest uppercase">// local_buffer.open</span>
                    )}
                </div>

                {showCodeInput && (
                    <div className="relative">
                        <textarea
                            placeholder="// Everyday code saving: your snippets, global impact..."
                            value={codeContent}
                            onChange={(e) => setCodeContent(e.target.value)}
                            className="w-full h-40 p-4 bg-[#010409] border border-[#30363d] rounded text-[#c9d1d9] font-mono text-xs outline-none focus:border-teal-500/50 resize-none scrollbar-thin transition-all placeholder:text-[#30363d]"
                        />
                    </div>
                )}

                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 p-3 bg-teal-500 hover:bg-teal-400 text-[#0d1117] rounded-md font-mono font-bold transition-all mt-2 shadow-[0_10px_30px_rgba(56,178,172,0.2)] hover:-translate-y-0.5"
                >
                    <Save size={18} /> git_commit_push();
                </button>
            </div>

            <div className="space-y-6 mt-6">
                {tasks.map((task, index) => (
                    <div 
                        key={task._id || index} 
                        className={`group flex flex-col bg-[#0d1117] rounded-lg border transition-all overflow-hidden ${editingId === task._id ? 'border-teal-500 ring-1 ring-teal-500/30' : 'border-[#30363d] hover:border-teal-500/30'}`}
                    >
                        {editingId === task._id ? (
                            /* Inline Edit Mode */
                            <div className="p-4 flex flex-col gap-4 bg-[#161b22]/50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] text-teal-400 font-mono uppercase font-bold tracking-widest">// editing_module</span>
                                    <div className="flex gap-2">
                                        <button onClick={saveEdit} className="p-1 px-3 text-[10px] font-mono bg-teal-600 text-white rounded hover:bg-teal-500 transition-colors uppercase font-bold">save();</button>
                                        <button onClick={cancelEditing} className="p-1 px-3 text-[10px] font-mono bg-red-600/20 text-red-400 rounded hover:bg-red-600/40 transition-colors uppercase font-bold">cancel();</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        value={editTaskText} 
                                        onChange={(e) => setEditTaskText(e.target.value)}
                                        className="p-2 bg-[#0d1117] border border-teal-500/30 rounded text-teal-100 font-mono text-sm outline-none"
                                        placeholder="Title"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input 
                                            type="date"
                                            value={editDate} 
                                            onChange={(e) => setEditDate(e.target.value)}
                                            className="p-2 bg-[#0d1117] border border-teal-500/30 rounded text-teal-100 font-mono text-sm outline-none"
                                        />
                                        <select 
                                            value={editCat} 
                                            onChange={(e) => setEditCat(e.target.value)}
                                            className="p-2 bg-[#0d1117] border border-teal-500/30 rounded text-teal-100 font-mono text-sm outline-none"
                                        >
                                            <option value="General">General</option>
                                            <option value="Code Snippet">Code Snippet</option>
                                            <option value="Production">Production</option>
                                            <option value="Research">Research</option>
                                        </select>
                                    </div>
                                </div>
                                <textarea 
                                    value={editCode} 
                                    onChange={(e) => setEditCode(e.target.value)}
                                    className="p-4 bg-[#010409] border border-teal-500/30 rounded text-teal-100 font-mono text-xs outline-none h-40 resize-none scrollbar-thin"
                                    placeholder="// Edit code here..."
                                />
                            </div>
                        ) : (
                            /* View Mode */
                            <>
                                <div className="flex justify-between items-center p-4 border-b border-[#30363d]/50 bg-[#161b22]/20">
                                    <div className="flex flex-col">
                                        <span className="text-[#c9d1d9] font-mono font-medium tracking-wide flex items-center gap-2">
                                            <span className="text-teal-500/40">#</span> {task.text}
                                        </span>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <span className="text-[9px] text-teal-400/80 font-mono px-2 py-0.5 bg-teal-500/5 rounded-full border border-teal-500/10 uppercase tracking-tighter">
                                                {task.cat}
                                            </span>
                                            {task.date && (
                                                <span className="text-[9px] text-[#484f58] font-mono">
                                                    <span className="text-[#30363d] mr-1">@</span>{task.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <button 
                                            onClick={() => startEditing(task)}
                                            className="p-2 hover:bg-teal-500/10 hover:text-teal-400 text-[#484f58] rounded-md transition-all border border-transparent hover:border-teal-500/20"
                                            title="Modify"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(task._id)}
                                            className="p-2 hover:bg-red-500/10 hover:text-red-400 text-[#484f58] rounded-md transition-all border border-transparent hover:border-red-500/20"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                
                                {task.code && (
                                    <div className="relative p-5 bg-[#010409]/80 group/code">
                                        <div className="absolute top-5 left-3 flex flex-col gap-1 z-10 select-none opacity-20 group-hover/code:opacity-40 transition-opacity">
                                             {task.code.split('\n').slice(0, 15).map((_, i) => (
                                                 <span key={i} className="text-[10px] text-[#484f58] font-mono leading-[1.3] font-bold">{i+1}</span>
                                             ))}
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(task.code, index)}
                                            className="absolute top-4 right-4 p-2 bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d] rounded-md text-[#8b949e] hover:text-teal-400 hover:border-teal-500/50 transition-all shadow-xl z-20"
                                            title="Copy to Clipboard"
                                        >
                                            {copiedIndex === index ? <CheckCircle2 size={14} className="text-teal-400" /> : <ClipboardCopy size={14} />}
                                        </button>
                                        <pre className="text-xs text-[#d1d5db] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-80 pl-8 scrollbar-thin relative z-10">
                                            <code className="block select-text">{task.code}</code>
                                        </pre>
                                        <div className="text-[8px] font-mono text-[#30363d] absolute bottom-2 right-4 uppercase tracking-[0.2em] pointer-events-none">
                                            ready_only_buffer // utf-8
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {tasks.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-[#30363d] rounded-xl bg-[#0d1117]/50 mt-10">
                    <div className="w-16 h-16 bg-[#161b22] rounded-full flex items-center justify-center mb-6 border border-[#30363d] shadow-2xl">
                        <Terminal size={32} className="text-[#30363d]" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-[#8b949e] font-mono font-bold uppercase tracking-widest mb-2">Repository Empty</h3>
                        <p className="text-[#484f58] font-mono text-xs max-w-xs leading-relaxed">
                            // Your global code vault is currently initialized but empty. Use the form above to push your first commit.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoApp;
