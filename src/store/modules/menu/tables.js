import lazyLoading from './lazyLoading.js'

export default {
  name: 'tables',
  meta: {
    title: 'menu.incidentList',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  },
  path: '/tables',
  component: lazyLoading('tables/IncidentTable')
}
