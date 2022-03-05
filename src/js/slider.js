export default function addSlider(element) {


  element.addEventListener('wheel', (event) => {
    event.preventDefault();

    element.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
      
    });
  });


  // let isDown = false;
  // let startX;
  // let scrollLeft;

  // slider.addEventListener("mousedown", (e) => {
  //   isDown = true;
  //   startX = e.pageX - slider.offsetLeft;
  //   scrollLeft = slider.scrollLeft;
  // });
  // slider.addEventListener("mouseleave", () => {
  //   isDown = false;
  // });
  // slider.addEventListener("mouseup", () => {
  //   isDown = false;
  // });
  // slider.addEventListener("mousemove", (e) => {
  //   if (!isDown) return;
  //   e.preventDefault();
  //   const x = e.pageX - slider.offsetLeft;
  //   const walk = x - startX;
  //   slider.scrollLeft = scrollLeft - walk;
  // });
}
