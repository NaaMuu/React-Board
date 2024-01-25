const Timestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  export default Timestamp;