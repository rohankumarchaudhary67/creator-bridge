const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${hours}:${minutes} | ${day} ${month}, ${year}`;
};

export { formatTimestamp };
