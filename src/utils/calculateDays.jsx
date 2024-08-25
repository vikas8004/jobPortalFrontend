export default function calculateDays(data) {
    const createdAt = new Date(data);
    const now = new Date();
    const diff = now - createdAt;
    return (Math.floor(diff / (1000 * 24 * 60 * 60)))
}