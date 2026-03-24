import { $ } from '@wdio/globals'
import Sidemenu from "./component/sidemenu.page";

class DragPage extends Sidemenu {
    get dragItem() {
        return $('[draggable="true"]');
    }
    get dropItem() {
        return $('.max-w-96');
    }
    get successMsg() {
        return $('.max-w-96 h3');
    }
    open() {
        return super.open();
    }
    /* Commenting since Firefox has issues with HTML5 draggable=true, works for chroma and edge
    async dragAndDrop() {
        await this.dragItem.waitForExist();
        await this.dragItem.waitForDisplayed();
        await this.dragItem.waitForClickable();

        await this.dropItem.waitForExist();
        await this.dropItem.waitForDisplayed();
        await this.dropItem.waitForClickable();
        await this.dragItem.dragAndDrop(this.dropItem);
    }*/
    //CUSTOME JS METHOD FOR DRAG AND DROP ACTIONS, sicne all others fail for firefox
    async dragAndDrop() {
        await this.dragItem.waitForDisplayed();
        await this.dropItem.waitForDisplayed();

        await browser.execute((source, target) => {
            const dataTransfer = new DataTransfer();
            const dispatch = (type, targetEl) => {
                const event = new DragEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer
                });
                targetEl.dispatchEvent(event);
            };

            dispatch('dragstart', source);
            dispatch('dragenter', target);
            dispatch('dragover', target);
            dispatch('drop', target);
            dispatch('dragend', source);
        }, await this.dragItem, await this.dropItem);
    }
}

export default new DragPage();