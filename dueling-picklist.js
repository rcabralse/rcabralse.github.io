import { css, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PluginContract } from "@nintex/form-plugin-contract";
import { convertItems } from "./item-utils";

@customElement("dueling-picklist")
export class DuelingPicklist extends LitElement {
  @property() picklistoptions: string = "Red,Blue,Yellow";

  get selectedItems() {
    return this.getRightListValues();
  }

  static styles = css`
    /* Add some basic styling for better appearance */
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
    }

    .list {
      width: 150px;
      height: 200px;
      margin: 10px;
    }

    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 15px;
    }

    #moveRightBtn {
      margin-bottom: 10px;
    }
  `;

  static getMetaConfig(): PluginContract {
    // plugin contract information
    return {
      controlName: "Dueling Picklist",
      description: "Dueling Picklist Control",
      groupName: "Presales Controls",
      fallbackDisableSubmit: false,
      standardProperties: {
        readOnly: false,
        required: false,
        description: true,
        fieldLabel: true,
      },
      version: "1",
      properties: {
        picklistoptions: {
          type: "string",
          title: "Options",
          defaultValue: "Blue,Red,Yellow",
        },
      },
    };
  }

  moveItem(fromList: HTMLSelectElement, toList: HTMLSelectElement) {
    const selectedOptions = Array.from(fromList.selectedOptions);
    selectedOptions.forEach((option) => {
      toList.appendChild(option);
    });
  }

  render() {
    const leftOptionsHtml = convertItems(this.picklistoptions);

    return html`
      <div class="container">
        <select id="leftList" class="list" multiple>
        ${leftOptionsHtml}
        </select>

        <div class="btn-container">
          <button
            id="moveRightBtn"
            @click=${() =>
              this.moveItem(
                this.shadowRoot?.getElementById("leftList") as HTMLSelectElement,
                this.shadowRoot?.getElementById("rightList") as HTMLSelectElement
              )}
          >
            Move >>
          </button>
          <button
            id="moveLeftBtn"
            @click=${() =>
              this.moveItem(
                this.shadowRoot?.getElementById("rightList") as HTMLSelectElement,
                this.shadowRoot?.getElementById("leftList") as HTMLSelectElement
              )}
          >
            << Move
          </button>
        </div>

        <select id="rightList" class="list" multiple>
          <!-- Right list will be initially empty -->
        </select>
      </div>
    `;
  }

  getRightListValues() {
    const rightList = this.shadowRoot?.getElementById('rightList') as HTMLSelectElement | null;
    if (!rightList) {
      return ''; // Handle the case when rightList is null
    }
    const selectedValues = Array.from(rightList.selectedOptions).map((option) => option.value);
    const commaDelimitedList = selectedValues.join(', ');
    return commaDelimitedList;
  }

}
