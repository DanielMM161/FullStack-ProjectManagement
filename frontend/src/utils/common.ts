export function formatDate(dateStr: string) {
    try {
        const date = new Date(dateStr);
        const month = date.toLocaleString('default', { month: 'long' });
        return `${date.getDay()} ${month} ${date.getFullYear()}`    
    } catch (error) {
        console.error("Error Format Date --> ", error)
        return ''
    }
}