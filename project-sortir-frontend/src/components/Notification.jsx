/* eslint-disable react/prop-types */
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

const Notification = (props) => {
    if (!props.isVisible) {
        return null;
    }
    return (
        <Alert
            status={props.status}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex="toast"
        >
            <AlertIcon />
            <AlertDescription textAlign="center">{props.description}</AlertDescription>
        </Alert>
    );
}

export default Notification;