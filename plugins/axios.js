export default ({ $axios }) => {
  $axios.defaults.withCredentials = true
  $axios.defaults.baseURL = process.env.API_URL
  $axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  $axios.defaults.headers.common.Accept = 'application/json'
}
