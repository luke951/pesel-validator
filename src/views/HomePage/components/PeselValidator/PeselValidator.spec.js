import { mount } from '@vue/test-utils';
import PeselValidator from './PeselValidator.vue'

describe('Pesel Validation', () => {
  it('checks HTML form elements', () => {
    const wrapper = mount(PeselValidator);

    const button = wrapper.find('button.btn');
    expect(button.attributes('type')).toBe('submit');
    expect(wrapper.html()).toContain('<input class="form-control" id="pesel" type="text" placeholder="Enter PESEL number" maxlength="11">');
    expect(wrapper.html()).toContain('<button class="btn btn-success btn-lg btn-block mt-4" type="submit">Validate PESEL number</button>');
  });

  it('validate invalid format that contains letters', () => {
    const wrapper = mount(PeselValidator);
    const peselInput = wrapper.find('input[type="text"]');
    
    peselInput.setValue('asfdg');
    wrapper.find('form').trigger('submit.prevent');
    
    expect(wrapper.vm.feedback).toBe('Format is invalid, only numbers are allowed and the PESEL number consists of a sequence of 11 digits');
  });

  it('validate invalid too short format', () => {
    const wrapper = mount(PeselValidator);
    const peselInput = wrapper.find('input[type="text"]');
    
    peselInput.setValue('1234567');
    wrapper.find('form').trigger('submit.prevent');
    
    expect(wrapper.vm.feedback).toBe('Format is invalid, only numbers are allowed and the PESEL number consists of a sequence of 11 digits');
  });

  it('validate invalid too long format', () => {
    const wrapper = mount(PeselValidator);
    const peselInput = wrapper.find('input[type="text"]');
    
    peselInput.setValue('999977777677564646676587876');
    wrapper.find('form').trigger('submit.prevent');
    
    expect(wrapper.vm.feedback).toBe('Format is invalid, only numbers are allowed and the PESEL number consists of a sequence of 11 digits');
  });

  it('validate incorrect checksum', () => {
    const wrapper = mount(PeselValidator);
    const peselInput = wrapper.find('input[type="text"]');
    
    peselInput.setValue('95040602474');
    wrapper.find('form').trigger('submit.prevent');
    
    expect(wrapper.vm.feedback).toContain('Incorrect checksum, given PESEL number is invalid');
  });

  it('validate correct PESEL number', () => {
    const wrapper = mount(PeselValidator);
    const peselInput = wrapper.find('input[type="text"]');
    
    peselInput.setValue('95040602479');
    wrapper.find('form').trigger('submit.prevent');
    
    expect(wrapper.vm.feedback).toBe('PESEL number is valid');
  });
});
