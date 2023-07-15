let id = "";

const form = document.getElementById('myForm');
document.getElementById('myForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const obj = {
    name,
    email
  };
  if (id === '') {
    try {
      await axios.post('http://localhost:3000', obj);
      await displayData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await axios.put(`http://localhost:3000/${id}`, obj);
      await displayData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
    id = '';
  }
});

async function displayData() {
  try {
    const response = await axios.get('http://localhost:3000');
    const uList = document.getElementById('uList');
    uList.innerHTML = '';
    const data = response.data;
    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${data[i].name}, Email: ${data[i].email}`;
        uList.appendChild(listItem);

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
          editData(data[i].id);
        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
          deleteData(data[i].id);
        });
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteData(id) {
    console.log(id)
  try {
    await axios.delete(`http://localhost:3000/${id}`);
    await displayData();
  } catch (error) {
    console.error(error);
  }
}

async function editData(editId) {
  try {
    const response = await axios.get('http://localhost:3000');
    const data = response.data;
    if (data !== null) {
      const user = data.find((item) => item.id === editId);
      if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        id = user.id; // Assign the global id variable the updated value
      }
    }
  } catch (error) {
    console.error(error);
  }
}

displayData();
