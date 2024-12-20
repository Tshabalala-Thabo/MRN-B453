import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PulseLoader } from 'react-spinners';

const ConfirmDeleteModal = ({ isOpen, heading, description, onClose, onConfirm, loading }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50"
                        initial={{ opacity: 0, scale: 0.8 }} // Initial state
                        animate={{ opacity: 1, scale: 1 }} // Animate to this state
                        exit={{ opacity: 0, scale: 0.8 }} // Exit state
                        transition={{ duration: 0.3 }} // Transition duration
                    >
                        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                            <h2 className="text-lg font-bold mb-2">{heading}</h2>
                            <p className="mb-4">{description}</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={async () => {
                                        if (!loading) {
                                            await onConfirm() // Assuming onConfirm returns a promise
                                            onClose()
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? <PulseLoader size={8} color="#ffffff" /> : 'Yes, delete'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDeleteModal;
