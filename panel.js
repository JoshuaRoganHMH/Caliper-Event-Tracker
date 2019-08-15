// Keep a record of the caliper track events
let trackEvents = [];

// HTML element to output our data.
const output = document.querySelector('.events-output');

// Simple render function.
const render = () => {
  output.innerHTML = '';
  var eventIndex = 0;
  for (eventIndex in trackEvents) {
    output.innerHTML += `<p>${trackEvents[eventIndex]}</p>`
  }
};

// When a network request has finished this function will be called.
chrome.devtools.network.onRequestFinished.addListener(request => {
  let curURL = String(request.request.url);

  if (curURL.endsWith("api/eventservice/v1/caliper/events")) {
    console.log("CALIPER EVENTS: " + curURL);
    console.log(request.request.postData.text);

    let splitText = request.request.postData.text.split(",");
    console.log(splitText);

    let matches = splitText.filter(s => s.startsWith('\"extensions\":{\"viewType\":'));
    console.log(matches);

    let extracted = matches[0].split('\"extensions\":{\"viewType\":\"');
    extracted = extracted[1].slice(0, -1);
    console.log(extracted);

    trackEvents.push(extracted);
    console.log(trackEvents);
    render();
  }
});