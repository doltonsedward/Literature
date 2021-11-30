import { toast } from 'react-toastify'

const downloadPDF = async (fileURL, filename) => {
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
        const message = error.response.data.message || 'Cannot download file'
        toast.error(message)
    }
}

export { downloadPDF }
