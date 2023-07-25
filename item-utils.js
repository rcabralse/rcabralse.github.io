import { html } from 'lit';

export function convertItems(picklistoptions: string) {
  const outputArray = picklistoptions.split(", ");
  const htmlOptions = outputArray.map(
    (item) => html`<option value="${item}">${item}</option>`
  );
  return htmlOptions;
}
