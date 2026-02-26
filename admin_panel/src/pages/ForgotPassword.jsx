import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Mail, ArrowLeft, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetRequest = (e) => {
        e.preventDefault();
        setError('');

        // Simple validation for demo
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-6 font-sans">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-[450px] relative">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-2xl shadow-indigo-200 mb-4 md:mb-6">
                        <Truck className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center uppercase tracking-tight">
                        Garage & Towing
                    </h1>
                    <p className="text-gray-500 font-bold text-xs md:text-sm mt-1.5 md:mt-2">
                        Admin Command Center
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-6 md:mb-7 text-center sm:text-left">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Recover Password</h2>
                                <p className="text-gray-400 font-normal text-xs md:text-sm mt-1.5 md:mt-2">We'll send you a secure link to reset</p>
                            </div>


                            <form onSubmit={handleResetRequest} className="space-y-5">
                                {error && (
                                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
                                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                        <p className="text-sm font-normal text-rose-600 leading-tight">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <label className="text-xs block font-bold text-gray-500 mb-1.5">Admin Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full bg-gray-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-normal pl-12 text-gray-900 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-1">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        isLoading={isLoading}
                                        size='lg'
                                        className="w-full"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            Send Reset Link
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center animate-in fade-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border-2 border-emerald-100">
                                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 stroke-[2.5]" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Check Your Inbox</h2>
                            <p className="text-gray-400 font-normal text-xs md:text-sm mt-1.5 md:mt-2">
                                We've sent password reset instructions to <span className="text-indigo-600 font-semibold">{email}</span> if it exists in our records.
                            </p>
                            <div className="mt-6">
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate('/login')}
                                    size='lg'
                                    className="w-full"
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </div>
                    )}

                    {!isSubmitted && (
                        <div className='text-center mt-6 w-full flex items-center justify-center'>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-xs font-semibold text-indigo-600 hover:underline flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Return to Login
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-center mt-8 md:mt-10 text-xs font-semibold text-gray-400">
                    &copy; 2026 Admin Panel • Secure Environment
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
