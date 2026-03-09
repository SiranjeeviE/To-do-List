import React from 'react';

const CodeEditorWrapper = ({ children, title = "todo_list.js" }) => {
    return (
        <div className="max-w-4xl mx-auto my-10 bg-[#161b22] rounded-lg shadow-2xl border border-[#30363d] overflow-hidden">
            {/* Window Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-[#30363d]">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-sm text-[#8b949e] font-mono">{title}</div>
                <div className="w-12 h-3" /> {/* Spacer */}
            </div>

            {/* Editor Body */}
            <div className="flex font-mono text-sm">
                {/* Line Numbers */}
                <div className="bg-[#0d1117] text-[#484f58] p-4 pr-6 select-none text-right min-w-[3rem]">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6 relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CodeEditorWrapper;
