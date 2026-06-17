const navLinks = document.querySelectorAll('.topnav .nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});
