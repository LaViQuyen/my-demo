export class CommonUtils {
  static generateRandomId() {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const machineId = Math.floor(Math.random() * 16777216).toString(16);
    const counter = Math.floor(Math.random() * 16777216).toString(16);

    return (timestamp + machineId + counter).substring(0, 20);
  }

  static base64ToFile(base64Image: string, fileName: string) {
    const base64Data = base64Image.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      '',
    );
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/png' });
    return new File([blob], fileName, { type: 'image/png' });
  }

  static getCurrentDate() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  static pushAtIndex(arr: any[], index: number, newItem: any) {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
  }
}
