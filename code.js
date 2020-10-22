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

function displayPhotos(data) {
  for (let img = 0; img < data.photos.photo.length; img++) {
    if (img == 0) {
      let image0 = document.createElement("img");
      image0.setAttribute("src", constructImageURL(data.photos.photo[img]));
      document.body.append(image0);

      let image0Text = document.createElement("h4");
      image0Text.innerText = image0.src;
      document.body.append(image0Text);
    } else if (img == 1) {
      let image1 = document.createElement("img");
      image1.setAttribute("src", constructImageURL(data.photos.photo[img]));
      // document.body.append(image1);

      let image1Text = document.createElement("h4");
      image1Text.innerText = image1.src;
      // document.body.append(image1Text);
    } else if (img == 2) {
      let image2 = document.createElement("img");
      image2.setAttribute("src", constructImageURL(data.photos.photo[img]));
      // document.body.append(image2);

      let image2Text = document.createElement("h4");
      image2Text.innerText = image2.src;
      // document.body.append(image2Text);
    } else if (img == 3) {
      let image3 = document.createElement("img");
      image3.setAttribute("src", constructImageURL(data.photos.photo[img]));
      // document.body.append(image3);

      let image3Text = document.createElement("h4");
      image3Text.innerText = image3.src;
      // document.body.append(image3Text);
    } else if (img == 4) {
      let image4 = document.createElement("img");
      image4.setAttribute("src", constructImageURL(data.photos.photo[img]));
      // document.body.append(image4);

      let image4Text = document.createElement("h4");
      image4Text.innerText = image4.src;
      // document.body.append(image4Text);
    }
  }
}

let progressButton = document.createElement("button");
progressButton.innerText = "Next Photo";
progressButton.addEventListener("click", nextPhoto);
document.body.append(progressButton);

// THIS FUNCTION DOES NOT EXECUTE AS EXPECTED, images 0-4 ARE NOT DEFINED
// ...and image0Text-image4Text would append after each other
function nextPhoto() {
  if (document.body.lastElementChild == image0) {
    image0.append(image1);
    document.body.append(image1Text);
  }
  if (document.body.lastElementChild == image1) {
    image1.append(image2);
    document.body.append(image2Text);
  }
  if (document.body.lastElementChild == image2) {
    image2.append(image3);
    document.body.append(image3Text);
  }
  if (document.body.lastElementChild == image3) {
    image3.append(image4);
    document.body.append(image4Text);
  }
  if (document.body.lastElementChild == image4) {
    image4.append(image0);
    document.body.append(image0Text);
  }
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

// demo from Randy Cox helped guide me
