function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1", {
    yPercent: 100,
    delay: 0.5,
    duration: 0.6,
    stagger: 0.2,
  });

  tl.from("#line1-p1,.line h2", {
    opacity: 0,
    onStart: function () {
      let timer = document.querySelector("h5.load");
      let count = 0;

      let interval = setInterval(() => {
        if (count < 100) {
          count++;
        } else {
          clearInterval(interval);
        }
        timer.innerHTML = count;
      }, 35);
    },
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });

  tl.to("#loader", {
    opacity: 0,
    //   yPercent: -100,
    duration: 0.8,
    delay: 3.4,
  });
  tl.from("#page1", {
    delay: 0.2,
    yPercent: 100,
    opacity: 0,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from(".hero-text h1", {
    yPercent: 100,
    duration: 0.8,
    stagger: 0.3,
  });
  tl.from("#hero-anime h2", {
    yPercent: 100,
    duration: 0.8,
    stagger: .3,
  }, "-=1.2");
}
function customCursor(){
  let cursor = document.querySelector("#crsr")
  document.addEventListener("mousemove",(dets)=>{
    gsap.to(cursor,{
      x:dets.x-(cursor.getBoundingClientRect().width/2),
      y:dets.y - (cursor.getBoundingClientRect().height/2)
    })
  })
  Shery.makeMagnet(".links")
}
loadingAnimation()
customCursor()