
window.onload = function success() {
  const url = window.location.href;
  console.log(url);
  const message = url.split('?');
  console.log(unescape(message[1]));
  document.getElementById('success').innerHTML = unescape(message[1]);
};
