// interface CatStatus {
//   count: number;
//   isModified: boolean;
// }

class CatStatus {
  count: number;
  isModified: boolean; // 分号的写法和接口一样

  // 类中的构造函数支持默认值
  constructor(count: number = 0, isModified: boolean = false) {
    this.count = count;
    this.isModified = isModified;
  }
}

const catStatusMap = new Map<string, CatStatus>();

// 通过 count 添加或更新一个状态
function addOrUpdateStatusByCount(catName: string, count: number) {
  const catStatus = catStatusMap.get(catName);
  if (catStatus) {
    catStatus.count += count;
    catStatus.isModified = true;
  } else {
    catStatusMap.set(catName, new CatStatus(count));
  }
}

// 通过类属名获取 count
function getCountByName(catName: string) {
  const catStatus = catStatusMap.get(catName);
  return catStatus ? catStatus.count : 0;
}
