const formatDate = (date: Date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

  
    const formattedDate = `${day} ${month} ${year}`;
  
    return `${formattedDate}`;
  };
  
  const currentDate = new Date();
  export const formattedCurrentDate = formatDate(currentDate);
  