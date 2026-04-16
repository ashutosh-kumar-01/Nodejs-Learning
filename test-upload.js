const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

async function upload() {
  const form = new FormData();
  fs.writeFileSync('dummy.jpg', 'fake image content');
  form.append('imageFile', fs.createReadStream('dummy.jpg'));
  form.append('name', 'Test');
  form.append('tags', 'test');
  form.append('email', 'test@test.com');

  try {
    const res = await axios.post('http://localhost:4000/api/v1/imageUpload', form, {
      headers: form.getHeaders(),
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}
upload();
