const devices = ["windows", "mac", "iphone", "android", "linux"];

const detectDevice = () => {
  const ua = navigator.userAgent.toLocaleLowerCase();

  devices.forEach(device => {
    const searchResult = ua.search(device)

    if (searchResult !== -1) {
      document.querySelector(".screen-wrapper").classList.add(`screen-wrapper--${device}`);
    }
  });
};

window.onload = detectDevice;