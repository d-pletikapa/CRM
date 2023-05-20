// BOM
window.document.body.style.backgroundColor = 'black';
console.log(navigator);
console.log(location);
// location.href = 'https://google.com';
// location.assign('https://google.com');
// location.reload();
console.log(history);
// history.back();
// history.go('1');

// window.getSelection();
// window.open(); or open('page.html');
// open('about:blank', 'targetName', 'popup, width=300, top=300');
// scrollbars = yes,
// resizable = yes,
// menubar= yes,
// location= 'https://'
// status= yes,

const win =
  open('about:blank', '', 'width=300, height=300, top=300');
win.document.body.innerHTML = `
<h1>Привет Мир!</h1>
`;

const button = document.createElement('button');
button.textContent = 'move';
win.document.body.append(button);
button.addEventListener('click', () => {
  // win.moveTo(2500, 500); // координаты
  win.moveBy(100, 100);
});

const close = document.createElement('button');
close.textContent = 'close';
win.document.body.append(close);
close.addEventListener('click', () => {
  // win.moveTo(2500, 500); // координаты
  win.close();
  // смена размера окна
  // win.resizeTo(100, 100);
  // win.resizeBy(200, 200);
});


