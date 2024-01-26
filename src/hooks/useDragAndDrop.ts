import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type { NodeDropType } from "element-plus/es/components/tree/src/tree.type";

export function useDragAndDrop() {
  let innerDiv: HTMLDivElement | null = null;

  function handleDragStart(draggingNode: Node, ev: DragEvents) {
    // 如果拖动节点是一个父节点，就调用它的收起方法
    if (!draggingNode.isLeaf) {
      draggingNode.collapse();
    }
  }

  function handleDragEnter(draggingNode: Node, dropNode: Node, ev: DragEvents) {
    // 如果拖动节点和放置节点一致，那就别加样式了
    if (draggingNode.key === dropNode.key) return;
    // 为 dropNode 添加自定义样式类
    // 使用querySelector选择具有特定data-key的div元素内的第一个div元素
    innerDiv = getInnerDiv(dropNode.key as number);
    // 如果找到了元素，则添加自定义类
    innerDiv?.classList.add("drag-over-node");
  }

  function handleDragLeave(draggingNode: Node, dropNode: Node, ev: DragEvents) {
    // 为 dropNode 移除自定义样式类（还有可能没移除，因为拖的距离不够，根本就没有触发）

    innerDiv?.classList.remove("drag-over-node");
  }

  function handleDragEnd(
    draggingNode: Node,
    dropNode: Node,
    dropType: NodeDropType, // 可能为空
    ev: DragEvents,
  ) {
    // 拖动结束的时候再移除一次，应对拖动距离不够，没有触发 handleDragLeave 的情况
    innerDiv?.classList.remove("drag-over-node");
  }

  /**
   * 根据 id 拿到指定 Item 内部的 div 元素
   * @param id 数据中的 key
   */
  function getInnerDiv(id: number): HTMLDivElement | null {
    return document.querySelector(`div[data-key="${id}"] > div`);
  }

  return {
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragEnd,
    getInnerDiv,
  };
}
