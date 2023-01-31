// BOM Event-listeners
window.document.body.style.backgroundColor = '#000';
window.addEventListener('resize', () => {
  console.log('resize');
});

const foo = () => {
  if (window.scrollY > 600) {
    console.log('scroll');
    alert(123);
    window.removeEventListener('scroll', foo);
  }
};
window.addEventListener('scroll', foo);

window.addEventListener('focus', () => {
  console.log('focus');
});

window.addEventListener('blur', () => {
  console.log('blur');
});

// scrollTo(100, 100);
// scrollBy(100, 100);
// setInterval();
// setTimeout();
// Date();

// document (DOM)
document.title;
document.domain;
document.referrer;
document.characterSet;
document.images;
document.forms;
document.styleSheets;
document.scripts;
document.URL;

console.log(screen);
console.log(fetch);
