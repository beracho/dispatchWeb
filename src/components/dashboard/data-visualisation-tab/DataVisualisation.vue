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
                  <div class="form-group">
                    <div class="input-group">
                      <input v-model="incidentForm.contactEmail" required/>
                      <label class="control-label">{{'forms.inputs.contactEmail'
                        | translate}}</label><i class="bar"></i>
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
                      <input v-model="incidentForm.client" required/>
                      <label class="control-label">{{'forms.inputs.client'
                        | translate}}</label><i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                  <v-select v-model="incidentForm.city" label="description" :options="selectLocations" :placeholder="'forms.inputs.city' | translate"></v-select>
                </fieldset>
              </div>
              <div class="col-md-4">
                <v-select v-model="incidentForm.category" label="description" :options="selectCategories" :placeholder="'forms.inputs.category' | translate"></v-select>
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
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
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
    <vuestic-modal :show.sync="show" ref="mediumModal" :okText="'modal.accept' | translate"
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
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'data-visualisation-tab',
    components: {
      vueDropzone: vue2Dropzone
    },
    computed: {
      datePickerDisabled: () => [date => !(date < (new Date()))],
      isSuccessfulEmailValid () {
        let isValid = false
        if (this.incidentForm.contactEmail) {
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
          files: [],
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
        show: true,
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { 'My-Awesome-Header': 'header value' },
          dictDefaultMessage: this.$t('dropzone.loadFilesHere'),
          dictFallbackMessage: this.$t('dropzone.noDragAndDrop'),
          dictFallbackText: this.$t('dropzone.useFormBelow'),
          dictFileTooBig: this.$t('dropzone.fileTooBig'),
          dictInvalidFileType: this.$t('dropzone.fileTipeUnsuported'),
          dictResponseError: this.$t('dropzone.serverAnswer'),
          dictCancelUpload: this.$t('dropzone.cancelUpload'),
          dictCancelUploadConfirmation: this.$t('dropzone.sureCancel'),
          dictRemoveFile: this.$t('dropzone.deleteFile'),
          dictMaxFilesExceeded: this.$t('dropzone.fileLimit'),
        }
      }
    },
    methods: {
      clearForm () {
        this.incidentForm = {
          client: this.$storage.getClient(),
          reportingClient: '',
          contactEmail: '',
          city: '',
          ubication: '',
          incidentDateTime: '',
          category: '',
          problemDetail: '',
          telephone: '',
          files: []
        }
        let currentdate = new Date()
        this.incidentForm.notificationDate = '' + currentdate.getFullYear() + '-' +
        ((currentdate.getMonth() + 1) > 9 ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1)) + '-' +
        ((currentdate.getDate()) > 9 ? (currentdate.getDate()) : '0' + (currentdate.getDate())) + ' ' +
        ((currentdate.getHours()) > 9 ? (currentdate.getHours()) : '0' + (currentdate.getHours())) + ':' +
        ((currentdate.getMinutes()) > 9 ? (currentdate.getMinutes()) : '0' + (currentdate.getMinutes()))
      },
      sendForm () {
        if (this.isFormValid()) {
          var xmlHttp = new XMLHttpRequest()
          xmlHttp.open('POST', 'http://10.1.70.145/wsDispatch/Service1.asmx?wsdl', true)
          var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<soap:Body>' +
            '<Insertar_Caso xmlns="http://tempuri.org/">' +
            '<sucursal>' + this.incidentForm.city.id + '</sucursal>' +
            '<fechareg>' + this.incidentForm.notificationDate + '</fechareg>' +
            '<descripcion>' + this.incidentForm.problemDetail + '</descripcion>' +
            '<contacto>' + this.$storage.getClient() + '</contacto>' +
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
                  this.showToast(this.$t('dashboard.dataRegisterError'), {
                    icon: 'fa-star-o',
                    position: 'top-right',
                    duration: 2500,
                    fullWidth: this.isToastFullWidth
                  })
                }
              })
            }
          }
          xmlHttp.setRequestHeader('Content-Type', 'text/xml')
          xmlHttp.send(soapRequest)
        }
      },
      isFormValid () {
        let validForm = true
        let message = ''
        if (this.incidentForm.files.length === 0) {
          validForm = false
          message = this.$t('dashboard.validation.fileUloaded')
        }
        if (this.incidentForm.category === '') {
          validForm = false
          message = this.$t('dashboard.validation.incidentType')
        }
        if (this.incidentForm.city === '') {
          validForm = false
          message = this.$t('dashboard.validation.cityField')
        }
        if (this.incidentForm.incidentDateTime === '') {
          validForm = false
          message = this.$t('dashboard.validation.incidentDate')
        }
        if (this.incidentForm.problemDetail === '') {
          validForm = false
          message = this.$t('dashboard.validation.issueDetail')
        }
        if (this.incidentForm.reportingClient === '') {
          validForm = false
          message = this.$t('dashboard.validation.reportingClientField')
        }
        if (this.incidentForm.telephone === '') {
          validForm = false
          message = this.$t('dashboard.validation.telephoneNumber')
        }
        if (this.incidentForm.contactEmail === '') {
          validForm = false
          message = this.$t('dashboard.validation.emailField')
        }
        if (!validForm) {
          this.showToast(message, {
            icon: 'fa-star-o',
            position: 'top-right',
            duration: 2500,
            fullWidth: this.isToastFullWidth
          })
        }
        return validForm
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
    },
    watch: {
      'incidentForm.client': function (newValue, oldValue) {
        this.incidentForm.client = this.$storage.getClient()
      },
      'incidentForm.telephone': function (newValue, oldValue) {
        let filteredValue = newValue.match(/\d/g)
        if (filteredValue !== null) {
          filteredValue = filteredValue.join('')
        } else {
          filteredValue = ''
        }
        this.incidentForm.telephone = filteredValue
      }
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
