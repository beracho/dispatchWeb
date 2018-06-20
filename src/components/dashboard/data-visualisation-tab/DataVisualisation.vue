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
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <vuestic-date-picker
                        id="date-picker-time"
                        :config="{enableTime: true, disable: datePickerDisabled}"
                        v-model="incidentForm.incidentDateTime"
                      />
                      <label class="control-label" for="date-picker-time">
                        {{ $t('forms.inputs.incidentDateTime') }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="simple-input" v-model="incidentForm.client" required/>
                      <label class="control-label" for="simple-input">{{'forms.inputs.client'
                        | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                  <vuestic-simple-select
                    id="cityOptions"
                    :label="'forms.inputs.city' | translate"
                    v-model="incidentForm.city"
                    option-key="description"
                    v-bind:options="selectLocations">
                  </vuestic-simple-select>
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                  <vuestic-simple-select
                    :label="'forms.inputs.category' | translate"
                    v-model="incidentForm.category"
                    option-key="description"
                    v-bind:options="selectCategories">
                  </vuestic-simple-select>
                </fieldset>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="reportClient" v-model="incidentForm.reportingClient" required/>
                      <label class="control-label" for="reportClient">{{'forms.inputs.reportingClient' | translate}} </label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="telephone-input" v-model="incidentForm.telephone" required/>
                      <label class="control-label" for="telephone-input">{{'forms.inputs.telephoneNumber'
                        | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                </fieldset>
              </div>
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <textarea
                        v-model="incidentForm.problemDetail"
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
                <button class="btn btn-secondary" v-on:click="clearForm">
                  {{'buttons.clearData' | translate}}
                </button>
              </div>
              <div class="col-sm-6 d-flex justify-content-center" :class="{'col-lg-6 col-xl-6' : sidebarOpened, 'col-lg-6' : !sidebarOpened }">
                <button class="btn btn-primary" @click="sendForm()">
                  {{'buttons.createIncident' | translate}}
                </button>
              </div>
            </div>

          </form>
        </vuestic-widget>
      </div>
    </div>
    <vuestic-modal :show.sync="show" ref="mediumModal" :okText="'modal.confirm' | translate"
                   :cancelText="'modal.cancel' | translate">
      <div slot="title">{{'dashboard.reportCreated' | translate}}</div>
      <div>
        {{'dashboard.modalText' | translate}} {{incidentResponse}}
      </div>
    </vuestic-modal>
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
      datePickerDisabled: () => [date => !(date < (new Date()))],
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
          category: '',
          problemDetail: '',
          telephone: ''
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
        ],
        incidentResponse: '',
        show: true
      }
    },
    methods: {
      clearForm () {
        this.incidentForm = {
          client: '',
          reportingClient: '',
          contactEmail: '',
          city: '',
          ubication: '',
          incidentDateTime: '',
          category: '',
          problemDetail: '',
          telephone: ''
        }
        let currentdate = new Date()
        this.incidentForm.notificationDate = '' + currentdate.getFullYear() + '-' +
        ((currentdate.getMonth() + 1) > 9 ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1)) + '-' +
        ((currentdate.getDate()) > 9 ? (currentdate.getDate()) : '0' + (currentdate.getDate())) + ' ' +
        ((currentdate.getHours()) > 9 ? (currentdate.getHours()) : '0' + (currentdate.getHours())) + ':' +
        ((currentdate.getMinutes()) > 9 ? (currentdate.getMinutes()) : '0' + (currentdate.getMinutes()))
      },
      sendForm () {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl', true)
        var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
          '<Insertar_Caso xmlns="http://tempuri.org/">' +
          '<sucursal>' + this.incidentForm.city.id + '</sucursal>' +
          '<fechareg>' + this.incidentForm.notificationDate + '</fechareg>' +
          '<descripcion>' + this.incidentForm.problemDetail + '</descripcion>' +
          '<contacto>' + this.incidentForm.reportingClient + '</contacto>' +
          '<correo>' + this.incidentForm.contactEmail + '</correo>' +
          '<ubicacion>' + this.incidentForm.city.description + '</ubicacion>' +
          '<criticidad>' + this.incidentForm.category.id + '</criticidad>' +
          '</Insertar_Caso>' +
          '</soap:Body>' +
          '</soap:Envelope>'
        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var parseString = require('xml2js').parseString
            parseString(xmlHttp.response, (err, result) => {
              if (err) {
                console.log(err)
              }
              let datos = result['soap:Envelope']['soap:Body'][0].Insertar_CasoResponse[0]
              if (datos.Insertar_CasoResult[0] !== '-1') {
                // Muestra número de caso
                this.incidentResponse = datos.Insertar_CasoResult[0]
                this.$refs.mediumModal.open()
              } else {
                // Error
                this.showToast('Error al registrar datos', {
                  icon: 'fa-star-o',
                  position: 'top-left',
                  duration: 2500,
                  fullWidth: this.isToastFullWidth
                })
              }
            })
          }
        }
        xmlHttp.setRequestHeader('Content-Type', 'text/xml')
        xmlHttp.send(soapRequest)
      },
      getCategories () {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl', true)
        var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
          '<Categoria xmlns="http://tempuri.org/" />' +
          '</soap:Body>' +
          '</soap:Envelope>'
        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var parseString = require('xml2js').parseString
            parseString(xmlHttp.response, (err, result) => {
              if (err) {
                console.log(err)
              }
              let datos = result['soap:Envelope']['soap:Body'][0].CategoriaResponse[0].CategoriaResult[0]['diffgr:diffgram'][0].NewDataSet[0].VISTA
              datos.forEach(function (element) {
                let tempCategorie = {
                  id: element.COD_CATEGORIA[0],
                  description: element.DESCRIPCION[0]
                }
                this.selectCategories.push(tempCategorie)
              }, this)
            })
          }
        }
        xmlHttp.setRequestHeader('Content-Type', 'text/xml')
        xmlHttp.send(soapRequest)
      },
      getLocations () {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl', true)
        var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          '<soap:Body>' +
          '<Sucursales xmlns="http://tempuri.org/" />' +
          '</soap:Body>' +
          '</soap:Envelope>'
        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var parseString = require('xml2js').parseString
            parseString(xmlHttp.response, (err, result) => {
              if (err) {
                console.log(err)
              }
              let datos = result['soap:Envelope']['soap:Body'][0].SucursalesResponse[0].SucursalesResult[0]['diffgr:diffgram'][0].NewDataSet[0].VISTA
              datos.forEach(function (element) {
                let tempLocation = {
                  id: element.COD_SUCURSAL[0],
                  description: element.CIUDAD[0]
                }
                this.selectLocations.push(tempLocation)
              }, this)
            })
          }
        }
        xmlHttp.setRequestHeader('Content-Type', 'text/xml')
        xmlHttp.send(soapRequest)
      }
    },
    created () {
      // Redirect
      if (this.$storage.get('session') === null) {
        this.$router.push('auth/login')
      }

      this.incidentForm.client = this.$storage.getClient()
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
