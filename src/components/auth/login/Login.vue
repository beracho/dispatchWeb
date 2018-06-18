<template>
  <div class="login">
    <h2>{{'auth.welcome' | translate}}</h2>
    <form ref="form" name="login">
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" required="required" v-model="form.username"/>
          <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required" v-model="form.password"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" v-on:click="submit">
          {{'auth.login' | translate}}
        </button>
        <router-link class='link' :to="{name: 'Signup'}">{{'auth.createAccount' | translate}}</router-link>
      </div>
    </form>
    <!-- <div class="col-md-6 justify-content-center align-items-center d-none d-md-flex">
      <div class="toasted-container sample-toasted-container" v-if="isToastContentPresent">
        <div class="toasted vuestic-toast none default">
          <i class="fa" :class="toastIcon" v-if="toastIcon"></i>{{toastText}}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import Auth from '../auth'
  export default {
    mixins: [ Auth ],
    name: 'login',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        toastText: '',
        toastDuration: 2500,
        toastIcon: 'fa-star-o',
        toastPosition: 'top-right',
        isToastFullWidth: false
      }
    },
    computed: {
      isToastContentPresent () {
        return !!(this.toastText || this.toastIcon)
      }
    },
    methods: {
      submit: function () {
        let message = ''
        if (this.form.username === '' || this.form.password === '') {
          message = 'Llene todos los campos'
        } else {
          let logResult = this.login(this.form)
          // message = logResult.message
          message = 'Datos incorrectos'
          console.log(JSON.stringify(logResult))
          // parseString(xmlHttp.response, function (err, result) {
          //     if (err) {
          //       console.log(err)
          //       responseAuth.message = 'Fallo del sistema'
          //     }
          //     if (result['soap:Envelope']['soap:Body'][0].LoginResponse[0].LoginResult[0] === 'true') {
          //       // loguea
          //       responseAuth.message = 'Autenticación exitosa'
          //       responseAuth.successfull = true
          //       // this.$storage.setUser(data.username)
          //       this.$router.push('Dashboard')
          //     } else {
          //       console.log('+++++++++++++')
          //       // error
          //       console.log(result['soap:Envelope']['soap:Body'][0].LoginResponse[0].strMessage[0])
          //       responseAuth.message = result['soap:Envelope']['soap:Body'][0].LoginResponse[0].strMessage[0]
          //     }
          //     console.dir(result)
          //   })
        }
        console.log(message)
        this.showToast(message, {
          icon: this.toastIcon,
          position: 'top-left',
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth
        })

        // var xmlHttp = new XMLHttpRequest()
        // xmlHttp.open('POST', 'http://www.holidaywebservice.com/HolidayService_v2/HolidayService2.asmx?wsdl', true)
        // var soapRequest =
        //   '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hs="http://www.holidaywebservice.com/HolidayService_v2/">' +
        //   '<soapenv:Body>' +
        //   '<hs:GetHolidaysAvailable>' +
        //   '<hs:countryCode>UnitedStates</hs:countryCode>' +
        //   '</hs:GetHolidaysAvailable>' +
        //   '</soapenv:Body>' +
        //   '</soapenv:Envelope>'
        // // xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx', true)
        // // var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
        // //   '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        // //   '<soap:Body>' +
        // //   '<Login xmlns="http://tempuri.org/">' +
        // //   '<user>string</user>' +
        // //   '<pass>string</pass>' +
        // //   '</Login>' +
        // //   '</soap:Body>' +
        // //   '</soap:Envelope>'
        // xmlHttp.onreadystatechange = function () {
        //   if (xmlHttp.readyState === 4) {
        //     if (xmlHttp.status === 200) {
        //       alert('done. use firebug/console to see network response')
        //     }
        //   }
        // }
        // xmlHttp.setRequestHeader('Content-Type', 'text/xml')
        // // xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
        // xmlHttp.send(soapRequest)


          // .then(callSoapComplete)
          // .catch(function (message) {
          //   return message
          // })


        // var url = 'http://10.1.70.145/wsDispatch/Service1.asmx'
        // var soapXml = '<?xml version="1.0" encoding="utf-8"?>' +
        //   '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        //   '<soap:Body>' +
        //   '<Login xmlns="http://tempuri.org/">' +
        //   '<user>string</user>' +
        //   '<pass>string</pass>' +
        //   '</Login>' +
        //   '</soap:Body>' +
        //   '</soap:Envelope>'

        // return $http({
        //   url: url,
        //   method: 'POST',
        //   data: soapXml,
        //   headers: {
        //     'Content-Type': 'text/xml; charset=utf-8',
        //     'Access-Control-Allow-Origin': '*'
        //   }
        // })
        //   .then(callSoapComplete)
        //   .catch(function (message) {
        //     return message
        //   })

        // function callSoapComplete (data, status, headers, config) {
        //   // Convert to JSON Ojbect from xml
        //   // var x2js = new X2JS()
        //   var x2js = require('x2js')
        //   var str2json = x2js.xml_str2json(data.data)
        //   console.log(JSON.stringify(str2json))
        //   return str2json
        //   // return data.data
        // }
      },
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '~bootstrap/scss/mixins/breakpoints';
  @import "~bootstrap/scss/functions";
  @import '~bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
