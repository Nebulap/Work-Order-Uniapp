interface Department {
  Department_ID: number;
  Department_Info: string;
  childDepartment?: Department[] | null;
}

interface ConvertedDataItem<T> {
  value: T;
  text: string;
  children?: ConvertedDataItem<T>[];
}

export function convertData<T>(data: Department[]): ConvertedDataItem<T>[] {
  let result: ConvertedDataItem<T>[] = [];
  for(let i = 0; i < data.length; i++) {
    const child = data[i].childDepartment;
    let item: ConvertedDataItem<T> = {
      value: data[i].Department_ID as unknown as T,
      text: data[i].Department_Info,
      children: undefined
    };
    if (Array.isArray(child) && child.length > 0) { // 进行更多的类型检查
      item.children = convertData<T>(child);
    }
    result.push(item);
  }
  return result;
}