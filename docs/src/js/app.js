import Spider from '../../../src/js/spider';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const spider = new Spider('.spider-container');

    const spider2 = new Spider('#using-id-selector');
  },
  false
);
