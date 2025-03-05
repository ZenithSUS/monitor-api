export const calculateExpirationDate = (dateSubmitted, frequency) => {
    const date = new Date(dateSubmitted);
    switch (frequency) {
      case "Monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "Quarterly":
        date.setMonth(date.getMonth() + 3);
        break;
      case "Semi Annual":
        date.setMonth(date.getMonth() + 6);
        break;
      case "Annual":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        break;
    }
    return date.toISOString().split('T')[0];
};