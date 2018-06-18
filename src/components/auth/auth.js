'use strict'

export default {
  methods: {
    login (data) {
      let responseAuth = {
        successfull: false,
        message: ''
      }
      var xmlHttp = new XMLHttpRequest()
      xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl', true)
      var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soap:Body>' +
        '<Login xmlns="http://tempuri.org/">' +
        '<user>' + data.username + '</user>' +
        '<pass>' + data.password + '</pass>' +
        '</Login>' +
        '</soap:Body>' +
        '</soap:Envelope>'
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          var parseString = require('xml2js').parseString
          parseString(xmlHttp.response, (err, result) => {
            if (err) {
              console.log(err)
            }
            let datos = result['soap:Envelope']['soap:Body'][0].LoginResponse[0]
            if (datos.LoginResult === 'true') {
              // loguea
              responseAuth.message = 'Autenticación exitosa'
              responseAuth.successfull = true
              this.$storage.setUser(data.username[0])
              this.$router.push('Dashboard')
            } else {
              // error
              responseAuth.message = result['soap:Envelope']['soap:Body'][0].LoginResponse[0].strMessage[0]
            }
          })
        }
      }
      xmlHttp.setRequestHeader('Content-Type', 'text/xml')
      xmlHttp.send(soapRequest)
      // .then(response => {
      //   console.log('11111111111111')
      //   console.log(response)
      // })
      return responseAuth
    },

    logout (store, router) {
      store = store || this.$store
      router = router || this.$router

      if (store.state.sessionInterval) {
        window.clearInterval(store.state.sessionInterval)
        store.state.sessionInterval = null
      }

      this.$storage.removeUser()
      this.$storage.remove('menu')
      this.$storage.remove('token')
      this.$storage.remove('sidenav')
      this.$storage.remove('actualPage')

      store.commit('setDefault')
      let route = this.$router.currentRoute.path
      let redirect = 'login'
      if (['/loginAdmin', '/confirmarCuenta'].indexOf(route) !== -1) {
        if (this.$router.currentRoute.query !== {}) {
          redirect = this.$router.currentRoute.fullPath
        } else {
          redirect = route.substring(1)
        }
      }
      router.push(redirect)
    },

    timerSession () {
      // Definiendo el tiempo en el que dura una sesión sin actividad
      this.$store.commit('SET_TIME', process.env.TIME_SESSION_EXPIRED * 60)
      this.$store.state.sessionInterval = window.setInterval(() => {
        this.$store.commit('TIME_DECREASE')
        if (this.$store.state.time <= 0) {
          this.$message.warning('Su sesión ha sido cerrada automáticamente después de ' + process.env.TIME_SESSION_EXPIRED + ' minutos de inactividad.', '¡Sesión cerrada!', { timeout: 30000 })
          this.logout()
        }
      }, 1000)
    }
  }
}
