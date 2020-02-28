export default function (response) {
  if (!response.ok) {
    return response.json().then(error => {
      console.error('API ERROR: ', error);
      throw new Error(error.message);
    });
  }
  return response.json();
};
