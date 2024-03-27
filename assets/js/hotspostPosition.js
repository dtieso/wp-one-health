export function hotspotPosition() {
    const USED_WIDTH_FOR_POSITIONING = 11679;
    const USED_HEIGHT_FOR_POSITIONING = 764;

    const panoramaContainer = window.document.getElementById('PinContainer');
    const bgTop = window.document.getElementById('TopContainer');
    const bgScene = window.document.querySelector('#ScenesContainer .svg-scroll');
    const tops = window.document.querySelectorAll('.top');

    const hotspotContainer = window.document.getElementById('HotSpotContainer');

    if (!bgScene || !hotspotContainer || !bgTop || !panoramaContainer) return;

    const bgWidth = bgScene?.clientWidth;
    const bgHeight = bgScene?.clientHeight;
    bgTop.style.width = bgWidth + "px";
    hotspotContainer.style.width = bgWidth + "px";
    hotspotContainer.style.opacity = "1";
    
    console.log('🚀 ~ hotspotPosition ~ bgWidth2:', bgWidth);
    console.log('🚀 ~ hotspotPosition ~ bgHeight:', bgHeight);

    const throttle = (funct, limit) => {
        let lastFunc;
        let lastRan;

        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                funct.apply(context, args);
                lastRan = Date.now();
            }
            else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        funct.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan))
            }
        }
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }


    // const handleWheel = (event) => {
        // event.preventDefault();
        // const goindDown = event.deltaY > 0 ? true : false;
        // if (goindDown) {
        //     panoramaContainer.scrollBy({
        //         left: Math.abs(event.wheelDeltaY) * 50,
        //         behavior:'smooth'
        //     })
        // }
        // else {
        //     panoramaContainer.scrollBy({
        //         left: Math.abs(event.wheelDeltaY) * -50,
        //         behavior:'smooth'
        //     })
        // }
    // }

    // window.document.addEventListener('wheel', handleWheel,{passive:false});
    
    const handleScroll = (e) => {
        const scrollAmount = panoramaContainer.scrollLeft;
        
        const windowWidth = window.innerWidth;
        const scrollPercent = (scrollAmount + windowWidth) * 100 / panoramaContainer.scrollWidth;
        // const visibilityStart = scrollAmount;
        // const visibilityEnd = scrollAmount + windowWidth;
        const parallaxFactor = 0.025
        if (tops.length < 1) return;

        tops.forEach(top => {
            const topPositionPercentage = parseFloat(top.style.left);
            const delta = topPositionPercentage - scrollPercent;
            if (topPositionPercentage - 2 < scrollPercent) {
                // console.log('top', top);
                // console.log('tpp',topPositionPercentage)
                // console.log('sp',scrollPercent)
                // console.log('tpp-sp', topPositionPercentage - scrollPercent)
                // top.style.left = topPositionPercentage - scrollPercent/ delta * parallaxFactor + "%";
            }
            
        })
        
    }
    panoramaContainer.addEventListener('scroll',throttle(handleScroll,250));
}
