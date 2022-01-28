import sayHello from "./file.js"

/*
  Array which allows us to loop through device types

  overall structure: [ [], [], [] ] - array of arrays. Each inner array is a group of related operating systems (e.g. mac and ios)
  structure of inner array: [ {}, {} ] - one or two objects. Each object represents a particular OS
  structure of the OS object: { systemName, devices } - devices - list of device types available in that OS
  structure of devices: [ {}, {} ] - each object is a separate device 
  structure of the device: { name, types } - types - array of strings which will help us to search through userAgent string 
*/
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

sayHello();

// Array which allows us to loop through different device sizes
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

/* 
  Function which in the end assigns a class to outer wrapper of the application which tells 
  what device a user is in.
*/
const detectDevice = () => {
  const ua = navigator.userAgent.toLocaleLowerCase();
  let typeClassName;

  devices.forEach(systemGroup => {
    systemGroup.forEach(system => {
      system.devices.forEach(device => {
        let searchResult;

        // If there are no types for this particular device, do the search with systemName (windows, linux, android, etc)
        if (device.types.length === 0) {
          searchResult = ua.search(system.systemName);
        } 

        // Otherwise, search for each individual type is executed
        device.types.forEach(type => {
          searchResult = ua.search(type);
        })

        // If there's a match in the search, assign this value to the class variable
        if (searchResult !== -1) {
          typeClassName = `screen-wrapper--${system.systemName}--${device.name}`;
        }

        /* 
          Expections.
          If you are on android, your userAgent will have both linux and android strings matches.
          Here typeClassName is explicitly set to the value of android
        */
        if (ua.search("linux") !== -1 && ua.search("android") ) {
          typeClassName = "screen-wrapper--android--device";
        }
      })
    });
  });

  document.querySelector(".screen-wrapper").classList.add(typeClassName);
};

const detectDeviceWidth = () => {
  for (const dimension of deviceDimensions) {
    // if there's a match, assign the class and exit from the loop
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