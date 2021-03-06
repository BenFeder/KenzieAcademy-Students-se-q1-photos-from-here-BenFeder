let options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

navigator.geolocation.getCurrentPosition(
  useCurrentPosition,
  useFallbackPosition,
  options
);

function useCurrentPosition(pos) {
  retrievePhotos(pos.coords);
}

function useFallbackPosition() {
  retrievePhotos(fallbackLocation);
}
let fallbackLocation = { latitude: 40.712776, longitude: -74.005974 }; // New York City

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

function processResponse(response) {
  let responsePromise = response.json();
  responsePromise.then(displayPhotos);
}

let image = document.createElement("img");
document.body.append(image);

let progressButton = document.createElement("button");
progressButton.innerText = "Next Photo";

document.body.append(progressButton);

function displayPhotos(data) {
  let imgNum = 0;
  image.src = constructImageURL(data.photos.photo[imgNum]);
  progressButton.onclick = () => {
    if (imgNum < data.photos.photo.length - 1) {
      imgNum++;
      image.src = constructImageURL(data.photos.photo[imgNum]);
    } else if (imgNum == data.photos.photo.length - 1) {
      imgNum = 0;
      image.src = constructImageURL(data.photos.photo[imgNum]);
    }
  };
}

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
