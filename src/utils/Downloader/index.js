import { pushNotif } from ".."

const downloadFile = async (fileURL, filename) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        }

        const response = await fetch(fileURL, config)

        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename ? filename + '.pdf' : 'literature.pdf')

        // append link to body
        document.body.appendChild(link);

        // start download
        link.click();

        // clean up and remove the link
        link.parentNode.removeChild(link)
    } catch (error) {
        // push notif when error
        pushNotif({
            title: 'Error',
            message: 'Cannot download file'
        })
    }
}

export { downloadFile }
