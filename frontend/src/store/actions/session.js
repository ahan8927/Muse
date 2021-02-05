//Store Action Types
export const SET_USER = 'Muse/session/SET_USER';
export const REMOVE_USER = 'Muse/session/REMOVE_USER';
export const SET_BEATS = 'Muse/session/SET_BEATS';
export const REMOVE_BEATS = 'Muse/session/REMOVE_BEAT';

//Store Actions
const setUser = (user) => ({ type: SET_USER, payload: user })
const removeUser = (user) => ({ type: REMOVE_USER });

const setBeats = (beats) => ({ type: SET_BEATS, payload: beats.beats })
const removeBeat = (beats) => ({ type: REMOVE_BEATS });

//Login Thunk
export const loginUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credential,
        password
      })
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user));
      dispatch(setBeats(data.beats))
      window.location.replace("/dashboard")
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export const signupUser = (user) => async (dispatch) => {
  const { username, email, password } = user;
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json()
      dispatch(setUser(data.user))
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
      dispatch(setUser(data.beats))
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
    })
    dispatch(removeUser())
    await dispatch(removeBeat())

    return res
  } catch (e) {
    console.error(e)
  }
}
