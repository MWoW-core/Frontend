import Vue from 'vue'
import { format } from 'date-fns'

Vue.prototype.toHumanDateTime = (date) =>
  format(date instanceof Date ? date : new Date(date), 'iiii, MMM dd, y HH:mm')

Vue.prototype.toHumanDate = (date) =>
  format(date instanceof Date ? date : new Date(date), 'iiii, MMM dd, y')
