export function hotspotPosition() {
    const bg = window.document.querySelector('#TopContainer .svg-scroll');
    const hotspotContainer = window.document.getElementById('HotSpotContainer');

    if (!bg || !hotspotContainer) return;

    const bgWidth = bg?.clientWidth;
    hotspotContainer.style.width = bgWidth + "px";
}