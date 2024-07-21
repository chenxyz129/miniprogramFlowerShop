import {
    observable,
    action
} from 'mobx-miniprogram'
export const munStore = observable({
    numA: 1,
    numB: 2,
    get sum() {
        return this.numA + this.numB
    },
    update: action(function () {
        this.numA += 1
        this.numB += 1
    })

})