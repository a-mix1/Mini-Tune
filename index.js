function setTabVolume(tabId, volume) {
  // Fetches audio and volumes from the video that is currently being played

  
  const code = `
    var videoElements = document.querySelectorAll("video");
    videoElements.forEach(function(video) {
      video.volume = ${volume};
    });
  `;

  // Execute the JavaScript code in the context of the specified tab
  chrome.tabs.executeScript(tabId, { code });
}

function applyVolumeToTab(tabId, volume) {
  

  setTabVolume(tabId, volume); // Calls the setTabVolume method to change the volume of the active tab
}

const volumeSlider = document.getElementById('volume'); 


volumeSlider.addEventListener('input', function () {    // Listens for the input event on the volume slider
 

  const volume = parseFloat(volumeSlider.value);  // Retrieves the volume change being made on the slider and parses it as a float
  

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {  
   

    const activeTab = tabs[0];   
   

    applyVolumeToTab(activeTab.id, volume);
    
  });
});

volumeSlider.addEventListener('change', function () {  // Listens for the change event on the volume slider (when it's released)
 

  const volume = parseFloat(volumeSlider.value);
  

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    

    const activeTab = tabs[0];

    applyVolumeToTab(activeTab.id, volume);
    // Applies the final volume to the active tab
  });
});
