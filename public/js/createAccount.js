const createAccountHandler = async (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  const allFields = name && email && password;

  if(allFields) {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
      document.location.replace('/login');
    } else {
      alert('Ooops, something went wrong!');
    }
  }
};

document.querySelector('#registration-form').addEventListener('submit', createAccountHandler);
