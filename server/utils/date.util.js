class DateUtils {
  static getCurrentDate() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedDate = `${day}_${month}_${year}`;

    return formattedDate;
  }
}

module.exports = DateUtils;
