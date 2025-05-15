import {ButtonBase, Stack, Typography, Paper, Box} from '@mui/material';

export const ProfileButton = ({ name = '', email = '', onClick = () => {} }) => {
    return (
        <ButtonBase onClick={() => onClick()} sx={{ borderRadius: 2 }} onMouseEnter={() => onClick()}>
            <Box
                elevation={3}
                sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: '#eeeeee',
                    },
                }}
            >
                <Stack direction="column" spacing={0.2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email}
                    </Typography>
                </Stack>
            </Box>
        </ButtonBase>
    );
};
