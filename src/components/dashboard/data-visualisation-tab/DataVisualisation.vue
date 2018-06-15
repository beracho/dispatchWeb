<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'incidentReport.incidentReportForm' | translate">
          <form>
            <div class="row">
              <div class="col-md-4">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <vuestic-date-picker
                        id="date-picker-time"
                        :config="{enableTime: true}"
                        v-model="incidentForm.notificationDate"
                        disabled
                      />
                      <label class="control-label" for="date-picker-time">
                        {{ $t('forms.inputs.notificationDate') }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="simple-input" v-model="incidentForm.client" required/>
                      <label class="control-label" for="simple-input">{{'forms.inputs.client'
                        | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-right" :class="{'has-error': errors.has('successfulEmail'), 'valid': isSuccessfulEmailValid}">
                    <div class="input-group">
                      <input id="successfulEmail" name="successfulEmail" v-model="incidentForm.reportingClient" v-validate="'required|email'" required/>
                      <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                      <i class="fa fa-check valid-icon icon-right input-icon"></i>
                      <label class="control-label" for="successfulEmail">{{'forms.inputs.reportingClient' | translate}} </label>
                      <i class="bar"></i>
                      <small v-show="errors.has('successfulEmail')" class="help text-danger">
                        {{ errors.first('successfulEmail') }}
                      </small>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-md-4">
                <fieldset>
                  <div class="form-group with-icon-right" :class="{'has-error': errors.has('successfulEmail'), 'valid': isSuccessfulEmailValid}">
                    <div class="input-group">
                      <input id="successfulEmail" name="successfulEmail" v-model="incidentForm.contactEmail" v-validate="'required|email'" required/>
                      <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                      <i class="fa fa-check valid-icon icon-right input-icon"></i>
                      <label class="control-label" for="successfulEmail">{{'forms.inputs.contactEmail' | translate}} </label>
                      <i class="bar"></i>
                      <small v-show="errors.has('successfulEmail')" class="help text-danger">
                        {{ errors.first('successfulEmail') }}
                      </small>
                    </div>
                  </div>
                  <vuestic-simple-select
                    :label="'forms.inputs.city' | translate"
                    v-model="incidentForm.city"
                    option-key="description"
                    v-bind:options="selectLocations">
                  </vuestic-simple-select>
                </fieldset>
              </div>

              <div class="col-md-4">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <vuestic-date-picker
                        id="date-picker-time"
                        :config="{enableTime: true}"
                        v-model="incidentForm.incidentDateTime"
                      />
                      <label class="control-label" for="date-picker-time">
                        {{ $t('forms.inputs.incidentDateTime') }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <vuestic-simple-select
                    :label="'forms.inputs.category' | translate"
                    v-model="incidentForm.category"
                    option-key="description"
                    v-bind:options="selectCategories">
                  </vuestic-simple-select>
                </fieldset>
              </div>

              <div class="col-md-6">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <textarea type="text" id="simple-textarea"
                                required></textarea>
                      <label class="control-label" for="simple-textarea">{{'forms.inputs.problemDescription'
                        | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <textarea type="text" id="simple-textarea"
                                required></textarea>
                      <label class="control-label" for="simple-textarea">{{'forms.inputs.fileSent'
                        | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-sm-6 d-flex justify-content-center" :class="{'col-lg-6 col-xl-6' : sidebarOpened, 'col-lg-6' : !sidebarOpened }">
                <button class="btn btn-secondary">
                  {{'buttons.clearData' | translate}}
                </button>
              </div>
              <div class="col-sm-6 d-flex justify-content-center" :class="{'col-lg-6 col-xl-6' : sidebarOpened, 'col-lg-6' : !sidebarOpened }">
                <button class="btn btn-primary" v-on:click="sendForm">
                  {{'buttons.createIncident' | translate}}
                </button>
              </div>
            </div>

          </form>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from 'components/tables/BadgeColumn.vue'
  import TableData from './TableData'
  import DonutChartData from './DonutChartData'
  import FieldsDef from './fields-definition'
  import {mapGetters} from 'vuex'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'data-visualisation-tab',
    computed: {
      // datePickerDisabled: () => [date => !(date.getDate() % 5)],
      isSuccessfulEmailValid () {
        let isValid = false
        if (this.formFields.successfulEmail) {
          isValid = this.formFields.successfulEmail.validated && this.formFields.successfulEmail.valid
        }
        return isValid
      },
      ...mapGetters([
        'sidebarOpened'
      ])
    },
    data () {
      return {
        selectCategories: [],
        selectLocations: [],
        incidentForm: {
          notificationDate: '',
          client: '',
          reportingClient: '',
          contactEmail: '',
          city: '',
          ubication: '',
          incidentDateTime: '',
          category: ''
        },
        donutChartData: DonutChartData,
        apiMode: false,
        sortFunctions: FieldsDef.sortFunctions,
        tableData: TableData,
        onEachSide: 1,
        tableFields: FieldsDef.tableFields,
        dataModeFilterableFields: ['name'],
        itemsPerPage: [
          {
            value: 5
          },
          {
            value: 6
          }
        ]
      }
    },
    methods: {
      sendForm: function () {
        // console.log(this.incidentForm.incidentDateTime)
      },
      getCategories () {
        this.selectCategories = [
          {id: '27', description: 'DIFERENCIA DE ARQUEO'},
          {id: '28', description: 'PROBLEMA WEB SERVICE'},
          {id: '29', description: 'PROBLEMA DE COMUNICACION'},
          {id: '30', description: 'OUT OF SERVICE'},
          {id: '31', description: 'REVISION DE TRANSACCION'},
          {id: '32', description: 'PROBLEMA SOPORTE TECNICO'}
        ]
        // var soap = require('strong-soap').soap
        // // wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
        // var url = 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl'

        // var requestArgs = {
        //   symbol: 'IBM'
        // }

        // var options = {}
        // soap.createClient(url, options, function(err, client) {
        //   var method = client['StockQuote']['StockQuoteSoap']['GetQuote']
        //   method(requestArgs, function(err, result, envelope, soapHeader) {
        //     //response envelope
        //     console.log('Response Envelope: \n' + envelope)
        //     //'result' is the response body
        //     console.log('Result: \n' + JSON.stringify(result))
        //   })
        // })

//         function soapRequest(url, payload) {
//           let xmlhttp = new XMLHttpRequest()
//           xmlhttp.open('POST', url, true)

//           // build SOAP request
//           xmlhttp.onreadystatechange = function() {
//             if (xmlhttp.readyState == 4) {
//               if (xmlhttp.status == 200) {
//                 parseXml(xmlhttp.responseText)
//               }
//             }
//           }

//           // Send the POST request
//           xmlhttp.setRequestHeader('Content-Type', 'text/xml')
//           xmlhttp.send(payload)
//         }

//         soapRequest('http://10.1.70.145/wsDispatch/Service1.asmx?wsdl',
//           `<?xml version="1.0" encoding="utf-8"?>
// <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
//   <soap:Body>
//     <Categoria xmlns="http://tempuri.org/" />
//   </soap:Body>
// </soap:Envelope>`)

        // var soap = require('soap')
        // var url = 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl'
        // var args = { name: 'value' }
        // soap.createClient(url, function(err, client) {
        //   client.MyFunction(args, function(err, result) {
        //     console.log('----------------')
        //     console.log(result)
        //   })
        // })


        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl', true)
        var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
          '<Categoria xmlns="http://tempuri.org/" />' +
          '</soap:Body>' +
          '</soap:Envelope>'
        // xmlHttp.onreadystatechange = this.categoriesResponse(xmlHttp)
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            // responseAuth = require('xml2js').parseString
            HandleResponse(xmlHttp.responseText)
            // var parseString = require('xml2js').parseString
            // parseString(xmlHttp.response, function (err, result) {
            //   if (err) {
            //     console.log(err)
            //   }
            //   let datos = result['soap:Envelope']['soap:Body'][0].CategoriaResponse[0].CategoriaResult[0]['diffgr:diffgram'][0].NewDataSet[0].VISTA
            //   console.log('+++++++++++')
            //   console.log(datos)
            //   datos.forEach(function (element) {
            //     let tempCategorie = {
            //       id: element.COD_CATEGORIA,
            //       nombre: element.DESCRIPCION
            //     }
            //     this.selectCategories.push(tempCategorie)
            //   }, this)
            //   console.log('-----------')
            //   console.dir(result)
            // })
          }
        }
        xmlHttp.setRequestHeader('Content-Type', 'text/xml')
        xmlHttp.send(soapRequest)
        function HandleResponse (response) {
          // document.getElementById('SavedFile').innerHTML = response;
          console.log(response)
        }
      },
      categoriesResponse (xmlData) {
        if (xmlData.readyState === 4) {
          if (xmlData.status === 200) {
            // responseAuth = require('xml2js').parseString

            var parseString = require('xml2js').parseString
            parseString(xmlData.response, function (err, result) {
              if (err) {
                console.log(err)
              }
              console.log('entra------')
              console.log(this.selectCategories)
              let datos = result['soap:Envelope']['soap:Body'][0].CategoriaResponse[0].CategoriaResult[0]['diffgr:diffgram'][0].NewDataSet[0].VISTA
              console.log('+++++++++++')
              console.log(datos)
              datos.forEach(function (element) {
                let tempCategorie = {
                  id: element.COD_CATEGORIA,
                  nombre: element.DESCRIPCION
                }
                this.selectCategories.push(tempCategorie)
              }, this)
              console.log('-----------')
              console.log(this.selectCategories)
              console.dir(result)
            })
          }
        }
      },
      getLocations () {
        this.selectLocations = [
          {id: 'CBBA', description: 'Cochabamba'},
          {id: 'LPZ', description: 'La Paz'},
          {id: 'PND', description: 'Pando'},
          {id: 'SCR', description: 'Sucre'},
          {id: 'SCZ', description: 'Santa Cruz'}
        ]
      }
    },
    created () {
      this.getCategories()
      this.getLocations()
      let currentdate = new Date()
      this.incidentForm.notificationDate = '' + currentdate.getFullYear() + '-' +
      ((currentdate.getMonth() + 1) > 9 ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1)) + '-' +
      ((currentdate.getDate()) > 9 ? (currentdate.getDate()) : '0' + (currentdate.getDate())) + ' ' +
      ((currentdate.getHours()) > 9 ? (currentdate.getHours()) : '0' + (currentdate.getHours())) + ':' +
      ((currentdate.getMinutes()) > 9 ? (currentdate.getMinutes()) : '0' + (currentdate.getMinutes()))
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";

  .chart-container {
    padding: 0 2rem;
    height: 24rem;
  }


</style>
