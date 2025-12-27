function initScroll() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
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
    yPercent: -100,
    duration: 0.5,
    ease: "none",
    delay: 3.4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from(
    ".hero-text h1",
    {
      yPercent: 100,
      duration: 0.8,
      stagger: 0.3,
    },
    "-=.8"
  );
  tl.from(
    "#hero-anime h2",
    {
      yPercent: 100,
      duration: 0.8,
      stagger: 0.3,
    },
    "-=1.2"
  );
  tl.from(
    ".hero-text h1",
    {
      opacity: 0,
      duration: 0.8,
    },
    "-=1.3"
  );
}
function customCursor() {
  let cursor = document.querySelector("#crsr");
  let flag = document.querySelector("#flag");
  document.addEventListener("mousemove", (dets) => {
    // console.log(flag.getBoundingClientRect().left);
    gsap.to(cursor, {
      x: dets.x - cursor.getBoundingClientRect().width / 2,
      y: dets.y - cursor.getBoundingClientRect().height / 2,
      duration: 0,
    });
    gsap.to(flag, {
      x: dets.x - flag.getBoundingClientRect().width / 2,
      y: dets.y - flag.getBoundingClientRect().height / 2,
      duration: 0.3,
    });
  });
  document.querySelector("#hero-anime").addEventListener("mousemove", () => {
    gsap.to("#flag", {
      opacity: 1,
      duration: 0.2,
    });
  });
  document.querySelector("#hero-anime").addEventListener("mouseleave", () => {
    gsap.to("#flag", {
      opacity: 0,
      duration: 0.2,
    });
  });
  let vdocontainer = document.querySelector("#vdo-container");
  let vdo = document.querySelector("#vdo-container video");
  vdocontainer.addEventListener("mouseenter", (dets) => {
    gsap.to("#vdo-cursor", {
      x: dets.x - (vdocontainer.getBoundingClientRect().width + 100),
      y: dets.y - vdocontainer.getBoundingClientRect().top,
      duration: 0.8,
    });
    vdocontainer.addEventListener("mousemove", (dets) => {
      gsap.to("#crsr", {
        opacity: 0,
      });
      gsap.to("#vdo-cursor", {
        x: dets.x - (vdocontainer.getBoundingClientRect().width + 100),
        y: dets.y - vdocontainer.getBoundingClientRect().top,
      });
    });
    vdocontainer.addEventListener("click", () => {
      if (vdo.paused) {
        vdo.style.opacity = 1;
        vdocontainer.querySelector("img").style.display = "none";
        document.querySelector(
          "#vdo-cursor"
        ).innerHTML = `<i class="ri-pause-fill"></i>`;
        gsap.to("#vdo-cursor", {
          scale: 0.5,
          duration: 0.5,
        });
        vdo.play();
      } else {
        vdocontainer.querySelector("img").style.display = "inline-block";
        vdo.pause();
        document.querySelector(
          "#vdo-cursor"
        ).innerHTML = `<i class="ri-play-fill"></i>`;
        gsap.to("#vdo-cursor", {
          scale: 1,
          duration: 0.5,
        });
        vdo.style.opacity = 0;
      }
    });
    vdocontainer.addEventListener("mouseleave", () => {
      gsap.to("#crsr", {
        opacity: 1,
      });
      gsap.to("#vdo-cursor", {
        x: 0,
        y: 0,
        duration: 0.7,
      });
    });
  });

  let projects = document.querySelector(".all-projects");
  projects.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1.3,
      duration: 0.5,
    });
    gsap.to(projects, {
      scale: 0.8,
      duration: 0.5,
    });
  });
  projects.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.5,
    });
    gsap.to(projects, {
      scale: 1,
      duration: 0.5,
    });
  });
  Shery.makeMagnet(".links");
}
function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    config: {
      a: { value: 2.06, range: [0, 30] },
      b: { value: 0.91, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7666526861631143 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.37, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.56, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.34, range: [0, 2] },
      noise_scale: { value: 9.92, range: [0, 100] },
    },
    gooey: true,
  });
}
function textAnime() {
  document.querySelectorAll(".effect-cont").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      let text = element.querySelectorAll(".effect-heading div");
      gsap.to(text, {
        yPercent: -100,
        duration: 0.5,
        stagger: 0.1,
      });
    });
    element.addEventListener("mouseleave", () => {
      let text = element.querySelectorAll(".effect-heading div");
      gsap.to(text, {
        yPercent: 0,
        duration: 0.5,
        stagger: -0.1,
      });
    });
  });
}
function TriggerAnimations() {
  document.querySelectorAll(".slide h1").forEach((elem) => {
    gsap.from(elem, {
      yPercent: 100,
      duration: 0.8,
      ease: "circ.out",
      scrollTrigger: {
        trigger: elem,
        scroller: "main",
        start: "top 90%",
      },
      onComplete: () => {
        gsap.set(elem.parentElement, { overflow: "visible" });
      },
    });
  });
  document.querySelectorAll(".underline").forEach((elem) => {
    gsap.from(elem, {
      scale: "0",
      transformOrigin: "right center",
      duration: 2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: elem,
        scroller: "main",
        start: "top 80%",
      },
    });
  });
  document.querySelectorAll(".effect-cont").forEach((element) => {
    let text = element.querySelectorAll(".effect-heading div");
    gsap.from(text, {
      yPercent: 100,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: element,
        scroller: "main",
        start: "top 80%",
      },
    });
    let footer = element.querySelector(".effect-footer");
    gsap.from(footer, {
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: footer,
        scroller: "main",
        start: "top 90%",
      },
    });
    let line = element.querySelector(".effect-cont span");
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 1,
      scrollTrigger: {
        trigger: line,
        scroller: "main",
        start: "top 90%",
      },
    });
  });
  ["footer h1", "footer .box", "#page4-content p"].forEach((selector) => {
    gsap.from(selector, {
      opacity: 0,
      duration: 0.6,
      yPercent: 10,
      scrollTrigger: {
        trigger: selector,
        scroller: "main",
        start: "top 80%",
      },
    });
  });
  [".page3-circle1", ".page3-circle2"].forEach((selector) => {
    gsap.from(selector, {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: selector,
        scroller: "main",
        start: "top 70%",
      },
    });
  });
  let split = SplitText.create("#page4-content>p", {
    type: "lines",
    mask: "lines",
  });
  gsap.from(split.lines, {
    yPercent: 100,
    duration: 0.6,
    scrollTrigger: {
      trigger: "#page4-content p",
      scroller: "main",
      start: "top 80%",
    },
    stagger: 0.1,
    onComplete: () => {
      split.revert();
    },
  });
}
function footerAnimation() {
  const string = "Let’s Create";
  const textContainer = document.querySelector(".heading-cont");
  const headings = textContainer.querySelectorAll("h1");
  let split1 = SplitText.create(headings[0], { type: "chars" });
  let split2 = SplitText.create(headings[1], { type: "chars" });
  gsap.to(split2.chars, {
    opacity: 0,
  });
  textContainer.addEventListener("mouseenter", () => {
    gsap.fromTo(
      split1.chars,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.08,
        stagger: .05,
      }
    );
    gsap.to(split2.chars, {
      opacity: 1,
      fontFamily: "silkserif-lightitalic",
      duration: 0.08,
      delay: 0.15,
      stagger: .05,
      top: "-10%",
    });
    gsap.to("svg.arrow", {
      x: 30,
      duration: 0.5,
      delay:.6
    });
  });
  textContainer.addEventListener("mouseleave", () => {
    gsap.fromTo(
      split1.chars,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.08,
        stagger: .05,
        delay: 0.15,
      }
    );
    gsap.fromTo(
      split2.chars,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.08,
        stagger: .05,
        top: "-10%",
      }
    );
    gsap.to("svg.arrow", {
      x: 0,
      duration: 0.5,
      delay:.6
    });
  });
}
function footerLinks() {
  const links = document.querySelectorAll(".link-cont")
  links.forEach((link,idx)=>{
    link.addEventListener("mouseenter",(dets)=>{
      gsap.to(link.querySelectorAll("h6"),{
        y:"-100%"
      })
    })
    link.addEventListener("mouseleave",(dets)=>{
      gsap.to(link.querySelectorAll("h6"),{
        y:"0%"
      })
    })
  })
}
function main() {
  initScroll();
  loadingAnimation();
  customCursor();
  sheryAnimation();
  textAnime();
  footerAnimation();
  footerLinks()
  if (window.innerWidth > 768) {
    TriggerAnimations();
  }
  const video = document.querySelector("#vdo-container video");
  video.load();
}
window.onload = main;
