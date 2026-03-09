import React, { useState } from 'react';

const Auth = ({ onLogin, onSignup, isBackend }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const u = username.trim();
        const p = password;

        if (isLogin) {
            try {
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: u, password: p })
                });
                if (res.ok) {
                    onLogin(u);
                } else {
                    setMessage('Invalid credentials');
                }
            } catch (err) {
                setMessage('Backend connection error');
            }
        } else {
            onSignup(u, p);
            setMessage('Submitting signup...');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-teal-400 font-mono">
                <span className="text-purple-400">class</span> {isLogin ? 'Login' : 'SignUp'} <span className="text-yellow-200">extends</span> User;
            </h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="text-[10px] text-[#484f58] font-mono block mb-1">// username_input</label>
                    <input
                        type="text"
                        placeholder="test_user"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 bg-[#0d1117] border border-[#30363d] rounded text-[#c9d1d9] outline-none focus:border-teal-500 transition-colors font-mono text-sm"
                    />
                </div>
                <div className="mb-6">
                    <label className="text-[10px] text-[#484f58] font-mono block mb-1">// password_input</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-[#0d1117] border border-[#30363d] rounded text-[#c9d1d9] outline-none focus:border-teal-500 transition-colors font-mono text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 mb-4 bg-teal-600/20 hover:bg-teal-600/40 text-teal-400 border border-teal-500/50 rounded font-mono font-bold transition-all"
                >
                    {isLogin ? 'executeLogin();' : 'executeSignup();'}
                </button>
            </form>
            <p className="text-xs text-[#8b949e] font-mono">
                {isLogin ? "// no account?" : "// already a member?"}{' '}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-teal-400 hover:underline"
                >
                    {isLogin ? 'switchToSignup();' : 'switchToLogin();'}
                </button>
            </p>
            {message && <p className="mt-4 text-xs text-teal-400 font-mono italic">{message}</p>}
        </div>
    );
};

export default Auth;
