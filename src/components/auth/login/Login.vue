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
      submit () {
        if (this.form.username === '' || this.form.password === '') {
          this.showToast('Llene todos los campos', {
            icon: this.toastIcon,
            position: 'top-right',
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth
          })
        } else {
          this.login(this.form)
        }
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
