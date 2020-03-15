import axios from 'axios'

export const register = newUser => {
  return axios
    .post('auth/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      // localStorage.setItem('usertoken', response.data)
      console.log('Registered')
      return response.data      
    })
    .catch(err => {
      console.log(err)
    })
}

export const login = user => {
  return axios
    .post('auth/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
