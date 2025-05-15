// components/PageWrapper.tsx
import {CircularProgress, Box} from '@mui/material';

export const PageWrapper = ({isLoading, children}) => {
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress/>
            </Box>
        );
    }

    return <>{children}</>;
};
