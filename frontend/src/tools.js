// Makes an api request, and returns the received data as a JSON object
export async function api(httpMethod, url, bodyContent) {
  let server = 'http://localhost:3000';
  let apiUrl = server + url;
  let options = {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  }
  if (bodyContent) {
    options.body = JSON.stringify(bodyContent);
  }
  console.log('Making request ' + httpMethod + ' @ ' + apiUrl + ' (body: ' + options.body + ')');
  try {
    var response = await fetch(apiUrl, options);
    var responseJson = await response.json(); 
  } catch(e) {
      console.error('Error:' + e);
  }
  // console.log('Response received: ' + responseJson);
  return responseJson;
}

// Returns a randomly chosen greeting as a string
export function getRandomGreeting() {
  const greetings = [
    "What's up",
    "What are we training",
    "How are you",
    "Are you ready",
    "What's cracking",
    "Ready for some reps",
    "On fire today",
    "Warmed up"
  ]
  return greetings[Math.floor(Math.random() * greetings.length)];
}