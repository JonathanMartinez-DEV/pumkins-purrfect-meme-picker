import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (const cat of cats) {
    for (const emotion of cat.emotionTags) {
      emotionsArray.push(emotion);
    }
  }

  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioItems = "";

  for (const emotion of emotions) {
    radioItems += `<p>${emotion}</p>`;
  }

  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
