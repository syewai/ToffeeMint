var r = new Router(
  {
    about: new Layout(new Page('menu.html'), new Page('about.html')),
    home: new Layout(new Page('menu.html'), new Page('home.html')),
    '#default': new Page('menu.html'),
  },
  document.querySelector('main')
);

