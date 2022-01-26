const devices = [
  [
    {
      systemName: "android",
      devices: [
        {
          name: "device",
          types: [],
        },
      ],
    },
  ],
  [
    {
      systemName: "windows",
      devices: [
        {
          name: "mobile",
          types: ["Mobile"],
        },
        {
          name: "desktop",
          types: ["win64", "wow64;", "wow64", "win64;"],
        },
      ],
    },
  ],
  [
    {
      systemName: "ios",
      devices: [
        {
          name: "device",
          types: ["iphone;", "iphone"],
        },
      ],
    },
    {
      systemName: "mac",
      devices: [
        {
          name: "desktop",
          types: ["macintosh", "macintosh;"],
        },
        {
          name: "tablet",
          types: ["ipad", "ipad;"],
        },
      ],
    },
  ],
  [
    {
      systemName: "linux",
      devices: [
        {
          name: "device",
          types: [],
        },
      ]
    }
  ]
];

const deviceDimensions = [
  {
    name: "phone-wide",
    maxWidth: 599,
  },
  {
    name: "tablet-portrait-wide",
    maxWidth: 600,
  },
  {
    name: "tablet-landscape-wide",
    maxWidth: 900,
  },
  {
    name: "desktop-wide",
    maxWidth: 1200,
  },
  {
    name: "big-desktop-wide",
    maxWidth: 1920,
  },
  {
    name: "large-desktop-wide",
    maxWidth: 2600,
  },
];

const detectDevice = () => {
  const ua = navigator.userAgent.toLocaleLowerCase();
  console.log(ua)
  let typeClassName;

  devices.forEach(systemGroup => {
    systemGroup.forEach(system => {
      system.devices.forEach(device => {
        let searchResult;

        if (device.types.length === 0) {
          searchResult = ua.search(system.systemName);
        } 

        device.types.forEach(type => {
          searchResult = ua.search(type);
        })

        if (searchResult !== -1) {
          typeClassName = `screen-wrapper--${system.systemName}--${device.name}`;
        }

        // expections
        if (ua.search("linux") !== -1 && ua.search("android") ) {
          typeClassName = "screen-wrapper--android--device";
          return;
        }
      })
    });
  });

  document.querySelector(".screen-wrapper").classList.add(typeClassName);
};

const detectDeviceWidth = () => {
  for (const dimension of deviceDimensions) {
    if (screen.width <= dimension.maxWidth) {
      document.querySelector(".screen-wrapper").classList.add(dimension.name);
      break;
    } 
  }
}

window.onload = () => {
  detectDevice();
  detectDeviceWidth();
};