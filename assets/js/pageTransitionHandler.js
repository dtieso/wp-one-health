import { initScroll } from "./animationHandler.js";
export function pageTransitionInit(){
    class Scroll extends highway.Transition{
        in({from, to, done, trigger}){
            const url = trigger.href;
            // Remove listener of back from browser
            window.removeEventListener('popstate',this.popStateHandler);
            // use Highway only on with enabled triggers
            const highwayEnabled = trigger.getAttribute('data-highway-enabled');
            if (!highwayEnabled || highwayEnabled !== 'true') window.location.href = url;
            const {scroll} = window.w;
            // Remove the scene for horizontal scroll to allowed vertical animation
            const {scene : horizontalScene} = scroll.getScene("mainHorizontalScene");
            horizontalScene.enabled(false);
            // Remove the scenes for parallax to keep parallax elements in position while vertical scrolling
            const parallaxScenes = scroll.getScene("parallax");
            
            parallaxScenes.map(({scene}) => scene.enabled(false))
            
            const animationDuration = 1.5 // Duration of scroll in sec
            const easeFunction = 'linear'
            const pinContainer = from.querySelector('#PinContainer');

            
            if(pinContainer) pinContainer.classList.add('moving');
            to.classList.add('moving');
            
            new TimelineMax()
                .to(
                    from,
                    animationDuration,
                    {
                        top:"-100%",
                        ease:easeFunction,
                        onComplete:()=>from.remove()
                    }
                )
                .to(
                    to,
                    animationDuration,
                    {top:0,ease:easeFunction},
                    `-=${animationDuration}`
                )
                .eventCallback("onComplete",()=>{
                    // Re enabled the scenes
                    horizontalScene.enabled(true);
                    parallaxScenes.map(({scene}) => scene.enabled(true))
                    // Remove animations classes
                    pinContainer.classList.remove('moving');
                    to.classList.remove('moving');

                    done();
                });
        }
        out({done,trigger}){
            // On back button from browser, don't use Highway
            if(trigger === 'popstate') window.location.href=window.location.href;
            done();
        }
    }

    const H = new highway.Core({
        transitions:{
            default:Scroll
        }
    })

    H.on('NAVIGATE_IN',function({to}){
        // When navigation animations start, reload script and styles specific for page
        manageScripts(to);
        manageStyles(to);
    })
}

function manageScripts(to) {
  // Your main JS file, used to prepend other scripts
  const main = document.querySelector('#main-script');
  const a = [...to.page.querySelectorAll('script:not([data-no-reload])')];
  const b = [...document.querySelectorAll('script:not([data-no-reload])')];

  // Compare Scripts
  for (let i = 0; i < b.length; i++) {
    const c = b[i];

    for (let j = 0; j < a.length; j++) {
      const d = a[j];

      if (c.outerHTML === d.outerHTML) {
        // Create Shadow Script
        const script = document.createElement(c.tagName);

        // Loop Over Attributes
        for (let k = 0; k < c.attributes.length; k++) {
          // Get Attribute
          const attr = c.attributes[k];

          // Set Attribute
          script.setAttribute(attr.nodeName, attr.nodeValue);
        }

        // Inline Script
        if (c.innerHTML) {
          script.innerHTML = c.innerHTML;
        }

        // Replace
        c.parentNode.replaceChild(script, c);

        // Clean Arrays
        b.splice(i, 1);
        a.splice(j, 1);

        // Exit Loop
        break;
      }
    }
  }

  // Remove Useless
  for (const script of b) {
    // Remove
    script.parentNode.removeChild(script);
  }

  // Add Scripts
  for (const script of a) {
    const loc = script.parentNode.tagName;

    if (loc === 'HEAD') {
      document.head.appendChild(script);
    }

    if (loc === 'BODY') {
      document.body.insertBefore(script, main);
    }
  }
}

function manageStyles(to) {
  // Your main css file, used to prepend other styles
  const main = document.querySelector('#main-style');

  const a = [...to.page.querySelectorAll('style:not([data-no-reload]), link:not([data-no-reload])')];
  const b = [...document.querySelectorAll('style:not([data-no-reload]), link:not([data-no-reload])')];

  // Compare Styles
  for (let i = 0; i < b.length; i++) {
    const c = b[i];

    for (let j = 0; j < a.length; j++) {
      const d = a[j];

      if (c.outerHTML === d.outerHTML) {
        // Create Shadow Style
        const style = document.createElement(c.tagName);

        // Loop Over Attributes
        for (let k = 0; k < c.attributes.length; k++) {
          // Get Attribute
          const attr = c.attributes[k];

          // Set Attribute
          style.setAttribute(attr.nodeName, attr.nodeValue);
        }

        // Style Tag
        if (c.tagName === 'STYLE') {
          if (c.innerHTML) {
            style.innerHTML = c.innerHTML;
          }
        }

        // Replace
        c.parentNode.replaceChild(style, c);

        // Clean Arrays
        b.splice(i, 1);
        a.splice(j, 1);

        // Exit Loop
        break;
      }
    }
  }

  // Remove Useless
  for (const style of b) {
    // Remove
    style.parentNode.removeChild(style);
  }

  // Add Styles
  for (const style of a) {
    const loc = style.parentNode.tagName;

    if (loc === 'HEAD') {
      document.head.insertBefore(style, main);
    }

    if (loc === 'BODY') {
      document.body.appendChild(style);
    }
  }
}