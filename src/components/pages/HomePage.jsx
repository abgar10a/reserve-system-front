import {Box, Stack, Typography} from "@mui/material";

export default function HomePage() {
    return (
        <Stack spacing={2} direction="column" sx={{height: '100%'}}>
            <Box display="flex" justifyContent='flex-start' flexDirection='column' sx={{paddingTop: '1%', paddingBottom: '1%'}}>
                <Box sx={{ml: '10%', whiteSpace: 'pre-line'}}>
                    <Typography variant="h2">{"Where Every Meal "}</Typography>
                </Box>
                <Box sx={{ml: '30%', whiteSpace: 'pre-line'}}>
                    <Typography variant="h2">{"Tells a Story."}</Typography>
                </Box>
            </Box>
            <Stack spacing={2} direction="row" sx={{height: '100%'}}>
                <img src='src/assets/icons/logo.png' alt='main' style={{width: '30%', height: '30%', paddingLeft: '10%', paddingTop: '5%'}}/>
                <Box display='flex' justifyContent='center' sx={{width: '35%', paddingLeft: '5%', paddingTop: '5%'}}>
                    <Typography
                        variant='h4' lineHeight={1.5}>{"At our restaurant, we blend tradition and taste to create unforgettable dining experiences. Whether you're here for a cozy dinner or a celebration with friends, every dish is made with passion and care."}</Typography>
                </Box>
            </Stack>
        </Stack>
    );
}