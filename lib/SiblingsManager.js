import React, { cloneElement } from "react";
import { StyleSheet } from "react-native";
import uuidv1 from "uuid/v1";
import emitter from "./AppRegistryInjection";

const styles = StyleSheet.create({
    offStream: {
        position: "absolute"
    }
});

export default class {
    constructor(element, callback) {
        Object.defineProperty(this, "_id", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: uuidv1()
        });

        this.update(element, callback);
    }

    _offStreamElement(element) {
        return cloneElement(element, {
            style: [element.props.style, styles.offStream]
        });
    }

    _id = null;

    update(element, callback) {
        emitter.emit(
            "siblings.update",
            this._id,
            this._offStreamElement(element),
            callback
        );
    }

    destroy(callback) {
        emitter.emit("siblings.update", this._id, null, callback);
    }
}
