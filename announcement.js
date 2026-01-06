
// Announcement Bar dynamic spacing
function updateAnnouncementSpacing() {
    const bar = document.querySelector('.announcement-bar');
    if (bar) {
        const height = bar.offsetHeight;
        document.documentElement.style.setProperty('--announcement-height', `${height}px`);
    } else {
        document.documentElement.style.setProperty('--announcement-height', '0px');
    }
}

// Update on load and resize
window.addEventListener('load', updateAnnouncementSpacing);
window.addEventListener('resize', updateAnnouncementSpacing);
// Also update immediately in case DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAnnouncementSpacing);
} else {
    updateAnnouncementSpacing();
}
