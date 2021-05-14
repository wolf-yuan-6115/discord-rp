window.dispatchEvent(new Event("connect"));

window.addEventListener("rec", function (e) {
  console.log(e.detail)
})