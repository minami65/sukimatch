const baseURL = 'http://localhost:5173/api';

const loginUser = async (formData) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};

const createUser = async (formData) => {
  const response = await fetch('/api/auth/logon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Couldn't create user");
  }

  return response.json();
};

const updateUser = async (formData, id) => {
  const response = await fetch('/api/auth/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      nickName: formData.nickName,
      email: formData.email,
      password: formData.password,
      age: formData.age,
    }),
  });

  if (!response.ok) {
    throw new Error("Couldn't update user");
  }

  return response.json();
};

const signIn = async ({ email, password }) => {
  try {
    const response = await fetch(baseURL + '/users');
    const data = await response.json();
    const user = data.filter(
      (element) => element.email === email && element.password === password,
    );
    if (user.length === 1) {
      return user[0].id;
    } else {
      throw new Error('Not Found is User');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signOn = async ({ email, password }) => {
  try {
    await fetch(baseURL + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

const update = async ({ id, nickName, email, password, age }) => {
  try {
    await fetch(baseURL + `/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        nickName,
        email,
        password,
        age,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

const getUserInfo = async (id) => {
  const response = await fetch(baseURL + `/users/${id}`);
  const data = await response.json();
  delete data.password;
  return data;
};

const findUserByEmail = async (email) => {
  try {
    const response = await fetch(baseURL + '/users?email=' + email);
    const user = await response.json();

    if (!response.ok || !user[0].email) {
      throw new Error('User not found');
    }

    return user[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  loginUser,
  createUser,
  updateUser,
  signIn,
  signOn,
  update,
  getUserInfo,
  findUserByEmail,
};
