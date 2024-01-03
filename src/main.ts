import {DotsAndBoxes} from "./dotsAndBoxes.ts";
import {Parser} from "./parser/parser.ts";


window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement
    const dotsAndBoxes = new DotsAndBoxes(canvas);
    dotsAndBoxes.updateCanvasPosition()
    dotsAndBoxes.draw()
// @ts-ignore
    window.dots = dotsAndBoxes
    const codeTextControl = document.getElementById("code") as HTMLTextAreaElement
    const applyButton = document.getElementById("apply") as HTMLButtonElement
    const model = new Parser().parse(codeTextControl.value)
    dotsAndBoxes.apply(model);
    applyButton!.onclick = _ => dotsAndBoxes.apply(new Parser().parse(codeTextControl.value))
    document.getElementById("pan-zoom")!.onclick = _ => dotsAndBoxes.selectTool(dotsAndBoxes.PAN_ZOOM_TOOL);
    document.getElementById("zoom-reset")!.onclick = _ => dotsAndBoxes.zoom = 1;
    document.getElementById("dot")!.onclick = _ => dotsAndBoxes.selectTool(dotsAndBoxes.DOTS_TOOL)
    document.getElementById("box")!.onclick = _ => dotsAndBoxes.selectTool(dotsAndBoxes.BOX_TOOL)
    document.getElementById("back")!.onclick = _ => dotsAndBoxes.back()
    document.getElementById("pause")!.onclick = _ => dotsAndBoxes.togglePause()
    document.getElementById("forward")!.onclick = _ => dotsAndBoxes.forward()
})

