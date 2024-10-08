<template>
  <div class="container mt-5">
    <h4 class="text-center mb-4"><strong>PESEL Validator</strong></h4>
    <form @submit.prevent="validatePesel">
      <div class="mb-3 form-box">
        <label for="pesel" class="form-label">PESEL number</label>
        <input class="form-control" id="pesel" type="text" v-model="pesel" placeholder="Enter PESEL number" maxlength="11">
      </div>
      <div v-if="feedback">
        <p class="feedback mb-2" :class="{ valid: isPeselValid }">{{ feedback }}</p>
      </div>
      <button class="btn btn-success btn-lg btn-block mt-4" type="submit">Validate PESEL number</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const pesel = ref('');
    const feedback = ref('');
    const isPeselValid = ref(false);

    const validatePesel = () => {
      if (!isValidPeselFormat(pesel.value)) {
        feedback.value = 'Format is invalid, only numbers are allowed and the PESEL number consists of a sequence of 11 digits';
        isPeselValid.value = false;
        return;
      }

      if (!isValidPeselChecksum(pesel.value)) {
        feedback.value = 'Incorrect checksum, given PESEL number is invalid';
        isPeselValid.value = false;
        return;
      }

      feedback.value = 'PESEL number is valid';
      isPeselValid.value = true;
    };

    const isValidPeselFormat = (pesel) => {
      return /^[0-9]{11}$/.test(pesel);
    };

    const isValidPeselChecksum = (pesel) => {
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      let sum = 0;
      
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(pesel[i], 10) * weights[i];
      }

      const checksum = (10 - (sum % 10)) % 10;
      return checksum === parseInt(pesel[10], 10);
    };

    return {
      pesel,
      feedback,
      isPeselValid,
      validatePesel,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "./PeselValidator.scss";
</style>
