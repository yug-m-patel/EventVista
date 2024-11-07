const parseJWT = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Adjust for URL encoding
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload); // Convert to JSON
    } catch (error) {
      console.error("Error decoding JWT", error);
      return null;
    }
  };

export default parseJWT;