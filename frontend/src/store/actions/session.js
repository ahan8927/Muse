//Store Action Types
export const SET_USER = 'Muse/session/SET_USER';
export const REMOVE_USER = 'Muse/session/REMOVE_USER';

//Store Actions
const setUser = (user) => {
  console.log(user)
  return { type: SET_USER, payload: user }
}
const removeUser = (user) => ({ type: REMOVE_USER });

//Login Thunk
export const loginUser = (user) => async (dispatch) => {
  const { email, password } = user;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data));
      window.location.replace("/dashboard")
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export const signupUser = (user) => async (dispatch) => {
  const { firstname, lastname, gender, email, height, weight, password } = user;
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        gender,
        email,
        height,
        weight,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data))
      window.location.replace("/dashboard");
      return data;
    }
  } catch (e) {
    console.error(e)
  }
};

export const restoreUser = () => async dispatch => {
  try {
    const res = await fetch('/api/auth/restore', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
      return data
    }
  }
  catch (e) {
    console.error(e)
  }
};

export const logoutUser = () => async dispatch => {
  try {
    const res = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(dispatch(removeUser()))

    return res
  } catch (e) {
    console.error(e)
  }
}
