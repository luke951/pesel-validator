import { mount } from '@vue/test-utils'
import AboutPage from './AboutPage.vue'

describe('AboutPage.vue', () => {
  it('Renders an About Page', () => {
    const wrapper = mount(AboutPage)
    expect(wrapper.text()).toMatch('About page')
  })
});