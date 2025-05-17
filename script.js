import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const closeModalBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
getImageBtn.addEventListener("click", renderCat);
closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
  memeModal.style.display = "none";
}

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (const radio of radios) {
    radio.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
  if (document.querySelector("input[type='radio']:checked")) {
    const selectedEmotion = document.querySelector(
      "input[type='radio']:checked"
    ).value;
    const isGifChecked = gifOnlyOption.checked;

    const matchingCatsArray = catsData.filter((cat) => {
      if (isGifChecked && cat.isGif) {
        return cat.emotionTags.includes(selectedEmotion);
      }

      return cat.emotionTags.includes(selectedEmotion);
    });

    return matchingCatsArray;
  }
}

function getSingleCatObj() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomIndex = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomIndex];
  }
}

function renderCat() {
  const catObject = getSingleCatObj();

  memeModalInner.innerHTML = `
    <img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}" />
    `;

  memeModal.style.display = "flex";
}

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (const cat of cats) {
    for (const emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }

  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioItems = "";

  for (const emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="choice-radio" />
        </div>
    `;
  }

  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
