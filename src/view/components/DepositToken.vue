<template>
    <v-dialog v-model="utils.showModal" width="500">
        <v-card class="pb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">{{ $t('modals.deposit.receive') }} {{ swap.name }}</h5>
                <div @click="closeModal()" class="closeIcon-container">
                    <img alt="close" class="close-icon" src="/images/close.png"/>
                </div>
            </div>
            <div style="background: #e2ebea3d;padding: 30px 0;border-bottom: 1px solid rgba(0, 71, 91, 0.1);">
                <div class="wallet-qrcodeWrapper">
                    <qrcode-vue :value="swap.address" size="150" level="H" />
                </div>
            </div>
            <div class="subheading m-3 mb-0 pb-2 pt-2">{{ $t('modals.deposit.address') }}</div>
            <div class="address-inputContainer mt-0 m-3">
                <input :value="swap.address" class="address-input" disabled>
                <button @click="copy(swap.address)" class="copy-address">
                    <img alt="copy" class="copy-icon" src="/images/copy.png"/>
                </button>
            </div>
            <a class="pl-3" href="https://celo.org/developers/faucet"
               style="color: #1d77d8 !important;font-weight: 500;text-decoration: underline;" target="_blank">
                {{ $t('modals.deposit.fundYourWallet') }} (Celo Faulcet)
            </a>
        </v-card>
    </v-dialog>
</template>


<script>

   import {bus} from '../../main';
   import QrcodeVue from 'qrcode.vue'

   export default {
      name: "ReceiveModal",
      data() {
         return {
            utils: {
               showModal: false
            },
            swap: {
               name: '',
               address: ''
            }
         }
      },
      components: {
         QrcodeVue
      },
      methods: {
         closeModal() {
            this.utils.showModal = false;
         },
         copy(v) {
            this.$copyText(v).then(function (e) {
               alert('Copied');
            }, function (e) {
               alert('Can not copy');
               console.log(e)
            })
         }
      },
      mounted() {
         bus.$on('open_deposit_token', (data) => {
            this.utils.showModal = true;
            this.swap.name = data.name;
            this.swap.address = data.address;
         })
      }
   }
</script>
