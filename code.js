function constructImageURL(photoObj) {
  return (
    // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
    "https://live.staticflickr.com/" +
    photoObj.server +
    "/" +
    photoObj.id +
    "_" +
    photoObj.secret +
    ".jpg"
  );
}

function displayPhotos(data) {
  let image = document.createElement("img");
  if (image.src == "") {
    image.setAttribute("src", constructImageURL(data.photos.photo[0]));
  } else if (image.src == constructImageURL(data.photos.photo[0])) {
    imagesetAttribute("src", constructImageURL(data.photos.photo[1]));
  } else if (image.src == constructImageURL(data.photos.photo[1])) {
    imagesetAttribute("src", constructImageURL(data.photos.photo[2]));
  } else if (image.src == constructImageURL(data.photos.photo[2])) {
    imagesetAttribute("src", constructImageURL(data.photos.photo[3]));
  } else if (image.src == constructImageURL(data.photos.photo[3])) {
    imagesetAttribute("src", constructImageURL(data.photos.photo[4]));
  } else if (image.src == constructImageURL(data.photos.photo[4])) {
    imagesetAttribute("src", constructImageURL(data.photos.photo[0]));
  }
  document.body.append(image);
}

let progressButton = document.createElement("button");
progressButton.innerText = "Next Photo";
progressButton.addEventListener("click", displayPhotos);
document.body.append(progressButton);

function processResponse(response) {
  let responsePromise = response.json();
  responsePromise.then(displayPhotos);
}

function retrievePhotos(coords) {
  let fetchPromise = fetch(
    "https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=c13bb7597944dc9db081eac7bccc6ad1&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=" +
      coords.latitude +
      "&lon=" +
      coords.longitude +
      "&text=trees"
  );

  fetchPromise.then(processResponse);
}
let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

let fallbackLocation = { latitude: 40.712776, longitude: -74.005974 }; // New York City

function useCurrentPosition(pos) {
  retrievePhotos(pos.coords);
}

function useFallbackPosition() {
  retrievePhotos(fallbackLocation);
}

navigator.geolocation.getCurrentPosition(
  useCurrentPosition,
  useFallbackPosition,
  options
);

// demo from Randy Cox helped guide me
