import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { TemTemType } from '@maael/temtem-types';
import { createPinia, setActivePinia } from 'pinia';
import TypeIcon from '~/components/type/TypeIcon.vue';
import { withQuasar } from '~/utils/test/helpers/vueTestUtils';
import { testTemtemTypesMap } from '~/utils/test/data/testTemtemTypes';
import type { ComponentProps } from '~/utils/types/typeHelpers';
import { sleep } from '~/utils/sleep';

const props: ComponentProps<typeof TypeIcon> = {
  type: TemTemType.Water,
  height: 123,
  width: 456,
  loading: 'lazy',
};

describe('TypeIcon', () => {
  const subject = () =>
    mount(TypeIcon, { props, ...withQuasar, attachTo: '#__nuxt' });

  beforeEach(() => {
    setActivePinia(createPinia());
    const typeImgMapStore = useTypeImgMapStore();
    typeImgMapStore.map = testTemtemTypesMap;
  });

  it('renders <img> correctly', () => {
    const img = subject().get('img');

    expect(img.attributes()).toMatchObject({
      src: testTemtemTypesMap.Water,
      alt: props.type,
      height: String(props.height),
      width: String(props.width),
      // TODO: loading attribute not working
      // loading: props.loading,
      class: 'type-icon full-width',
    });
  });

  it('Shows correct tooltip text on mouseenter', async () => {
    const wrapper = subject();

    await wrapper.trigger('mouseenter');
    // Quasar tooltip is rendered asychronously
    await sleep(0);

    expect(document.querySelector('.q-tooltip')?.innerHTML).toEqual(props.type);
  });

  it('Prevents contextmenu event on img', () => {
    subject();
    const event = new MouseEvent('contextmenu');
    const img = document.querySelector('img');
    if (!img) {
      throw new Error('img not found');
    }

    img.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });
});
