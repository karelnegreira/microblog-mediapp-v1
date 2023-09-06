import { create } from 'zustand';

interface RegisterModalScore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalScore>((set) => ({
    isOpen: false, 
    onOpen: () => set({isOpen: true}), 
    onClose: () => set({isOpen: false})
}));

export default useRegisterModal;