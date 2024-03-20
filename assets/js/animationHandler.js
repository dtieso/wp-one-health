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

    const pinContainer = window.document.getElementById("PinContainer");
    const highwayContainer = window.document.getElementById("HighwayContainer");
    const bg = window.document.querySelector("#TopContainer object");
    
    
    highwayContainer?.addEventListener('scroll', function (e) {
        console.log('scroll')
        e.preventDefault();
    })

    
}
