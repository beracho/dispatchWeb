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
                    v-bind:options="cityOptions">
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
                    v-bind:options="categoryOptions">
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
        ],
        categoryOptions: [],
        cityOptions: []
      }
    },
    methods: {
      sendForm: function () {
        // console.log(this.incidentForm.incidentDateTime)
      }
    },
    created () {
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
