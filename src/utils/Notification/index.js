import addNotification from 'react-push-notification'

const pushNotif = (props, status) => {
    const validStatus = status?.toLowerCase()
    addNotification({
        ...props,
        theme: 'light', // optional, default: undefined
        duration: 3000, // optional, default: 5000,
        backgroundTop: 'dark', // optional, background color of top container.
        backgroundBottom: 'light', //optional, background color of bottom container.
        colorTop: validStatus === 'success' ? 'var(--success)' : 'var(--secondary)', //optional, font color of top container.
        colorBottom: 'var(--primary)', // optional, font color of bottom container.
        closeButton: 'close', // optional, text or html/jsx element for close text. Default: Close,
    });
}

export { pushNotif }