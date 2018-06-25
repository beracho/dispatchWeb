export default {
  tableFields: [
    {
      name: '__component:badge-column',
      title: '',
      dataClass: 'text-center'
    },
    {
      name: 'description',
      sortField: 'description'
    },
    {
      name: 'email',
      sortField: 'email'
    },
    {
      name: 'address.line2',
      title: 'city'
    },
    {
      name: 'salary',
      title: 'date'
    }
  ],
  sortFunctions: {
    'name': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'email': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
