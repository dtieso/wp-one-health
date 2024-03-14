export function initScroll(){
    window.w = window.w || {};
    // Create a wrapper for easier management of scenes
    class ScrollAnimations{
        constructor(controllerConfig = {}, ){
            this.controller = new ScrollMagic.Controller(controllerConfig);
            this.config = controllerConfig;
            this.scenes = [];
            this.tweens = []; 
        }

        getMainConfig() {
            return this.config;
        }
        getController(){
            return this.controller;
        }
        getTweens(){
            return this.tweens;
        }
        getScenes() {
            return this.scenes;
        }
        getTween(name){
            const tweens = this.tweens.filter(tween => tween.name === name);
            if ( tweens.length === 0) throw new Error(`Tween ${name} not found`)
            if (tweens.length > 1) return tweens;
            else return tweens[0];
        }
        getScene(name){
            const scenes = this.scenes.filter(scene => scene.name === name);
            if ( scenes.length === 0) throw new Error(`Scenes ${name} not found`)
            if (scenes.length > 1) return scenes;
            else return scenes[0];
        }
        setTween(tween,name,component){
            this.tweens.push({tween,name,component});
        }
        setScene(scene,name,triggerElement){
            this.scenes.push({scene,name,triggerElement});
        }
        createScene(sceneConfig,pin,tween,name,indicators=false){
            if (!sceneConfig || !tween ) 
                throw new Error(`Params are required to create scene: ${name}`)
            if (!name) throw new Error('Missing name creating scence');
            
            let scene;
            
            if(pin) {
                if (indicators) {
                    scene = new ScrollMagic.Scene(sceneConfig)
                        .setPin(pin)
                        .setTween(tween) 
                        .addIndicators() 
                        .addTo(this.controller)

                }
                else {
                    scene = new ScrollMagic.Scene(sceneConfig)
                        .setPin(pin)
                        .setTween(tween) 
                        .addTo(this.controller)
                }
            }
            else {
                if(indicators){
                    scene = new ScrollMagic.Scene(sceneConfig)
                        .setTween(tween)
                        .addIndicators() 
                        .addTo(this.controller)
                }
                else {
                    scene = new ScrollMagic.Scene(sceneConfig)
                        .setTween(tween)
                        .addTo(this.controller)
                }
            }
            this.setScene(scene,name,pin);
            return scene;
        }
    }

    const scroll = new ScrollAnimations();
    window.w.scroll = scroll;
    
    // Tweens definitions
    const horizontalScrollTween = new TimelineMax()
        .to("#SliderContainer", 1, {x: "-25%"})
  		.to("#SliderContainer", 1, {x: "-50%"})
  		.to("#SliderContainer", 1, {x: "-75%"})      

    const sunTween = new TimelineMax()
        .fromTo("#sun",1,{left:0,top:"20%"},{left:"20%",top:"-10%"})
        .to("#sun",1,{left:"70%",top:"6.875%"})  

    const slide1Parallax = new TimelineMax()
        .add([
            TweenMax.fromTo("#ParallaxOne .layer-fast", 1, 
                {left: "25%",opacity:2},{left:"-25%",opacity:0,ease: "linear"}
            ),
            TweenMax.fromTo("#ParallaxOne .layer-slow",1,
                {left:"-25%",opacity:2},{left:"-50%",opacity:0,ease: "linear"}
            )
        ]);
    const slide2Parallax = new TimelineMax()
        .add([
            TweenMax.fromTo("#ParallaxTwo .layer-fast",1,
                {left: "25%",opacity:2},{left:"-25%",opacity:0,ease: "linear"}
            ),
            TweenMax.fromTo("#ParallaxTwo .layer-slow",1,
                {left:"-25%",opacity:2},{left:"-50%",opacity:0,ease: "linear"}
            ),
        ])

    const slide3Parallax = new TimelineMax()
        .add([
            TweenMax.fromTo("#ParallaxThree .layer-fast",1,
                {left: "25%",opacity:2},{left:"-25%",opacity:0,ease: "linear"}
            ),
            TweenMax.fromTo("#ParallaxThree .layer-slow",1,
                {left:"-25%",opacity:2},{left:"-50%",opacity:0,ease: "linear"}
            ),
        ])

    const slide4Parallax = new TimelineMax()
        .add([
            TweenMax.fromTo("#ParallaxFour .layer-fast",1,
                {left: "100%",opacity:0},{left:0,opacity:1,ease: "linear"}
            ),
            TweenMax.fromTo("#ParallaxFour .layer-slow",1,
                {left:"100",opacity:0},{left:"-40%",opacity:1,ease: "linear"}
            ),
        ])
;

    // Main Horizontal Tween and Scene
    scroll.setTween(horizontalScrollTween,"mainHorizontalTween","#SliderContainer");
    scroll.createScene({
        triggerElement:"#PinContainer",
        triggerHook:0,
        duration:"400%"
    },"#PinContainer",horizontalScrollTween,"mainHorizontalScene")
    
    // Sun Tween and Scene
    scroll.setTween(sunTween,"sunTween","#sun");
    scroll.createScene({
      triggerElement:"#PinContainer",
      duration:"400%"  
    },null,sunTween,"sunScene")

    // Parallax Tween and Scene
    scroll.setTween(slide1Parallax,"parallaxOne",["#ParallaxOne .layer-back","#ParallaxOne .layer-base"]);
    scroll.createScene({
        triggerElement:"#PinContainer",
        duration:"100%",
    },null,slide1Parallax,"parallax")

    scroll.setTween(slide2Parallax,"parallaxTwo",["#ParallaxTwo .layer-back","#ParallaxTwo .layer-base"]);
    scroll.createScene({
        triggerElement:"#PinContainer",
        duration:"300%",
        offset:"300%"
    },null,slide2Parallax,"parallax")

    scroll.setTween(slide1Parallax,"parallaxThree",["#ParallaxThree .layer-back","#ParallaxThree .layer-base"]);
    scroll.createScene({
        triggerElement:"#PinContainer",
        duration:"400%",
        offset:"900%"
    },null,slide3Parallax,"parallax")

    scroll.setTween(slide2Parallax,"parallaxFour",["#ParallaxFour .layer-back","#ParallaxFour .layer-base"]);
    scroll.createScene({
        triggerElement:"#PinContainer",
        duration:"400%",
        offset:"400%"
    },null,slide4Parallax,"parallax",true)
}
