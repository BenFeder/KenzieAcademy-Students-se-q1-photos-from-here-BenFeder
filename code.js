let success = function (position) {
  console.log(position);
};

let errorMessage = function () {
  window.alert("Could not access your location!");
  currentPosition.coords.latitude; // = New York City latitutde coord
  currentPosition.coords.longitude; // = New York City longitutde coord
};

let currentPosition = navigator.geolocation.watchPosition(
  success,
  errorMessage
);

let latPosition = currentPosition.coords.latitude;
let longPosition = currentPosition.coords.longitude;

// Flickr API key: c13bb7597944dc9db081eac7bccc6ad1
// Flickr Secret: fc35bde7caa46965

fetch(
  `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=c13bb7597944dc9db081eac7bccc6ad1&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=` +
    latPosition +
    `&lon=` +
    longPosition +
    `&text=dog`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataObject) {
    console.log(dataObject);
    dataObject.forEach(function (url) {
      let image = document.createElement("img");
      image.append(url);
      document.body.append(img);
    });
  });

function progressImage() {}

let progressionButton = document.createElement("button");
progressionButton.addEventListener("click", progressImage);
