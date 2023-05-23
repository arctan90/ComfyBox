import { BuiltInSlotType, LiteGraph, type SlotLayout } from "@litegraph-ts/core";
import ComfyGraphNode, { type ComfyGraphNodeProperties } from "../ComfyGraphNode";

export interface ComfyPlaySoundActionProperties extends ComfyGraphNodeProperties {
    sound: string,
}

export default class ComfyPlaySoundAction extends ComfyGraphNode {
    override properties: ComfyPlaySoundActionProperties = {
        tags: [],
        sound: "notification.mp3"
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "sound", type: "string" },
            { name: "trigger", type: BuiltInSlotType.ACTION }
        ],
    }

    override onAction(action: any, param: any) {
        const sound = this.getInputData(0) || this.properties.sound;
        if (sound) {
            const url = `${location.origin}/sound/${sound}`;
            const audio = new Audio(url);
            audio.play();
        }
    };
}

LiteGraph.registerNodeType({
    class: ComfyPlaySoundAction,
    title: "Comfy.PlaySoundAction",
    desc: "Plays a sound located under the sound/ directory.",
    type: "actions/play_sound"
})