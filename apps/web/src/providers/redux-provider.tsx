'use client'; // ✅ Ensure this is a Client Component

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

interface Props {
    children: React.ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
